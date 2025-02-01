import { useEffect, useState } from "react"

let globalState = {},
listeners = [],
actions = {}

const printf = () => {
    console.log("globalState : ",globalState)
    console.log("listeners : ",listeners)
    console.log("actions : ",actions)
}

export const useStore = (isListen=true) => {
    const setState = useState()[1];

    const dispatch = (actionIndentifier,payload) => {
        const newState = actions[actionIndentifier](globalState,payload);
        globalState = {...globalState,...newState};

        listeners.forEach(listen => {
            listen(globalState);
        }); 
    };

    useEffect(()=>{
        isListen && listeners.push(setState);
        return () => isListen && listeners.filter(listener => listener !== setState)
    },[setState,isListen])

    return [globalState,dispatch]
}

export const initStore = (userActions,initState) => {
    if(initState){
        globalState = { ...globalState, ...initState}
    }
    actions =  { ...actions,  ...userActions} 
}