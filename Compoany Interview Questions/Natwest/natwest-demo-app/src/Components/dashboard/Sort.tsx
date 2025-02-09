import React from 'react'
import classes from "./sort.module.css";
import { FaSortUp, FaSortDown } from "react-icons/fa";

const Sort : React.FC<{className:string,handleSort:()=>void}> = ({className,handleSort}) => {
  return (
    <span 
        className={`${classes.sorticons} ${className}`} 
        onClick={handleSort}
        >
        <FaSortUp />
        <FaSortDown />
    </span>
  )
}

export default Sort