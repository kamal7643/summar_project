import React,{ useState, useEffect} from 'react';
import firebase from '../util/Firebase';
import OneVideo from './OneVideo';
import { AiFillDelete } from 'react-icons/ai';
import { MdExpandMore } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import AddVideoToPlayList from '../components/AddVideoToPlayList';


function Playlist(props){
    const ref = firebase.database().ref('users/' + props.uid + '/videos/playlists/'+props.playlistid);
    const [once, setonce] = useState(true);
    const [keys, setkeys] = useState([]);
    const [show, setshow] = useState(false);
    const [show2, setshow2] = useState(false);

    const toggleshow = () => { 
        if(keys.length===0 && !show){
            confirmAlert({
                title:'Empty playlist',
                message: 'This playlist is empty',
                buttons: [{
                    label:'continue'
                }]
            });
        }
        setshow(!show);
    }

    const toggleshow2 = () => {
        setshow2(!show2);
    }

    const deletePlayList = () => { 
        ref.set({});
    }


    useEffect(() => {
        if (once) {
            ref.child('videos').on('value', (value) => {
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
            <div 
            style={{ 
                display: 'flex', 
                flexDirection: 'row' 
            }}
            >
                <span style={{width: '100%'}}>
                    {props.playlistid}
                </span>
                <AiFillDelete 
                onClick={deletePlayList} 
                style={{ 
                    marginTop: '5px', 
                    width:'10%' 
                }} />
                <FaPlus
                    style={{
                        marginTop: '5px',
                        width: '10%'
                    }}
                onClick={toggleshow2}
                />
                <MdExpandMore 
                onClick={toggleshow} 
                style={{ 
                    marginTop: '5px', 
                    width:'10%' 
                }}
                />
                </div>
            {show2 && <AddVideoToPlayList  uid={props.uid} playlistid={props.playlistid} toglle={setshow2}/>}
            {show && keys.map((key, i)=><OneVideo uid={props.uid} playlistid={props.playlistid} key={i} video={key.key}/>)}
        </div>
    );
}


export default Playlist;