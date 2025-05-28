import React from 'react'

function Input({id,label,...props}) {
  return (
    <div className='control'>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} {...props}></input>
    </div>
  )
}

export default Input