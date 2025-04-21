import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import ExpandComponent from "../components/ExpandComponent";
import Navbar from "./Navbar";
import "./ApiDescription.css";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faFolder } from "@fortawesome/free-solid-svg-icons";
import collection from "../data/Mulesoft.postman_collection.json"

const methodColors = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "del",
};

const ApiMethodChip = ({ method }) => {
  const colorClasses =
    methodColors[method.toUpperCase()] || "post";

  return (
    <span
      className={`px-2 py-1 mt-2 text-sm font-medium ${colorClasses}`}
    >
      {method}
    </span>
  );
};

const generators = {
  curl: (json, body) => {
    const headers = json.request.header
      .map((h) => `--header '${h.key}: ${h.value}'`)
      .join(" \\\n");
    return `curl --location --request ${json.request.method} '${json.request.url}' \\\n${headers} \\\n--header 'Content-Type: application/json' \\\n--data-raw '${body}'`;
  },

  php: (json, body) => {
    const headers = json.request.header
      .map((h) => `"${h.key}: ${h.value}"`)
      .concat(`"Content-Type: application/json"`)
      .join(",\n    ");
    return `<?php
$curl = curl_init();
$data = ${body};
curl_setopt_array($curl, [
  CURLOPT_URL => "${json.request.url}",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "${json.request.method}",
  CURLOPT_POSTFIELDS => json_encode($data),
  CURLOPT_HTTPHEADER => [
    ${headers}
  ],
]);
$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);
echo $err ? "cURL Error: $err" : $response;
?>`;
  },

  python: (json, body) => {
    const headers = json.request.header.reduce(
      (acc, h) => ({ ...acc, [h.key]: h.value }),
      { "Content-Type": "application/json" }
    );
    return `import requests
url = "${json.request.url}"
headers = ${JSON.stringify(headers, null, 2)}
payload = ${body}
response = requests.post(url, headers=headers, json=payload)
print(response.text)`;
  },

  nodejs: (json, body) => {
    const headers = json.request.header.reduce(
      (acc, h) => ({ ...acc, [h.key]: h.value }),
      { "Content-Type": "application/json" }
    );
    return `const axios = require('axios');
const options = {
  method: '${json.request.method}',
  url: '${json.request.url}',
  headers: ${JSON.stringify(headers, null, 2)},
  data: ${body}
};
axios.request(options).then(res => {
  console.log(res.data);
}).catch(err => {
  console.error(err);
});`;
  },

  go: (json, body) => {
    return `package main
import (
  "bytes"
  "fmt"
  "net/http"
  "io/ioutil"
)
func main() {
  url := "${json.request.url}"
  payload := []byte(${JSON.stringify(body)})
  req, _ := http.NewRequest("${
    json.request.method
  }", url, bytes.NewBuffer(payload))
  ${json.request.header
    .map((h) => `req.Header.Set("${h.key}", "${h.value}")`)
    .join("\n  ")}
  req.Header.Set("Content-Type", "application/json")
  client := &http.Client{}
  res, _ := client.Do(req)
  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)
  fmt.Println(string(body))
}`;
  },
};

const languageMap = {
  cURL: "curl",
  PHP: "php",
  Python: "python",
  "Node.js": "nodejs",
  Go: "go",
};

