import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy } from 'react-icons/fa';
import './apiDetails.css';
import { Go, Curl, Python, Node, Php } from '@/components/ui/languageIcons';


const languageExamples = {
  curl: `curl --request POST \
  --url https://uat.itswaathprotonation.io/api/v2/digilocker/token \
  --header 'content-type: application/json' \
  --header 'apikey: {apikey}' \
  --header 'Authorization: Bearer {auth_token}' \
  --data '{
    "client_id": "digilocker client id",
    "client_secret": "digilocker client secret",
    "redirect_uri": "Whitelisted redirect_url",
    "code": "9cd15c598c7f8815b6149e2258c",
    "grant_type": "authorization_code",
    "code_verifier": "xxxx"
  }'`,

  python: `import requests
headers = {
  'content-type': 'application/json',
  'apikey': '{apikey}',
  'Authorization': 'Bearer {auth_token}'
}
data = {
  "client_id": "digilocker client id",
  "client_secret": "digilocker client secret",
  "redirect_uri": "Whitelisted redirect_url",
  "code": "9cd15c598c7f8815b6149e2258c",
  "grant_type": "authorization_code",
  "code_verifier": "xxxx"
}
response = requests.post('https://uat.itswaathprotonation.io/api/v2/digilocker/token', headers=headers, json=data)
print(response.json())`,

  node: `const axios = require('axios');

const headers = {
  'content-type': 'application/json',
  'apikey': '{apikey}',
  'Authorization': 'Bearer {auth_token}'
};

const data = {
  client_id: 'digilocker client id',
  client_secret: 'digilocker client secret',
  redirect_uri: 'Whitelisted redirect_url',
  code: '9cd15c598c7f8815b6149e2258c',
  grant_type: 'authorization_code',
  code_verifier: 'xxxx'
};

axios.post('https://uat.itswaathprotonation.io/api/v2/digilocker/token', data, { headers })
  .then(response => console.log(response.data));`,

  php: `<?php
$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://uat.itswaathprotonation.io/api/v2/digilocker/token",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode([
    "client_id" => "digilocker client id",
    "client_secret" => "digilocker client secret",
    "redirect_uri" => "Whitelisted redirect_url",
    "code" => "9cd15c598c7f8815b6149e2258c",
    "grant_type" => "authorization_code",
    "code_verifier" => "xxxx"
  ]),
  CURLOPT_HTTPHEADER => [
    "content-type: application/json",
    "apikey: {apikey}",
    "Authorization: Bearer {auth_token}"
  ]
]);

$response = curl_exec($curl);
curl_close($curl);
echo $response;`
};

const languages = [
  { id: 'curl', label: 'Curl', icon: <Curl /> },
  { id: 'go', label: 'Go', icon: <Go /> },
  { id: 'python', label: 'Python', icon: <Python /> },
  { id: 'node', label: 'Node', icon: <Node /> },
  { id: 'php', label: 'PHP', icon: <Php /> }
];

const ApiDetailsPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('curl');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="api-details-container">
      <div className="breadcrumb">Home / DigiLocker / API Reference / Get Access Token</div>
      <h1>Get Access Token</h1>
      <div className="method-url">
        <span className="method-badge post">POST</span>
        <span className="url-bar">https://uat.itswaathprotonation.io/api/v2/digilocker/token</span>
      </div>

      <div className="request-response-container">
        <div className="request-section">
          <h2>Request</h2>
          <p><strong>Header Parameters</strong></p>
          <p>apikey <em>string</em></p>
          <p>Authorization <em>string</em></p>

          <p><strong>Body</strong></p>
          <ul>
            <li>client_id <em>string</em> <span className="required">Required</span></li>
            <li>client_secret <em>string</em> <span className="required">Required</span></li>
            <li>code <em>string</em> <span className="required">Required</span></li>
            <li>code_verifier <em>string</em> <span className="required">Required</span></li>
            <li>grant_type <em>string</em> <span className="required">Required</span></li>
            <li>redirect_uri <em>string</em> <span className="required">Required</span></li>
          </ul>
        </div>

        <div className="language-section">
          <h3>Languages</h3>
          <div className="language-tabs">
            {languages.map(lang => (
              <button
                key={lang.id}
                className={`lang-tab ${selectedLanguage === lang.id ? 'active' : ''}`}
                onClick={() => setSelectedLanguage(lang.id)}>
                {lang.icon}
              </button>
            ))}
          </div>

          <div className="sample-box">
            <div className="copy-button" onClick={() => handleCopy(languageExamples[selectedLanguage])}>
              <FaCopy /> {copied ? 'Copied!' : 'Copy'}
            </div>
            <SyntaxHighlighter language={selectedLanguage} style={vscDarkPlus} wrapLines={true} customStyle={{ fontSize: '0.9rem' }}>
              {languageExamples[selectedLanguage] || 'Example not available'}
            </SyntaxHighlighter>
          </div>

          <div className="http-response-box">200 OK</div>

          <div className="sample-box">
            <div className="copy-button" onClick={() => handleCopy('{\n  "access_token": "...",\n  "token_type": "Bearer"\n}')}> <FaCopy /> Copy</div>
            <SyntaxHighlighter language="json" style={vscDarkPlus} wrapLines={true} customStyle={{ fontSize: '0.9rem' }}>
              {`{
  "access_token": "08488cc2bf7fee09632f0bb7f7b1",
  "expires_in": 3600,
  "token_type": "Bearer",
  "scope": null,
  "aadhaar": "xxxx",
  "name": "xxxxx",
  "gender": "M"
}`}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDetailsPage;
