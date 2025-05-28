import React, { useCallback, useEffect, useState } from 'react'

export async function sendHttpRequest(url,config){
    debugger;
    const response = await fetch(url,config);
    const data = await response.json();

    if(!response.ok)
        throw new Error(data.message || "Somthing went wrong, failed to send request")
    return data; 
}

function useHttp(url,config,initialData) {
    const [data,setData] = useState(initialData);
    const [isLoading,setLoading] = useState(false);
    const [error,setError] = useState()

    function clearData(){
        setData(initialData);
    }

    const sendRequest = useCallback(async function sendRequest(reqBody){
        debugger;
        setLoading(true);
        try{
            const data = await sendHttpRequest(url,{...config,body:reqBody});
            setData(data);
        }catch(err){
            setError(err.message || "something went wrong")
        }
        setLoading(false);
    },[url,config])

    useEffect(()=>{
        debugger;
        if((config && ( config.method === "GET" || !config.method))  || !config)
            sendRequest();
    },[sendRequest])

    return {
       data,
       isLoading,
       error,
       sendRequest,
       clearData
    }
}

export default useHttp