import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CodeSnippet from "../components/CodeSnippet";

import "./ApiDetails.css";

const languages = [
    "cURL", "Python", "JavaScript (jQuery)", "Java", "Kotlin", "Node.js",
    "C#", "Ruby", "PHP", "HTTP", "PowerShell"
];

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
const ApiDescription = ({ api }) => {
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState("cURL");

    const [sampleresponse, setSampleresponse] = useState({ body: null, lang: null });
    const hnadleSampleresponse = (code) => {
        let found = false;
        for (let item of api.response) {
            if (item.code == code) {
                found = true;
                setSampleresponse({ body: item.body, lang: item._postman_previewlanguage });
            }
        }
        if (!found) {
            setSampleresponse({ body: null, lang: null });
        }
    }

    const codeExamples = standardExamples(api.request.method, api.request.url, api?.request?.body?.row);

    return (
        <div className="api-details-container">
            <button className="sandbox-button">Test in Sandbox</button>
            <h1>{api.name}</h1>
            <p><strong>Method:</strong> <span className={`method-badge ${api.request.method.toLowerCase()}`}>{api.request.method}</span></p>
            <p><strong>Endpoint:</strong> {api.request.url}</p>
            <h3>Headers</h3>
            {
                api?.request?.header.map((header, index) => (
                    <p key={index}>{header.key} <span className="text-muted ms-2">{header.type}</span></p>
                ))
            }
            <div className="http-response-box">
                <h3>HTTP Response Code</h3>
                <pre>200 OK</pre>
            </div>


            {api?.request && (
                <div className="sample-box">
                    <h3>Request Sample:</h3>
                    <CodeSnippet
                        code={api?.request?.body?.row || '{}'}
                        language={api?.request?.body?.options?.language || "json"}
                    />
                </div>
            )}

            <div className="my-2">
                <label >Select code status</label>
                <select name="" id="" onChange={(e) => hnadleSampleresponse(e.target.value)}>
                    <option value="">Select code status</option>
                    {api.response.map((code, index) => (<option key={index} value={code.code}>{code.code}</option>))}
                </select>
            </div>
            {api.response && (
                <div className="sample-box">
                    <h3>Response Sample:</h3>
                    <CodeSnippet
                        code={sampleresponse.body || '{}'}
                        language={sampleresponse.lang || "json"}
                    />
                </div>
            )}

            <div className="language-select my-2">
                <h3>Select Language:</h3>
                <select onChange={(e) => setSelectedLanguage(e.target.value)} value={selectedLanguage}>
                    {languages.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
            </div>

            <div className="sample-box" >
                <h3>{selectedLanguage} Example:</h3>
                <CodeSnippet
                    code={codeExamples[selectedLanguage] || `// ${selectedLanguage} example not available`}
                    language={selectedLanguage?.toLowerCase().includes("javascript") ? "javascript" : selectedLanguage?.toLowerCase()}
                />
            </div>

            <button className="catalogue-button" onClick={() => navigate("/", { state: { openPopup: true } })}>
                Back to API Catalogue
            </button>
        </div>
    );
}

export default ApiDescription