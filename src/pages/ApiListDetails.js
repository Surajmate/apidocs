import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';

import SandboxPage from './SandboxPage';

const ApiListDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const rawApiData = JSON.parse(localStorage.getItem("apiData")) || {};

  const [apiList, setApiList] = useState(null);
  const [apiFolderList, setApiFolderList] = useState([]);
  const [apiDetails, setApiDetails] = useState(null);
  const [collectionDetails, setCollectionDetails] = useState({ name: '', desc: '' });
  const [isApi, setIsApi] = useState(null);

  const handleFolderList = (folder) => {
    if (folder?.item?.length > 0) {
      const hasNestedFolders = folder.item.some(sub => sub.item && sub.item.length > 0);

      if (hasNestedFolders) {
        setApiList(null);
        setApiDetails(null);
        setApiFolderList(folder.item);
      } else {
        setApiList(folder);
        setApiDetails(folder.item[0]);
      }
    }
  };

  const checkItem = (apiDataObject) => {
    const apiEntries = Object.entries(apiDataObject); // [ ["accessToken", {...}], ["salesData", {...}] ]

    for (const [key, value] of apiEntries) {
      if (key === id) {
        const name = value.title || key;
        setCollectionDetails({ name, desc: "" }); // Add description if needed

        if (value.item && value.item.length > 0) {
          setIsApi(true);
          const hasSubItems = value.item.some((item) => item?.item?.length);
          if (hasSubItems) {
            setApiList(null);
            setApiFolderList(value.item.map(item => ({
              ...item,
              itemAvailable: !!item?.item?.length
            })));
          } else {
            setApiList(value);
            setApiDetails(value.item[0]);
          }
        } else {
          setIsApi(false);
        }
        break;
      }
    }
  };

  const handleApiBack = () => {
    setApiList(null);
    setApiDetails(null);
    if (apiFolderList.length <= 0) {
      navigate("/", { state: { openPopup: true } });
    }
  };

  useEffect(() => {
    checkItem(rawApiData);
  }, [id]);

  return (
    <div className='container-fluid'>
      <div className='row m-2'>
        <div className='col-3 list-group-div'>
          {!apiList && (
            <div className="mt-2">
              <div className="my-2 d-flex justify-content-between align-items-center">
                <h1 className='mb-0'>{collectionDetails.name}</h1>
                <button className="popup-card p-1" onClick={() => navigate("/", { state: { openPopup: true } })}>back</button>
              </div>
              {apiFolderList.map((item, index) => (
                <button
                  key={index}
                  className="mb-2 popup-card p-2 w-100 d-flex justify-content-between align-items-center"
                  onClick={() => handleFolderList(item)}
                >
                  <img src="/assets/folder-icon.png" alt="" style={{ width: '2em' }} />
                  <span className='text-center'>{item.name}</span>
                  <span className='text-center'>{item?.item?.length}</span>
                </button>
              ))}
            </div>
          )}

          {apiList && (
            <div className="mt-2">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className='mb-0'>{apiList.name || collectionDetails.name}</h1>
                <button className="popup-card p-1" onClick={handleApiBack}>back</button>
              </div>
              {apiList?.item?.map((item, index) => (
                <div key={index} className="mt-2">
                  <button
                    className="popup-card p-2 w-100 d-flex justify-content-between align-items-center"
                    onClick={() => setApiDetails(item)}
                  >
                    <span className="badge bg-success">{item.request?.method}</span>
                    <span className='text-center'>{item?.name}</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='col-9 sandbox-div'>
          {apiDetails && <SandboxPage api={apiDetails} />}
          {!apiDetails && isApi && <Markdown>{collectionDetails.desc}</Markdown>}
          {!isApi && <div className="w-100 markdown"><Markdown>{collectionDetails?.desc}</Markdown></div>}
        </div>
      </div>
    </div>
  );
};

export default ApiListDetails;
