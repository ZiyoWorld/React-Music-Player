import React, { useState, useRef } from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";

import "./styles/app.scss";
import data from "./data_music";

function App() {
  
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus]=useState(false);
   

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
    <div className={`App`}>
      
      <div className={` transitions ${libraryStatus ? "library-actives-player" : "" }`}>
      <Nav
      libraryStatus={libraryStatus}
      setLibraryStatus={setLibraryStatus}
      />

      <Song currentSong = {currentSong} />
       <Player 
       currentSong = {currentSong} 
       isPlaying={isPlaying}
       setIsPlaying={setIsPlaying}
       audioRef={audioRef}
       setSongInfo={setSongInfo}
       songInfo={songInfo}
       songs={songs}
       setSongs={setSongs}
       id={songs.id}
       setCurrentSong={setCurrentSong}
       timeUpdateHandler={timeUpdateHandler}
       />

      </div>
       
       <Library 
       setCurrentSong={setCurrentSong} 
       audioRef={audioRef}
       songs={songs}
       isPlaying={isPlaying}
       setSongs={setSongs}
       libraryStatus={libraryStatus}
       
       />
    </div>
  );
}

export default App;
