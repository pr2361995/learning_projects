import React from "react";
import classes from "./textFilter.module.css";

const TextFilter : React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    return (
      <input
        {...props}
        placeholder="Filter..."
        type="search"
        className={`${classes.inputbox} ${props.className}`}
      />
    );
  }
export default TextFilter;