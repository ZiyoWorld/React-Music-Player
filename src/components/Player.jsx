import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';
import { playSong } from '../until';


function Player({
  currentSong, 
  isPlaying, 
  setIsPlaying, 
  audioRef,
  songInfo, 
  setSongInfo, 
  timeUpdateHandler,
  setCurrentSong,
  songs,
  setSongs
}) {

    useEffect( ()=>{
      const newSongs = songs.map( song => {
        if(song.id === currentSong.id){
            return{
                ...song,
                active: true,
            }
        }
        else{
            return{
                ...song,
                active: false
            }
        }
        
     });
     setSongs(newSongs)
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[currentSong]);
  
  const playSongHandle = ()=>{
    if(isPlaying){
      audioRef.current.pause();
      setIsPlaying(!isPlaying)
    }else{
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const skipTrack = (direction)=>{
     let currentIndex = songs.findIndex( (song)=> song.id === currentSong.id);
     if(direction === "skip-forward"){
        setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        playSong(isPlaying, audioRef);
     }
     if(direction === "skip-back"){
      if((currentIndex - 1) % songs.length === -1){
        setCurrentSong(songs[songs.length - 1]);
        playSong(isPlaying, audioRef);             
        return;
      } 
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      playSong(isPlaying, audioRef);
   }
   playSong(isPlaying, audioRef);
  }

  

  const getTime = (time)=>{
          return( 
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)

         )};

  const drackHandler = (e)=>{
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...setSongInfo,
      currentTime: e.target.value,
    })
  };
  
  return (
    <div className='player'>
        <div className="time-control">
            <p>{getTime(songInfo.currentTime)}</p>

            <input type="range"
            min="0"
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={drackHandler}
            />
            <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
        </div>
        <div className="player-control">
        <FontAwesomeIcon className='skip-back'
        onClick={()=>skipTrack("skip-back")}
         size="2x" 
         icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHandle} size="2x" className='play' icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon 
        onClick={()=>skipTrack("skip-forward")}
        size='2x' 
        className='skip-forward'
         icon={faAngleRight} /> 
        </div>
        <audio 
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        src={currentSong.audio}
        ref={audioRef} >

        </audio>
    </div>
  )
}

export default Player;