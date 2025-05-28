import Player from "./components/Player";
import { TimeChallange } from "./components/TimeChallenge";

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
      <TimeChallange title="Easy" targetTime={1}></TimeChallange>
      <TimeChallange title="Not Easy" targetTime={5}></TimeChallange>
      <TimeChallange title="Getting tough" targetTime={10}></TimeChallange>
      <TimeChallange title="Props Only" targetTime={15}></TimeChallange>
      </div>
    </>
  );
}

export default App;
