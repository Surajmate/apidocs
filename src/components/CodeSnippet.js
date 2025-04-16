import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const languageMap = {
  "cURL": "bash",
  "Python": "python",
  "JavaScript (jQuery)": "javascript",
  "Java": "java",
  "Kotlin": "kotlin",
  "Node.js": "javascript",
  "C#": "csharp",
  "Ruby": "ruby",
  "PHP": "php",
  "HTTP": "http",
  "PowerShell": "powershell"
};

const CodeSnippet = ({ code, lang = 'cURL' }) => {
  const formattedCode =
    typeof code === 'string' ? code : JSON.stringify(code, null, 2);

  return (
    <SyntaxHighlighter language={languageMap[lang]} style={oneDark}>
      {( typeof code === 'string' ? code : JSON.stringify(code, null, 2))}
    </SyntaxHighlighter>
  );
};

export default CodeSnippet;
