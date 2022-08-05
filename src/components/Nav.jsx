import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { faMusic } from '@fortawesome/free-solid-svg-icons';


const Nav = ({libraryStatus, setLibraryStatus})=>{
    return(
        <nav>
            <h1>
            <i className="fa-brands fa-spotify"></i>
                 Mini Spotify</h1>
            <button onClick={()=> setLibraryStatus(!libraryStatus)}>LIbrary
            <FontAwesomeIcon icon={faMusic}  />           
            </button>
        </nav>
    )
}
export default Nav;