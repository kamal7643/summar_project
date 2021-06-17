import React, { useState, useEffect }from 'react';
import firebase from '../util/Firebase';
import OneVideo from './OneVideo';



function Individualvideos(props){
    const ref = firebase.database().ref('users/' + props.uid + '/videos/videos');
    const [once, setonce] = useState(true);
    const [keys, setkeys] = useState([]);
    

    useEffect(() => {
        if (once) {
            ref.on('value', (value) => {
                let temp = [];
                value.forEach(snap => {
                    temp.push({ key: snap.key, url: snap.val().url });
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
            <span ><b>Videos</b></span>
            {keys.map((key, i) => <OneVideo uid={props.uid} key={i} video={key.key} />)}
        </div>
    );
}


export default Individualvideos;