import React from 'react'
import { useAccordionContext } from './Accordion'
import { useAccordionItemContent } from './AccordionItem';

function AccordionTittle({title,className}) {
    const {toggleFn} = useAccordionContext();
    const {id} = useAccordionItemContent();
    return (
        <div onClick={()=>toggleFn(id)} className={`${className} accordion-item-title`}>
            {title}
        </div>
    )
}

export default AccordionTittle
