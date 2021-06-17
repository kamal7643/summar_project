import React,{ useState, useEffect} from 'react';
import firebase from '../util/Firebase';
import OneVideo from './OneVideo';


function Playlist(props){
    const ref = firebase.database().ref('users/' + props.uid + '/videos/playlists/'+props.playlistid);
    const [once, setonce] = useState(true);
    const [keys, setkeys] = useState([]);
    const [show, setshow] = useState(false);

    const toggleshow = () => { 
        setshow(!show);
    }


    useEffect(() => {
        if (once) {
            ref.on('value', (value) => {
                let temp = [];
                value.forEach(snap => {
                    temp.push({key:snap.key, url:snap.val().url});
                })
                if (temp !== keys) {
                    setkeys(temp);
                }
            })
            setonce(false);
        }
    }, [once, ref, keys])
    return(
        <div>
            <span onClick={toggleshow}>{props.playlistid}</span>
            {show && keys.map((key, i)=><OneVideo uid={props.uid} playlistid={props.playlistid} key={i} video={key.key}/>)}
        </div>
    );
}


export default Playlist;