import { useEffect, useRef, useState } from "react";

import Places from "./components/Places";
import { AVAILABLE_PLACES } from "./data";
import Modal from "./components/Modal";
import DeleteConfirmation from "./components/DeleteConfirmation";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc";

const visitedPlace = JSON.parse(localStorage.getItem("selectedplace")) || [];
const visitedDetails = visitedPlace.map(id => AVAILABLE_PLACES.find(ap => ap.id == id));

function App() {

  const modal = useRef();
  const selectedPlace = useRef();
  const [availablePlace,setAvailablePlace] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(visitedDetails);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((postion)=>{
      const sortPlace = sortPlacesByDistance( AVAILABLE_PLACES, postion.coords.latitude, postion.coords.longitude)
      setAvailablePlace(sortPlace);
    });
  },[])

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const visitedPlace = JSON.parse(localStorage.getItem("selectedplace")) || [];
    if(!visitedPlace.includes(id))
      localStorage.setItem("selectedplace",JSON.stringify([id,...visitedPlace]));
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    const visitedPlace = JSON.parse(localStorage.getItem("selectedplace")) || [];
    localStorage.setItem("selectedplace",JSON.stringify(visitedPlace.filter(vp => vp !== selectedPlace.current)));
    modal.current.close();
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlace}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
