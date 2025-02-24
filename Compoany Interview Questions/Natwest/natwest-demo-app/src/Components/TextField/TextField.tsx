import classes from "./TextField.module.css";

const TextField : React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    return (
      <input
        {...props}
        placeholder="Filter..."
        type="search"
        aria-label="filter field"
        className={`${classes.inputbox} ${props.className}`}
      />
    );
  }
export default TextField;