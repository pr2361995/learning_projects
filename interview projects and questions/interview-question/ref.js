import { useRef } from 'react';
import { createPortal } from 'react-dom';

// this code output
// open will be true or false
// children jsx code or value

function Modal({open, children }) {
  const dialog = useRef();

 if(open){
    dialog.current.showModal();
 }else{
    dialog.current.close();
 }

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
