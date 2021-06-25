import React, { useState, useEffect } from 'react';
import firebase from '../util/Firebase';
import Loading from './Loading';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillEye } from 'react-icons/ai';


function OneVideo(props) {
    const ref = firebase.database().ref('users/' + props.uid + '/videos');
    const [video, setvideo] = useState();
    const [once, setonce] = useState(true);



    useEffect(() => {
        if (once) {
            if (props.playlistid) {
                //
                ref.child('playlists').child(props.playlistid).child('videos').child(props.video).on('value', (value) => {
                    setvideo(value.val());
                })
            }
            else {
                ref.child('videos').child(props.video).on('value', (value) => {
                    setvideo(value.val());
                })
            }
            setonce(false);
        }
    }, [ref, once, setonce, setvideo, props])

    if (video) {
        return (
            <div style={{ width:'100%', border: '1px solid white', marginBottom: '10px', boxShadow: '0px 0px 10px gray', padding: '3px', borderRadius: '0px', display:'flex', flexWrap:'wrap'}}>
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                        title="watch"
                        className="embed-responsive-item"
                        src={video.url}
                        style={{ border: 'none' }}
                        sandbox="allow-scripts allow-presentation allow-same-origin"
                        allow=" fullscreen; picture-in-picture; xr-spatial-tracking; encrypted-media"
                    ></iframe>
                </div>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', overflowX:'hidden' }}>
                    <b>{video.title}</b>
                    <i>{video.description}<div><AiFillEye/>{video.views}</div></i>
                </div>
            </div>
        );
    } else {
        return (<Loading />);
    }
}


export default OneVideo;