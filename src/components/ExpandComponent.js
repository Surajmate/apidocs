import React, { useState } from 'react'

const ExpandComponent = ({ obj }) => {
    const [expandKey, setExpandKey] = useState([])
    const handleExpand = (key) => {
        setExpandKey((prev) => {
            if (prev.includes(key)) {
                return prev.filter(k => k !== key);
            } else {
                return [...prev, key];
            }
        });
    }
    return (
        <div className="properties-container">
            {Object.keys(obj).map((key, index) => (
                <div className="property-container" key={index}>
                    {typeof obj[key] !== 'object' &&
                        <div className="property-row">
                            <span className="property-name">{key}</span>
                            <span className="property-type">{typeof obj[key]}</span>
                            <span className="required">Required</span>
                        </div>
                    }
                    {typeof obj[key] == 'object' &&
                        <div className="property-row d-flex">
                            <input src={`/assets/${expandKey.includes(key) ? 'down.png' : 'greater-than-symbol.png'}`} alt="Expand" className="expand-icon" type="image"
                                style={{ cursor: 'pointer' }} onClick={() => { handleExpand(key) }} />
                            <span className="property-name">{key}</span>
                            <span className="property-type">{typeof obj[key]}</span>
                            <span className="required">Required</span>
                        </div>
                    }
                    {typeof obj[key] == 'object' && expandKey.includes(key) &&
                        <div className="sub-properties" style={{ paddingLeft: '20px' }}>
                            <ExpandComponent obj={obj[key]} />
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

export default ExpandComponent