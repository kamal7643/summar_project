import React, { useState, useEffect }from 'react';
import firebase from '../util/Firebase';
import Loading from './Loading';


function OneVideo(props) {
    const ref = firebase.database().ref('users/' + props.uid + '/videos');
    const [video, setvideo]= useState();
    const [once,setonce] = useState(true);
    


    useEffect(() =>{
        if(once){
            if(props.playlistid){
                //
                ref.child('playlists').child(props.playlistid).child(props.video).on('value',(value) =>{
                    setvideo(value.val());
                })
            }
            else{
                ref.child('videos').child(props.video).on('value',(value) =>{
                    setvideo(value.val());
                })
            }
            setonce(false);
        }
    },[ref,once,setonce,setvideo, props])

    if(video){
        return(
            <div>
                <iframe src={video.url} title={video.title} width="100%" ></iframe>
            </div>
        );
    }else{
        return(<Loading/>);
    }
}


export default OneVideo;