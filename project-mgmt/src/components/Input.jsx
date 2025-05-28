import React, { useState } from 'react';

const inpCss = 'w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600'

function Input({label,textarea,...props}) {
  return (<p className='flex flex-col gap-1 my-4 '>
            <label className='text-sm font-bold uppercase text-stone-500'>{label}</label>
            {   textarea ?  
                (
                    <textarea className={inpCss} {...props}/>
                ) : ( 
                    <input className={inpCss} {...props}/>
                )
            }
        </p>)
}

export default Input