import classes from "./Sort.module.css";
import { FaSortUp, FaSortDown } from "react-icons/fa";

const Sort : React.FC<{highlight:boolean|null,handleSort:(sort:boolean)=>void}> = ({highlight,handleSort}) => {
  return (
    <span className={`${classes.sorticons}`}>
        <FaSortUp color={highlight === true ? "black" : ""} onClick={()=>handleSort(true)}/>
        <FaSortDown color={highlight === false ? "black" : ""} onClick={()=>handleSort(false)}/>
    </span>
  )
}

export default Sort