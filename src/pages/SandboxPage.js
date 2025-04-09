import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ExpandComponent from '../components/ExpandComponent'
import CodeSnippet from '../components/CodeSnippet'

const SandboxPage = ({ api }) => {

    const languages = [
        { path: '/assets/Curl.png', lang: "cURL" },
        { path: '/assets/Python.png', lang: "Python" },
        { path: '/assets/Node.png', lang: "Node.js" },
        { path: '/assets/php.png', lang: "PHP" },
        { path: '/assets/java.png', lang: "Java", },
        { path: '/assets/net.png', lang: "C#" },
        { path: '/assets/ruby.png', lang: "Ruby" },
        { path: '/assets/js-new.jpg', lang: "JavaScript" },
        { path: '/assets/kotlin-new.jpg', lang: "Kotlin" },
        { path: '/assets/http-new.png', lang: "HTTP", },
        { path: '/assets/PowerShell-new.png', lang: "PowerShell" }
    ];

    const [selectedLanguage, setSelectedLanguage] = useState("cURL");
    const standardExamples = (method, endpoint, body = '{}') => {
        const bodyString = body
        return {
            "cURL": `curl -X ${method} "${endpoint}" -H "Authorization: Bearer {token}"${body ? ' -H "Content-Type: application/json" -d \'' + bodyString + '\'' : ''}`,
            "Python": `import requests\nrequests.${method.toLowerCase()}("${endpoint}", headers={"Authorization": "Bearer {token}"${body ? ', "Content-Type": "application/json"' : ''}}${body ? `, json=${bodyString}` : ''})`,
            "JavaScript (jQuery)": `$.ajax({url: "${endpoint}", type: "${method}", headers: {"Authorization": "Bearer {token}"${body ? ', "Content-Type": "application/json"' : ''}}${body ? `, data: '${bodyString}'` : ''}});`,
            "Node.js": `const axios = require('axios');\naxios.${method.toLowerCase()}("${endpoint}", {\n  headers: { "Authorization": "Bearer {token}"${body ? ', "Content-Type": "application/json"' : ''} },\n  ${body ? `data: ${bodyString},` : ''}\n}).then(response => console.log(response.data));`,
            "PHP": `$ch = curl_init("${endpoint}"); curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "${method}"); curl_setopt($ch, CURLOPT_HTTPHEADER, array("Authorization: Bearer {token}"${body ? ', "Content-Type: application/json"' : ''}));${body ? ` curl_setopt($ch, CURLOPT_POSTFIELDS, '${bodyString}');` : ''} curl_exec($ch);`,
            "Java": `import java.net.HttpURLConnection;\nimport java.net.URL;\nimport java.io.OutputStream;\nimport java.util.Scanner;\n\npublic class ApiExample {\n    public static void main(String[] args) throws Exception {\n        URL url = new URL("${endpoint}");\n        HttpURLConnection conn = (HttpURLConnection) url.openConnection();\n        conn.setRequestMethod("${method}");\n        conn.setRequestProperty("Authorization", "Bearer {token}");\n        ${body ? 'conn.setRequestProperty("Content-Type", "application/json");' : ''}\n        conn.setDoOutput(true);\n\n        ${body ? `\n        String jsonInputString = "${bodyString.replace(/"/g, '\\"')}";\n        try(OutputStream os = conn.getOutputStream()) {\n            byte[] input = jsonInputString.getBytes("utf-8");\n            os.write(input, 0, input.length);\n        }` : ''}\n\n        Scanner scanner = new Scanner(conn.getInputStream());\n        while (scanner.hasNext()) {\n            System.out.println(scanner.nextLine());\n        }\n        scanner.close();\n    }\n}`,
            "Kotlin": `import khttp\n\nkhttp.request(\n  method = "${method}",\n  url = "${endpoint}",\n  headers = mapOf("Authorization" to "Bearer {token}"${body ? ', "Content-Type" to "application/json"' : ''})${body ? `, json = ${bodyString}` : ''}\n)`,
            "C#": `using System;\nusing System.Net.Http;\nusing System.Text;\nusing System.Threading.Tasks;\n\nclass Program {\n    static async Task Main() {\n        var client = new HttpClient();\n        var request = new HttpRequestMessage(HttpMethod.${method}, "${endpoint}");\n        request.Headers.Add("Authorization", "Bearer {token}");\n        ${body ? `request.Content = new StringContent("${bodyString.replace(/"/g, '\\"')}", Encoding.UTF8, "application/json");` : ''}\n        var response = await client.SendAsync(request);\n        Console.WriteLine(await response.Content.ReadAsStringAsync());\n    }\n}`,
            "PowerShell": `Invoke-RestMethod -Uri "${endpoint}" -Method ${method} -Headers @{"Authorization"="Bearer {token}"${body ? '; "Content-Type"="application/json"' : ''}}${body ? ` -Body '${bodyString}'` : ''}`,
            "HTTP": `${method} /${endpoint} HTTP/1.1\nHost: api.example.com\nAuthorization: Bearer {token}${body ? '\nContent-Type: application/json\n\n' + bodyString : ''}`,
            "Ruby": `require 'net/http'\nrequire 'json'\n\nuri = URI("${endpoint}")\nrequest = Net::HTTP::${method}.new(uri)\nrequest["Authorization"] = "Bearer {token}"\n${body ? 'request["Content-Type"] = "application/json"\nrequest.body = ' + bodyString : ''}\nresponse = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(request) }\nputs response.body`,
        };

    };
    const codeExamples = standardExamples(api.request.method, api.request.url, api?.request?.body?.raw);
    const [sampleresponse, setSampleresponse] = useState({ body: null, lang: null, code: '' });
    const hnadleSampleresponse = (code) => {
        let found = false;
        for (let item of api.response) {
            if (item.code == code) {
                found = true;
                setSampleresponse({ body: item.body, lang: item._postman_previewlanguage, code: code });
            }
        }
        if (!found) {
            setSampleresponse({ body: null, lang: null });
        }
    }
    useEffect(() => {
        if (api.response.length > 0) {
            setSampleresponse({ body: api.response[0].body, lang: api.response[0]._postman_previewlanguage, code: api.response[0].code });
        }
    }, [])
    return (
        <div className="container">
            <div className="row pt-3">
                <div className="col-10">
                    <div>
                        <Link href="#" className="text-decoration-none heading-color">Home / CONSENT REQUEST
                            /Overview</Link>
                    </div>
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-explore"> Test in Sandbox</button>
                </div>
            </div>
            <h3 className="mt-2 pt-4 green-color">{api.name}</h3>
            <div className="row post-url-bg mt-3 mx-1">
                <div className='col-xl-1 col-lg-2 col-md-3 col-sm-4 col-2'>
                    <span className="white-badge">
                        <Link href="#" className="text-decoration-none ">{api.request.method}</Link>
                    </span>

                </div>
                <div className='col-xl-11 col-lg-10 col-md-9 col-sm-12 col-12'>
                    <h6 className="mb-0 "> <Link href="#"
                        className="text-decoration-none anchor-color">{api.request.url}</Link>
                    </h6>
                </div>
            </div>
            <div className='line-bottom mt-4 mx-2'>

            </div>
            <div className="row mt-2">
                <div className="col-xl-7 col-lg-12 col-md-12 col-sm-12">

                    <h3 className="mt-2">Request</h3>
                    <h6 className="green-color pt-2 pb-2">Header Parameters</h6>
                    <div className="row header-parameter">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 ">
                            {
                                api?.request?.header.map((header, index) => (
                                    <p className="mb-1" key={index}>{header.key}</p>
                                ))
                            }
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 ">
                            {
                                api?.request?.header.map((header, index) => (
                                    <p className="mb-1 property-type" key={index}>{typeof header.value}</p>
                                ))
                            }
                        </div>
                    </div>
                    <h6 className="green-color mt-3">Body</h6>
                    {api?.request?.body && <div>
                        <ExpandComponent obj={JSON.parse(api?.request?.body?.raw || '{}')} />
                    </div>}
                    <h6 className="green-color mt-3">Response</h6>
                    {sampleresponse.body &&
                        <div>
                            <ExpandComponent obj={JSON.parse(sampleresponse.body || '{}')} />
                        </div>}
                </div>
                <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12">
                    <h6>Languages</h6>
                    <div className=" Scroll-language d-flex">
                        {languages.map((lang) => (
                            <div className=" mb-2 me-3">
                                <button className="bg-light-green" onClick={() => setSelectedLanguage(lang.lang)}>
                                    <img src={lang.path} alt='language-img' style={{ width: '67px', height: '45px' }} />
                                    <p className="text-center mb-0 pb-2 language-name-white">{lang.lang}</p>
                                </button>
                            </div>))}
                    </div>

                    <div className="d-flex justify-content-between  Request-Sample-bg mt-3">
                        <div>
                            <h6 className="mb-0"> <Link href="#"
                                className="text-decoration-none anchor-color"> Request Sample</Link>
                            </h6>
                        </div>
                        <div>
                            <i className="far fa-copy light-info-color"></i>
                        </div>
                    </div>
                    <div className="curl-code-request">
                        <CodeSnippet
                            code={codeExamples[selectedLanguage] || `// ${selectedLanguage} example not available`}
                            language={selectedLanguage?.toLowerCase().includes("javascript") ? "javascript" : selectedLanguage?.toLowerCase()} />
                    </div>
                    <select className="form-select mt-2 select-border" value={sampleresponse.code} name="" id="" onChange={(e) => hnadleSampleresponse(e.target.value)}>
                        <option value="">Select code status</option>
                        {api.response.map((code, index) => (<option key={index} value={code.code}>{code.code}</option>))}
                    </select>
                    <div className="d-flex justify-content-between  Request-Sample-bg mt-3">
                        <div>
                            <h6 className="mb-0"> <Link href="#"
                                className="text-decoration-none anchor-color"> Response Sample</Link>
                            </h6>
                        </div>
                        <div>
                            <i className="far fa-copy light-info-color"></i>
                        </div>
                    </div>
                    <div className="curl-code-request">
                        <CodeSnippet
                            code={sampleresponse.body || '{}'}
                            language={sampleresponse.lang || "json"} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SandboxPage