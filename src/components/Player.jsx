import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';


function Player({currentSong, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, timeUpdateHandler}) {

 
  
  const playSongHandle = ()=>{
    if(isPlaying){
      audioRef.current.pause();
      setIsPlaying(!isPlaying)
    }else{
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  

  const getTime = (time)=>{
          return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
  };

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
            maxLength={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={drackHandler}
            />
            <p>{getTime(songInfo.duration)}</p>
        </div>
        <div className="player-control">
        <FontAwesomeIcon className='skip-back' size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHandle} size="2x" className='play' icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon size='2x' className='skip-forward' icon={faAngleRight} /> 
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