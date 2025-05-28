import ResultInput from './Input';
import React from "react";

export const userData = {
  name: '',
  email: '',
};

export function App() {
  const user = React.useRef();
  const email = React.useRef();
    
  function handleSaveData() {
    userData.name = user.current.value;
    userData.email = email.current.value;

    console.log(userData);
  }

  return (
    <div id="app">
      <ResultInput type="text" label="Your Name" placeholder={"Your Name"} ref={user}/>
      <ResultInput type="email" label="Your E-Mail" placeholder={"Your Email"} ref={email}/>
      <p id="actions">
        <button onClick={handleSaveData}>Save Data</button>
      </p>
    </div>
  );
}

