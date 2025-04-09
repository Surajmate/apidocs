import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ApiDescription from './ApiDescription';
import Markdown from 'react-markdown';
import SandboxPage from './SandboxPage';

const ApiListDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const apiData = JSON.parse(localStorage.getItem("apiData")) || [];
    const [apiList, setApiList] = useState(null);
    const [apiFolderList, setApiFolderList] = useState([]);
    const [apiDetails, setApiDetails] = useState(null);
    const [collectionDetails, setCollectionDetails] = useState({ name: '', desc: '' });
    const [isApi, setIsApi] = useState(null);

    const handleFolderList = (api) => {
        if (api?.item?.length > 0) {
            setIsApi(true);
            let itemFound = false;
            api.item.forEach((item) => {
                if (item?.item?.length) {
                    itemFound = true;
                }
            });
            if (itemFound) {
                setApiList(null);
                setApiFolderList(api.item);
            } else {
                setApiList(api);
                setApiDetails(api.item[0]);
            }
        }
    }
    const checkItem = (apiData) => {
        apiData.forEach((api) => {
            if (api.id === id) {
                setCollectionDetails({ name: api.name, desc: api.description });
                if (api?.item?.length > 0) {
                    setIsApi(true);
                    let itemFound = false;
                    api.item.forEach((item) => {
                        if (item?.item?.length) {
                            item.itemAvailable = true;
                            itemFound = true;
                        } else {
                            item.itemAvailable = false;
                        }
                    });
                    if (itemFound) {
                        setApiList(null);
                        console.log(api.item)
                        setApiFolderList(api.item);
                    } else {
                        setApiList(api);
                        setApiDetails(api.item[0]);
                    }
                }
            }
        })
    }
    const handleApiBack = () => {
        setApiList(null);
        setApiDetails(null);
        if (apiFolderList.length <= 0) {
            navigate("/", { state: { openPopup: true } });
        }

    }
    useEffect(() => {
        checkItem(apiData);
    }, [])

    return (
        <div className='container-fluid'>
            <div className='row m-2'>
                <div className='col-3 list-group-div'>
                    {!apiList && <div className="mt-2">
                        <div className=" my-2 d-flex justify-content-between align-items-center">
                            <h1 className='mb-0'>{collectionDetails.name}</h1>
                            <button className="popup-card p-1" onClick={() => navigate("/", { state: { openPopup: true } })}>back</button>
                        </div>
                        {apiFolderList.map((item, index) => (
                            <button key={index} className="mb-2 popup-card p-2 w-100 d-flex justify-content-between align-items-center"
                                onClick={() => { handleFolderList(item); }}>
                                <img src="/assets/folder-icon.png" alt="" style={{ width: '2em' }} />
                                <span className='text-center'>{item.name}</span>
                                <span className='text-center'>{item?.item?.length}</span>
                            </button>
                        ))}
                    </div>}
                    {apiList && <div className="mt-2">
                        <div className="d-flex justify-content-between align-items-center">
                            <h1 className='mb-0'>{apiList.name}</h1>
                            <button className="popup-card p-1" onClick={handleApiBack}>back</button>
                        </div>
                        {
                            apiList?.item?.map((item) => {
                                return <div key={item.name} className="mt-2">
                                    <button className="popup-card p-2 w-100 d-flex justify-content-between align-items-center" onClick={() => { console.log(item); setApiDetails(item); }}>
                                        <span className="badge bg-success">{item.request.method}</span>
                                        <span className='text-center'>{item?.name}</span>
                                    </button>
                                </div>
                            })
                            // apiFolderList.map((item, index) => {
                        }
                    </div>}
                </div>
                <div className='col-9 sandbox-div'>
                    {/* {apiDetails && <ApiDescription api={apiDetails} />} */}
                    {apiDetails && <SandboxPage api={apiDetails} />}
                    {
                        !apiDetails && isApi && <Markdown>{collectionDetails.desc}</Markdown>
                    }
                    {
                        !isApi && <div className="w-100 markdown">
                            <Markdown>{collectionDetails?.desc}</Markdown>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ApiListDetails