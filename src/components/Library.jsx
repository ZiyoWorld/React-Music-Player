import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus})=>{
    return(
        <div className={`library ${libraryStatus ? "library-active" : ""}`} >
            <h2>Library</h2>
            <div className="library-songs">
             {
                songs.map( (song)=>{
                    return <LibrarySong 
                     key={song.id} setCurrentSong={setCurrentSong} 
                     song={song} 
                     audioRef={audioRef}
                     isPlaying={isPlaying}
                     id={song.id}
                     setSongs={setSongs}
                     songs={songs}
                     />
                })
             }
            </div>
        </div>
    )
}

export default Library;