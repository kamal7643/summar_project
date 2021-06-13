import React from 'react';
import AddPlaylist from './AddPlaylist';
import AddVideo from './AddVideo';
import Playlist from './Playlist';
import Individualvideos from './Individualvideos';


function Videos(props){
    return(
        <div style={{maxWidth: '400px'}}>
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
        <Playlist uid={props.uid} />
        <br/>
        <Individualvideos uid={props.uid}/>
        </div>
    );
}


export default Videos;