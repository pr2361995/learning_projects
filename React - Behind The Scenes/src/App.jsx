import { useState } from "react";

import Counter from "./components/Counter/Counter";
import Header from "./components/Header";
import { log } from "./log.js";
import ConfiguCounter from "./components/Counter/ConfiguCounter.jsx";

function App() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetClick(enteredNumber) {
    setChosenCount(enteredNumber);
  }

  return (
    <>
      <Header />
      <main>
       <ConfiguCounter onSet={handleSetClick}/>
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
