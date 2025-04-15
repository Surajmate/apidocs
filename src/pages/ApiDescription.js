import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
 import { parsePostmanCollection } from '../parsePostman';

 import CodeSnippet from '../components/CodeSnippet';
 import ExpandComponent from '../components/ExpandComponent';

 import './ApiDescription.css';

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

const ApiDescription = () => {
  const navigate = useNavigate();
  const [groupedByCategory, setGroupedByCategory] = useState({});
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [apiList, setApiList] = useState({});
  const [viewAll, setViewAll] = useState(false);
 
  const { apiId } = useParams();

  const toggleCategory = (category) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  const handleApiClick = (id) => {
    navigate(`/api/${id}`);
  };
  //  const navigate = useNavigate();
   const [apiDetails, setApiDetails] = useState(null);
   const [selectedLanguage, setSelectedLanguage] = useState("cURL");
  useEffect(() => {
    const response = JSON.parse(localStorage.getItem('postman_collection'));
    setApiList(response);
  }, []);

  //  if (!apiDetails) return <div>Loading...</div>;

  //  const codeSnippet = apiDetails.code?.[selectedLanguage] || ' Code sample not available';

  return (
    <>
    <div class="row">
      <div class="col-3">
      <div className="available-apis-section text-white">
        {/* <h2 className="section-title">Available APIs</h2> */}
        <div className="accordion-container">
          {Array.isArray(apiList.item) ? (
            <ul>
                {apiList.item.map((entry, index) => (
                  <li key={index}>
                    <strong>{entry.name}</strong>
                      <div className="accordion-body">
                        {entry.item.map((api) => (
                          <div
                          key={api}
                          className="accordion-api-item"
                          >
                            {api.name}
                          </div>
                        ))}
                      </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items found in the collection.</p>
            )}
        <div>
        </div>
      </div>
    </div>
      </div>
      <div class="col-9">
     {/* <div className="api-details-container"> */}
       {/* Header */}
       <div className="api-header">
        Hi
         {/* <div>
           <h1>{apiDetails.name}</h1>
           <p>{apiDetails.description || 'No description available.'}</p>
         </div>
         <button className="api-description-back-btn" onClick={() => navigate('/')}>
           Back
         </button> */}
       </div>

       {/* Method and Endpoint */}
       {/* <div className="api-method-url">
         <span className="method-tag">{apiDetails.method}</span>
         <span className="endpoint-url">{apiDetails.endpoint}</span>
       </div> */}

       {/* Parameters */}
       {/* <div className="section-heading">Request</div>
       <div className="parameter-group">
         {apiDetails.parameters?.map((param, index) => (
          <div key={index} className="parameter-row">
            <span className="parameter-name">{param.name}</span>
            <span className="parameter-type">{param.type}</span>
            <span className="parameter-required">
              {param.required ? 'Required' : 'Optional'}
            </span>
          </div>
        ))}
      </div> */}

      {/* Response */}
      {/* <div className="section-heading">Response</div>
      {typeof apiDetails.response === 'object' ? (
        <ExpandComponent obj={apiDetails.response} />
      ) : (
        <pre className="code-box">{apiDetails.response}</pre>
      )} */}

      {/* Language Tabs */}
      {/* <div className="section-heading">Languages</div>
      <div className="language-tabs">
        {Object.keys(languageMap).map((lang, index) => (
          <img
            key={index}
            src={`/assets/${lang.toLowerCase().replace(/[^a-z]/g, '')}.png`}
            alt={lang}
            className={`language-tab ${selectedLanguage === lang ? 'active' : ''}`}
            onClick={() => setSelectedLanguage(lang)}
          />
        ))}
      </div> */}

      {/* Code Sample */}
      {/* <div className="section-heading">Request Sample</div>
      <CodeSnippet code={codeSnippet} language={languageMap[selectedLanguage]} /> */}
    </div>
      </div>
    {/* </div> */}
    </>
  );
};

export default ApiDescription;
