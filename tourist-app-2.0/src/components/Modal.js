import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, onClose, children }) {
  var dialog = useRef();

  useEffect(()=>{
    if(open)
      dialog.current.showModal();
    else 
      dialog.current.close();
  },[open])

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
