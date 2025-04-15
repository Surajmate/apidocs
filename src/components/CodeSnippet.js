import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Optional: Map for more readable language names to actual highlighter language identifiers
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

const CodeSnippet = ({ code = '', language = 'javascript' }) => {
  const mappedLang = languageMap[language] || language;

  return (
    <div className="code-snippet-container" style={{ marginTop: '1rem' }}>
      <SyntaxHighlighter
        language={mappedLang}
        style={coy}
        showLineNumbers
        customStyle={{ borderRadius: '8px', padding: '1rem', background: '#f9f9f9' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
