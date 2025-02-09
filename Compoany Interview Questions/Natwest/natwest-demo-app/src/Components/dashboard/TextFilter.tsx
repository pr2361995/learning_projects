import React from "react";

const TextFilter : React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    return (
      <input
        {...props}
        placeholder="Filter..."
        type="search"
        className="border p-1 rounded"
      />
    );
  }
export default TextFilter;