import React from 'react';
import AddPlaylist from './AddPlaylist';
import AddVideo from './AddVideo';
import Playlists from './Playlists';
import Individualvideos from './Individualvideos';


function Videos(props){
    return(
        <div>
        <b >Manage videos</b>
        {
            //add new playlist
            //add new individual video
            //play lists
            //individual videos
            
        }
        <AddPlaylist uid={props.uid}/>
        <br/>
        <AddVideo uid={props.uid}/>
        <br/>
        <Playlists uid={props.uid} />
        <br/>
        <Individualvideos uid={props.uid}/>
        </div>
    );
}


export default Videos;