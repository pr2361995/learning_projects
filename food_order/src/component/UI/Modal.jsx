import React, { useContext, useEffect, useRef,forwardRef,useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'
import CartContext from '../../store/cartContext'

const Modal = forwardRef(({children,className=""},ref) => {
    const dialog = useRef();

    useImperativeHandle(ref,()=>({
            open(){
                dialog.current?.showModal();
            },
            close(){
                dialog.current?.close();
            }
    }))

    useEffect(()=>{
        return () => dialog.current?.close(); 
    },[])

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={()=> dialog.current?.close()}>
         {children}
        </dialog>
    ,document.getElementById('modal'));
});

export default Modal