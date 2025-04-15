import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import ExpandComponent from '../components/ExpandComponent';
import CodeSnippet from '../components/CodeSnippet';

const SandboxPage = ({ api }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("cURL");
  const [sampleresponse, setSampleresponse] = useState({ body: null, lang: null, code: '' });

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

  const standardExamples = (method, endpoint, body = '{}') => {
    // Return code examples as you did in your original code...
  };

  const codeExamples = standardExamples(api.request.method, api.request.url, api?.request?.body?.raw);

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
  };

  useEffect(() => {
    if (api.response.length > 0) {
      setSampleresponse({ body: api.response[0].body, lang: api.response[0]._postman_previewlanguage, code: api.response[0].code });
    }
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container">
      <div className="row pt-3">
        <div className="col-10">
          <div>
            <Link href="#" className="text-decoration-none heading-color">Home / CONSENT REQUEST / Overview</Link>
          </div>
        </div>
        <div className="col-2">
          <button type="button" className="btn btn-explore" onClick={handleShowModal}>
            Test in Sandbox
          </button>
        </div>
      </div>

      <h3 className="mt-2 pt-4 green-color">{api.name}</h3>
      
      {/* Trigger Modal with API Data */}
      <div className="row post-url-bg mt-3 mx-1" onClick={handleShowModal}>
        <div className='col-xl-1 col-lg-2 col-md-3 col-sm-4 col-2'>
          <span className="white-badge">
            <Link href="#" className="text-decoration-none">{api.request.method}</Link>
          </span>
        </div>
        <div className='col-xl-11 col-lg-10 col-md-9 col-sm-12 col-12'>
          <h6 className="mb-0 ">
            <Link href="#" className="text-decoration-none anchor-color">{api.request.url}</Link>
          </h6>
        </div>
      </div>

      {/* Modal for Detailed Data */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>API Details: {api.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Request</h3>
          <h6 className="green-color pt-2 pb-2">Header Parameters</h6>
          <div className="row header-parameter">
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 ">
              {api?.request?.header.map((header, index) => (
                <p className="mb-1" key={index}>{header.key}</p>
              ))}
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 ">
              {api?.request?.header.map((header, index) => (
                <p className="mb-1 property-type" key={index}>{typeof header.value}</p>
              ))}
            </div>
          </div>

          <h6 className="green-color mt-3">Body</h6>
          {api?.request?.body && <ExpandComponent obj={JSON.parse(api?.request?.body?.raw || '{}')} />}
          
          <h6 className="green-color mt-3">Response</h6>
          {sampleresponse.body && <ExpandComponent obj={JSON.parse(sampleresponse.body || '{}')} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* The rest of your page (languages, code samples) remains the same */}
    </div>
  );
};

export default SandboxPage;
