import { useEffect, useRef, useState } from "react";
import Modal from "./ref";

function App() {

  const [modalIsopen,setModalisOpen] = useState(false);
  
  function showModal(){
    setModalisOpen(true);
  }

  function closeModal(){
    setModalisOpen(false);
  }

  return (
    <>
      <Modal open={modalIsopen}>
        modal is rendered
        <button onClick={closeModal}>Close</button>
      </Modal>

      <header>
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
        <button onClick={showModal}>show Modal</button>
      </header>
    </>
  );
}

export default App;
