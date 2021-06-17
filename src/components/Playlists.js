import React, { useState, useEffect }from 'react';
import firebase from '../util/Firebase';
import Playlist from './Playlist';


function Playlists(props){
    const ref = firebase.database().ref('users/'+props.uid+'/videos/playlists');
    const [once,setonce] = useState(true);
    const [keys,setkeys] = useState([]);


    useEffect(()=>{
        if(once){
            ref.on('value', (value)=>{
                let temp = [];
                value.forEach(snap=>{
                    temp.push(snap.key);
                })
                if(temp!==keys){
                    setkeys(temp);
                }
            })
            setonce(false);
        }
    }, [once, ref, keys])
    return(
        <div>
        {
            //edit name
            // show hide button on top
            //list of individual videos
            //add new video
        }
            <b>Playlists</b>
            <div style={{textAlign:'left'}}>{
               keys.map((key, i)=><Playlist key={i} uid={props.uid} playlistid={key} />)
            }</div>
        </div>
    );
}

export default Playlists;