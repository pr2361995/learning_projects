import React from 'react'
import { useAccordionContext } from './Accordion';
import { useAccordionItemContent } from './AccordionItem';

function AccordionContent({children}) {
    const {openerId} = useAccordionContext();
    const {id} = useAccordionItemContent();
  return (
    <div className={`${openerId === id ? "open" : "close"} accordion-item-content`}>
      {children}
    </div>
  )
}

export default AccordionContent
