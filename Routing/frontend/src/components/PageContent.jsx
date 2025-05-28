import React from 'react';
import classes from "./PageContent.module.css"

function PageContent({children,title}) {
  return (
    <div className={classes.content}>
        <h1>{title}</h1>
        {children}
    </div>
  )
}

export default PageContent