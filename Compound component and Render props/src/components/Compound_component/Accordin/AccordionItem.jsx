import React, { useContext } from 'react'
import { createContext } from 'react'

const accordionItemContext = createContext({id:null});

export function useAccordionItemContent(){
    const ctx = useContext(accordionItemContext);
    if(!ctx)
        throw new Error("Accordion Item Context is missing")
    return ctx;
}

export function AccordionItem({id,className,children}) {
    return (
        <accordionItemContext.Provider value={{id}}>
            <div className={`${className} accordion-item`}>
                {children}
            </div>
        </accordionItemContext.Provider>
    )
}

