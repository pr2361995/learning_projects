import { createContext, useContext, useState } from "react";
import {AccordionItem} from "../AccordionItem";
import AccordionTittle from "../AccordionTittle";
import AccordionContent from "../AccordionContent";

const AccordionContext = createContext({
    openerId : null,
    toggleFn : () => {}
});

export function useAccordionContext(){
    const ctx = useContext(AccordionContext);
    if(!ctx){
        new Error("Accordion context is missing")
    }
    return ctx;
} 

export function Accordion({children}){
    const [openerId,setOpenerId] = useState(null);
    const contextValue = {
        openerId,
    }
    function toggleAccordion(id){
        setOpenerId(prevId => id ? (prevId === id ? null : id) : null)
    }
    contextValue.toggleFn = toggleAccordion;

    return (
        <AccordionContext.Provider value={contextValue}>
            <div className="accordion">
                {children}            
            </div>
        </AccordionContext.Provider>
    );
}

Accordion.Item = AccordionItem
AccordionItem.Title = AccordionTittle;
AccordionItem.Content = AccordionContent;
