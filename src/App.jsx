import React, { useState, useRef } from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";

import "./styles/app.scss";
import data from "./data_music";

function App() {
  
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
   

  const audioRef = useRef(null);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration:  0,
  });

  const timeUpdateHandler = (e) =>{
    const current = e.target.currentTime;
    const duration = e.target.duration;

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
    })
  };

  return (
    <div className="App">
       <Song currentSong = {currentSong} />
       <Player 
       currentSong = {currentSong} 
       isPlaying={isPlaying}
       setIsPlaying={setIsPlaying}
       audioRef={audioRef}
       setSongInfo={setSongInfo}
       songInfo={songInfo}
       timeUpdateHandler={timeUpdateHandler}
       />
       <Library setCurrentSong={setCurrentSong} 
       audioRef={audioRef}
       songs={songs}
       isPlaying={isPlaying}
       setSongs={setSongs}
       
       />
    </div>
  );
}

export default App;
