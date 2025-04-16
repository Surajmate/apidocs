import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import './ApiDescription.css';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
// import CodeSnippet from '../components/CodeSnippet';

const generators = {
  curl: (json, body) => {
    const headers = json.request.header.map(h => `--header '${h.key}: ${h.value}'`).join(' \\\n');
    return `curl --location --request ${json.request.method} '${json.request.url}' \\\n${headers} \\\n--header 'Content-Type: application/json' \\\n--data-raw '${body}'`;
  },

  php: (json, body) => {
    const headers = json.request.header.map(h => `"${h.key}: ${h.value}"`).concat(`"Content-Type: application/json"`).join(",\n    ");
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
    const headers = json.request.header.reduce((acc, h) => ({ ...acc, [h.key]: h.value }), { 'Content-Type': 'application/json' });
    return `import requests
url = "${json.request.url}"
headers = ${JSON.stringify(headers, null, 2)}
payload = ${body}
response = requests.post(url, headers=headers, json=payload)
print(response.text)`;
  },

  nodejs: (json, body) => {
    const headers = json.request.header.reduce((acc, h) => ({ ...acc, [h.key]: h.value }), { 'Content-Type': 'application/json' });
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
  req, _ := http.NewRequest("${json.request.method}", url, bytes.NewBuffer(payload))
  ${json.request.header.map(h => `req.Header.Set("${h.key}", "${h.value}")`).join('\n  ')}
  req.Header.Set("Content-Type", "application/json")
  client := &http.Client{}
  res, _ := client.Do(req)
  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)
  fmt.Println(string(body))
}`;
  }
};


const languageMap = {
  "cURL": "cURL",
  "Bash": "bash",
  "Python": "python",
  "JavaScript (jQuery)": "javascript",
  "Java": "java",
  "Kotlin": "kotlin",
  "Node.js": "nodejs",
  "C#": "csharp",
  "Ruby": "ruby",
  "PHP": "php",
  "HTTP": "http",
  "PowerShell": "powershell"
};

const ApiDescription = () => {
  const [apiList, setApiList] = useState({});
  const [apiData, setApiData] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("cURL");
  const [expandedCategoryIndex, setExpandedCategoryIndex] = useState(null);

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem('postman_collection') || '{}');
    setApiList(response);
  }, []);

  const handleApiClick = (data) => {
    setApiData(data);
  };

  const toggleAccordion = (index) => {
    setExpandedCategoryIndex(prev => prev === index ? null : index);
  };

  const handleBack = () => {
    setApiData({});
  };

  return (
    <>
      <div className="row">
        <div className="col-3 colStyle">
          <div className="available-apis-section text-white">
            <div className="accordion-container">
              {Array.isArray(apiList.item) ? (
                <ul className="accordion-list">
                  {apiList.item.map((entry, index) => (
                    <li key={index} className="accordion-item">
                      <div
                        className="accordion-header"
                        onClick={() => toggleAccordion(index)}
                      >
                        <strong>{entry.name}</strong>
                        <span>{expandedCategoryIndex === index ? '▲' : '▼'}</span>
                      </div>

                      {expandedCategoryIndex === index && (
                        <div className="accordion-body">
                          {entry.item.map((api, index1) => (
                            <div key={index1} className="accordion-api-item">
                              <h6>{api.name}</h6>
                              {Array.isArray(api.item) ? (
                                <ul>
                                  {api.item.map((entry1, index2) => (
                                    <li key={index2}>
                                      <div
                                        className="accordion-subitem"
                                        onClick={() => handleApiClick(entry1)}
                                      >
                                        <strong>{entry1.name}</strong>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p>No items found in the collection.</p>
                              )}
                            </div>
                          ))}
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

        <div className="col-9 colStyle">
          {apiData.name ? (
            <>
              <div className="api-header">
                <div>
                  <h1>{apiData.name}</h1>
                  <p>{
                   <div className="markdown-container" style={{ padding: '1rem', background: '#fff', borderRadius: '8px' }}>
                   <ReactMarkdown
                     children={apiData.request.description}
                     remarkPlugins={[remarkGfm]}
                     components={{
                       code({ node, inline, className, children, ...props }) {
                         const match = /language-(\w+)/.exec(className || '');
                         return !inline && match ? (
                           <SyntaxHighlighter style={coy} language={match[1]} PreTag="div" {...props}>
                             {String(children).replace(/\n$/, '')}
                           </SyntaxHighlighter>
                         ) : (
                           <code className={className} {...props}>
                             {children}
                           </code>
                         );
                       },
                     }}
                   />
                 </div> || 'No description available.'}</p>
                </div>
                {/* <button className="api-description-back-btn" onClick={handleBack}>
                  Back
                </button> */}
              </div>

              <div className="api-method-url">
                <span className="method-tag">{apiData?.request?.method}</span>
                <span className="endpoint-url">{apiData?.request?.url}</span>
              </div>

              <div className="section-heading">Request Headers</div>
              <div className="parameter-group">
                {apiData.request.header?.map((param, index) => (
                  <div key={index} className="parameter-row">
                    <span className="parameter-name">{param.key}</span>
                    <span className="parameter-type">{param.value}</span>
                    <span className="parameter-required">
                      {param.required ? 'Required' : 'Optional'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="section-heading">Response</div>
              {typeof apiData.response === 'object' ? (
                <pre className="code-box">{apiData.response}</pre>
              ) : (
                <pre className="code-box">{apiData.response}</pre>
              )}

              <div className="section-heading">Languages</div>
              <div className="language-tabs">
                {Object.keys(languageMap).map((lang, index) => (
                  <img
                    key={index}
                    src={`/assets/${lang.toLowerCase().replace(/[^a-z]/g, '')}.png`}
                    alt={lang}
                    className={`language-tab ${selectedLanguage === lang ? 'active' : ''}`}
                    onClick={() => setSelectedLanguage(lang)}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ))}
              </div>

              <div className="section-heading">Request Sample</div>
              
              {/* <CodeSnippet code={{
                name: apiData.name,
                request: {
                  method: apiData.request.method,
                  header: apiData.request.header,
                  description: apiData.request.description,
                  url: apiData.request.url,
                  body: apiData.request.body ? JSON.stringify(apiData.request.body, null, 2) : null
                }
              }} lang={selectedLanguage} /> */}
              <SyntaxHighlighter
                language={languageMap[selectedLanguage]}
                style={coy}
                showLineNumbers>
                {/* {generators[selectedLanguage](apiData, apiData.request.body ? JSON.stringify(apiData.request.body, null, 2) : null)} */}
                </SyntaxHighlighter>
            </>
          ) : (
            <>
            <div className="markdown-container" style={{ padding: '1rem', background: '#fff', borderRadius: '8px' }}>
                   <ReactMarkdown
                     children={(apiList?.info?.description) ? apiList?.info?.description : ''}
                     remarkPlugins={[remarkGfm]}
                     components={{
                       code({ node, inline, className, children, ...props }) {
                         const match = /language-(\w+)/.exec(className || '');
                         return !inline && match ? (
                           <SyntaxHighlighter style={coy} language={match[1]} PreTag="div" {...props}>
                             {String(children).replace(/\n$/, '')}
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
    </>
  );
};

export default ApiDescription;
