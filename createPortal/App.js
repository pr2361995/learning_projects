import Toast from './Toast';
import React from 'react';

function App() {
  const [isShow,setShow] = React.useState(false);
  function handleEnrol() {
    // Todo: Show toast
    setShow(true);
    setTimeout(() => {
      // Todo: hide toast
      setShow(pre => !pre);
    }, 3000);
  }

  return (
    <div id="app">
      {isShow && <Toast />}
      <article>
        <h2>React Course</h2>
        <p>
          A course that teaches you React from the ground up and in great depth!
        </p>
        <button onClick={handleEnrol}>Enrol</button>
      </article>
    </div>
  );
}

export default App;
