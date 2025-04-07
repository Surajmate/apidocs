import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ApiListDetails = () => {
    const { id } = useParams()
    const apiData = JSON.parse(localStorage.getItem("apiData")) || [];
    useEffect(() => {
        apiData.forEach((api) => {
            if (api.id === id) {
                console.log(api)
            }
        })
    }, [])
    return (
        <div>ApiListDetails</div>
    )
}

export default ApiListDetails