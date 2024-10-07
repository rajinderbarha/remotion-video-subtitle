import { Player } from "@remotion/player";
import VideoPlayer from "./components/VideoPlayer";
import React from "react";
import "./App.css";

const App: React.FC = () => {
  return (
   <div className="App">
    <h1 className="text-center font-bold text-3xl mb-4">Remotion video player with captions</h1>
    <div className="video-container w-fit mx-auto">
      <Player 
        component={VideoPlayer}
        durationInFrames={900}
        fps={21}
        compositionWidth={430}
        compositionHeight={932}
        controls
        className="video_main h-full bg-black"
      />
    </div>
   </div>
  )
}

export default App;