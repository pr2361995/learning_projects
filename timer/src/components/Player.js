import { useRef, useState } from "react";

export default function Player() {
    const [playerName,setPlayeName] =useState();
    const player = useRef();
    const handleSetName = () => {
        setPlayeName(player.current.value);
        player.current.value = "";
    }
    return (
      <section id="player">
        <h2>Welcome {(playerName && playerName.length > 0) ? playerName : "unknown entity"}</h2>
        <p>
          <input ref={player} type="text" />
          <button onClick={handleSetName}>Set Name</button>
        </p>
      </section>
    );
  }
  