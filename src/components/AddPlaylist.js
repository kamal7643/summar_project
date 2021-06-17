import React, { useState, useEffect} from 'react';
import firebase from '../util/Firebase';
import { NotificationContainer, NotificationManager } from 'react-notifications';


function AddPlaylist(props) {
    const [show, setshow] = useState(false);
    const [once, setonce] = useState(true);
    const [names, setnames] = useState([]);
    const [newName, setNewName] = useState('');
    const ref = firebase.database().ref('users/' + props.uid + '/videos/playlists');
    

    const toggleshow = () => {
        setshow(!show);
    }

    function AddNew(){
        if(newName!==''){
            if(names.indexOf(newName)===-1){
                const date = new Date();
                ref.on('value',(value)=>{
                    console.log(value.val())
                })
                ref.child(newName).set({createdAt:date});
                // const key = ref.child(newName).set({createdAt:date}).key;
                // console.log(key);
            }else{
                NotificationManager.error("", "This name already exists", 3000);
            }
        }else{
            NotificationManager.warning("", "Empty name for play list", 3000);
        }
    }

    useEffect(() => {
        if(once){
            ref.on('value', (value) =>{
                let temp = [];
                value.forEach(val=>{
                    temp.push(val.key);
                })
                setnames(temp);
            })
            setonce(false);
        }
    })


    return (
        <div style={{ boxShadow: show && '0px 0px 20px #00000050' }}>
            {
                //show and hide
                //input 
            }
            <div onClick={toggleshow}
                style={{ width: '100%', border: '1px solid gray', display: 'flex', justifyContent: 'center' }}
            >
                <span >Add new playlist</span>
            </div>
            {show && <div 
                style={{ 
                    display: 'flex', 
                    flexDirection: 'row',
                    padding:'20px' 
                }}
                >
                    <input style={{width: '100%'}} value={newName} onChange={(e)=>{setNewName(e.target.value)}} type="text" />
                <button onClick={AddNew}>add</button></div>}
            <NotificationContainer />
        </div>
    );
}


export default AddPlaylist;