import React,{forwardRef} from "react";

const ResultInput = forwardRef (function Input(props,ref) {
    const {label,...otherProps}  = props;
  // Todo: Accept forwarded ref and "connect" it to the <input> element
  return (
    <p className="control">
      <label>{label}</label>
      <input {...otherProps} ref={ref}/>
    </p>
  );
})

export default ResultInput;
