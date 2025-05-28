import { useEffect } from "react";
import Header from "./component/Header";
import Meals from "./component/Meals";
import { CartContextProvider } from "./store/cartContext";

function App() {
  return (
    <div>
      <CartContextProvider>
        <Header/>
        <Meals/>
      </CartContextProvider>
    </div>
  );
}

export default App;
