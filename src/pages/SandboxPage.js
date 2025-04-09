import React from 'react'
import { Link } from 'react-router-dom'

const SandboxPage = ({ api }) => {
    console.log(api)
    let obj = {
        name: "adadsada",
        age: 10,
        address: {
            city: "delhi",
            state: "up",
            pin: ['123456', '654321']
        },
        hobbies: ["reading", "writing"]

    }
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
                    <div className="row">
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
                                    <p className="mb-1" key={index}>{header.type}</p>
                                ))
                            }
                        </div>
                    </div>
                    <h6 className="green-color mt-3">Body</h6>
                    {!api?.request?.body && <div>
                        <div className="properties-container">
                            {Object.keys(obj).map((key, index) => (
                                <div className="property-container" key={index}>
                                    {typeof obj[key] != 'object' &&
                                        <div className="property-row">
                                            <span className="property-name">{key}</span>
                                            <span className="property-type">{typeof obj[key]}</span>
                                            <span className="required">Required</span>
                                        </div>
                                    }
                                    {typeof obj[key] == 'object' &&
                                        <div className="property-row">
                                            <input src="/assets/greater-than-symbol.png" alt="Expand" className="expand-icon" type="image"
                                                style={{ cursor: 'pointer', marginRight: '10px' }} />
                                            <span className="property-name">{key}</span>
                                            <span className="property-type">{typeof obj[key]}</span>
                                            <span className="required">Required</span>
                                        </div>
                                    }
                                </div>
                            ))}
                            <div className="property-container">
                                <div className="property-row">
                                    <span className="property-name">client_secret</span>
                                    <span className="property-type">string</span>
                                    <span className="required">Required</span>
                                </div>
                            </div>
                            <div className="property-container">
                                <div className="property-row">
                                    <span className="property-name">redirect_uri</span>
                                    <span className="property-type">string</span>
                                    <span className="required">Required</span>
                                </div>
                            </div>
                            <div className="property-container">
                                <div className="property-row">
                                    <span className="property-name">code</span>
                                    <span className="property-type">string</span>
                                    <span className="required">Required</span>
                                </div>
                            </div>
                            <div className="property-container">
                                <div className="property-row"><span className="property-name">grant_type</span>
                                    <span className="property-type">string</span>
                                    <span className="required">Required</span>
                                </div>
                            </div>
                            <div className="property-container"><div className="property-row"><span className="property-name">code_verifier</span>
                                <span className="property-type">string</span>
                                <span className="required">Required</span>
                            </div>
                            </div>
                        </div>
                    </div>}
                    <div className="properties-container">
                        <div className="property-container">
                            <div className="property-row">
                                <input src="/assets/down.png" alt="Collapse" className="expand-icon" type="image"
                                    style={{ cursor: 'pointer', marginRight: '10px' }} aria-expanded="true" />
                                <span className="property-name">Certificate</span>
                                <span className="property-type">object</span>
                                <span className="required">Required</span>
                            </div>

                            <div className="sub-properties" style={{ paddingLeft: '20px' }}>
                                <div className="properties-container">
                                    <div className="property-container">
                                        <div className="property-row">
                                            <input src="/assets/greater-than-symbol.png" alt="Expand" className="expand-icon" type="image"
                                                style={{ cursor: 'pointer', marginRight: '10px' }} />
                                            <span className="property-name">CertificateData</span>
                                            <span className="property-type">object</span>
                                            <span className="required">Required</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12">
                    <h6>Languages</h6>
                    <div className=" Scroll-language d-flex">
                        <div className=" mb-2 ">
                            <div className="bg-light-green">
                                <img src="/assets/Curl.png" alt='language-img' width="100%" />
                                <p className="text-center mb-0 pb-2 language-name-white">Curl</p>
                            </div>
                        </div>
                        <div className=" mb-2 ms-3">
                            <div className="bg-light-green">
                                <img src="/assets/Go.png" alt='language-img' width="100%" />
                                <p className="text-center mb-0 pb-2 language-name-white">Go</p>
                            </div>
                        </div>
                        <div className=" mb-2 ms-3">
                            <div className="bg-light-green">
                                <img src="/assets/Python.png" alt='language-img' width="100%" />
                                <p className="text-center mb-0 pb-2 language-name-white">Python</p>
                            </div>
                        </div>
                        <div className=" mb-2 ms-3">
                            <div className="bg-light-green">
                                <img src="/assets/Node.png" alt='language-img' width="100%" />
                                <p className="text-center mb-0 pb-2 language-name-white">Node</p>
                            </div>
                        </div>
                        <div className=" mb-2 ms-3">
                            <div className="bg-light-green">
                                <img src="/assets/php.png" alt='language-img' width="100%" />
                                <p className="text-center mb-0 pb-2 language-name-white">PHP</p>
                            </div>
                        </div>
                        <div className=" mb-2 ms-3">
                            <div className="bg-light-green">
                                <img src="/assets/java.png" alt='language-img' width="100%" />
                                <p className="text-center mb-0 pb-2 language-name-white">Java</p>
                            </div>
                        </div>
                        <div className=" mb-2 ms-3">
                            <div className="bg-light-green">
                                <img src="/assets/net.png" alt='language-img' width="100%" />
                                <p className="text-center mb-0 pb-2 language-name-white">.Net</p>
                            </div>
                        </div>
                        <div className=" mb-2 ms-3">
                            <div className="bg-light-green">
                                <img src="/assets/ruby.png" alt='language-img' width="100%" />
                                <p className="text-center mb-0 pb-2 language-name-white">Ruby</p>
                            </div>
                        </div>
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
                        <p className="p-3 text-white">curl --request 'https://ufsi.agristack.gov.in/nm-auth/
                            realms/sunbird-rc/protocol/openid-connect/token' \
                            --header 'content-type: application/x-www-form-
                            urlencoded' \
                            --data-urlencode 'client_id=registry-frontend' \
                            --data-urlencode 'username=UP_AIP_ADMIN' \
                            --data-urlencode 'password=up_Admin@123' \
                            --data-urlencode 'grant_type=password'</p>
                    </div>
                    <select className="form-select mt-2 select-border" aria-label="Default select example">
                        <option selected="">200 OK</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    {/* <div className="d-flex justify-content-between base-url-bg mt-3">
                                <div>
                                    <h6 className="mb-0"> <Link href="#"
                                        className="text-decoration-none anchor-color">https:wwwwwwwwwwwwwwwk.gov.in/</Link>
                                    </h6>
                                </div>
                                <div>
                                    <i className="far fa-copy green-color"></i>
                                </div>
                            </div>
                            <div className="border-request">
                                <p className="p-2">curl --request 'https://ufsi.agristack.gov.in/nm-auth/
                                    realms/sunbird-rc/protocol/openid-connect/token' \
                                    --header 'content-type: application/x-www-form-
                                    urlencoded' \
                                    --data-urlencode 'client_id=registry-frontend' \
                                    --data-urlencode 'username=UP_AIP_ADMIN' \
                                    --data-urlencode 'password=up_Admin@123' \
                                    --data-urlencode 'grant_type=password'</p>
                            </div> */}
                </div>
            </div>

        </div>
    )
}

export default SandboxPage