const ApiDescription = () => {
  const [apiList, setApiList] = useState({});
  const [apiData, setApiData] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("curl");
  const [showLang, setShowLang] = useState("cURL");
  const [expandedCategoryIndex, setExpandedCategoryIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleTrigger = () => setIsOpen(!isOpen);


  useEffect(() => {
    
    const response = collection;
    setApiList(response);
    if (response.item && response.item.length > 0) {
      let obj = {
        name: response.item[0].name || "",
        request: { description: response.item[0].description || "" },
      };
      setApiData(obj);
    }
  }, []);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop= "100px";
  }, [apiData?.request?.description]);

  const handleApiClick = (data) => {
    setApiData(data);
  };

  const toggleAccordion = (index) => {
    setExpandedCategoryIndex((prev) => (prev === index ? null : index));
  };

  const [sampleresponse, setSampleresponse] = useState({
    body: null,
    lang: null,
    code: "",
  });

  const hnadleSampleresponse = (code) => {
    let found = false;
    for (let item of apiData.response) {
      if (item.code === code) {
        found = true;
        setSampleresponse({
          body: item.body,
          lang: item._postman_previewlanguage,
          code: code,
        });
      }
    }
    if (!found) {
      setSampleresponse({ body: null, lang: null });
    }
  };

  return (
    <div className="special-gothic-regular container-fluid p-0 m-0">
      <div className="page">
        <div className="content p-0">
          <Navbar />
          <div
            className="description-container colStyle"
            style={{ padding: "10px 200px" }}
          >
            {apiData.name ? (
              <div className="mt-2">
                <h1>{apiData.name}</h1>
                {(
                  <div
                    className="markdown-container"
                    style={{
                      padding: "1rem",
                      background: "#fff",
                      borderRadius: "8px",
                    }}
                  >
                    <ReactMarkdown
                      children={apiData.request.description}
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={coy}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    />
                  </div>
                ) || "No description available."}
                {apiData?.request?.url && (
                  <div className="">
                    <div className="api-method-url">
                      <div class="a_url">
                        <div class="a_full_url">
                          <div class="a_full_url_inner">
                            <ApiMethodChip className="space-x-2" method={apiData?.request?.method} />
                            <span id="apiurl" class="apiurl_s copyurl">{apiData?.request?.url}</span>
                          </div>
                        </div>
                      </div>
                      {/* <span className="method-tag">
                        {apiData?.request?.method}
                      </span>
                      <span className="endpoint-url pt-1">
                        {apiData?.request?.url}
                      </span> */}
                    </div>
                    <div className="row g-0">
                      <div className="col-5 p-3">
                        <div className="section-heading">Request Headers</div>
                        <div className="parameter-group">
                          {apiData.request.header?.map((param, index) => (
                            <div key={index} className="parameter-row">
                              <span className="parameter-name">
                                {param.key}
                              </span>
                              <span className="parameter-type">
                                {param.value}
                              </span>
                              <span className="parameter-required">
                                {param.required ? "Required" : "Optional"}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="section-heading">Request Body</div>
                        {apiData?.request?.body && (
                          <ExpandComponent
                            obj={JSON.parse(
                              apiData?.request?.body?.raw || "{}"
                            )}
                          />
                        )}

                        <div className="section-heading">Response Body</div>
                        {apiData?.request?.body && (
                          <ExpandComponent
                            obj={JSON.parse(
                              apiData?.request?.body?.raw || "{}"
                            )}
                          />
                        )}
                      </div>
                      <div className="col-7 p-3">
                        <div className="section-heading">Languages</div>
                        <div className="language-tabs">
                          {Object.keys(languageMap).map((lang, index) => (
                            <img
                              key={index}
                              src={`/assets/${lang
                                .toLowerCase()
                                .replace(/[^a-z]/g, "")}.png`}
                              alt={lang}
                              className={`language-tab ${
                                showLang === lang ? "active" : ""
                              }`}
                              onClick={() => {
                                setSelectedLanguage(languageMap[lang]);
                                setShowLang(lang);
                              }}
                            />
                          ))}
                        </div>

                        <div className="section-heading">Request Sample</div>
                        <SyntaxHighlighter
                          className="code-box"
                          language={"javascript"}
                          style={coy}
                          showLineNumbers
                        >
                          {generators[selectedLanguage](
                            apiData,
                            JSON.stringify(
                              apiData?.request?.body?.raw || {},
                              null,
                              2
                            )
                          )}
                        </SyntaxHighlighter>
                        <select
                          className="form-select mt-2 select-border"
                          value={sampleresponse.code}
                          name=""
                          id=""
                          onChange={(e) => hnadleSampleresponse(e.target.value)}
                        >
                          <option value="">Select code status</option>
                          {apiData?.response?.map((code, index) => (
                            <option key={index} value={code.code}>
                              {code.code}
                            </option>
                          ))}
                        </select>
                        <div className="section-heading">Response</div>
                        {/* {typeof apiData?.response === 'object' ? (
                  <pre className="code-box">{apiData?.response || {}}</pre>
                ) : (
                  <pre className="code-box">{apiData?.response || {}}</pre>
                )} */}
                        <SyntaxHighlighter
                          language={"javascript"}
                          style={coy}
                          showLineNumbers
                        >
                          {sampleresponse.body || "{}"}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div
                  className="markdown-container"
                  style={{
                    padding: "1rem",
                    background: "#fff",
                    borderRadius: "8px",
                  }}
                >
                  <ReactMarkdown
                    children={
                      apiList?.info?.description
                        ? apiList?.info?.description
                        : ""
                    }
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={coy}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
          <div className="trigger" onClick={handleTrigger}>
            
        <div className={`logo ${isOpen ? "" : "d-none"}`}>
          <img src="/assets/logo.png" alt="BikeAPI Logo" className="logo-img"/>
        </div>
          <FontAwesomeIcon className="FontAwesomeIcon" icon={isOpen ? faTimes : faBars} />
          </div>

          <div className="available-apis-section text-white">
            <div className="accordion-container">
              {Array.isArray(apiList.item) ? (
                <ul className="accordion-list">
                  {apiList.item.map((entry, index) => (
                    <li key={index} className="accordion-item">
                      <div
                        className="accordion-header"
                        onClick={() => {toggleAccordion(index); setApiData({
                          name: entry.name || "",
                          request: { description: entry.description || "" },
                        });}}
                      >
                        <strong>{entry.name}</strong>
                      </div>

                      {expandedCategoryIndex === index && (
                        <div className="accordion-body">
                          {entry?.item?.length > 0 ? (
                            entry.item.map((api, index1) => (
                              <div key={index1} className="accordion-api-item">
                                <h6><FontAwesomeIcon className="FontAwesomeIcon" icon={faFolder} /> {api.name}</h6>
                                {Array.isArray(api.item) ? (
                                  <ul>
                                    {api.item.map((entry1, index2) => (
                                      <li key={index2}>
                                        <div
                                          className="accordion-subitem"
                                          onClick={() => {handleApiClick(entry1); handleTrigger()}}
                                          
                                        >
                                          <ApiMethodChip
                                            className="space-x-2"
                                            method={entry1.request.method}
                                          />
                                          <strong>
                                            {" "}
                                            {entry1.name}
                                          </strong>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <ul>
                                    <li key={index1}>
                                      <div
                                        className="accordion-subitem"
                                        onClick={() => handleApiClick(api)}
                                      >
                                      <ApiMethodChip
                                        className="space-x-2"
                                        method={api.request.method}
                                      />
                                        <strong>{api.name}</strong>
                                      </div>
                                    </li>
                                  </ul>
                                )}
                              </div>
                            ))
                          ) : (
                            <p>No items found in the collection.</p>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items found in the collection.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDescription;
