import React, { useState, useEffect, useRef } from 'react';
import firebase from '../../util/Firebase';
import { AiFillEye } from 'react-icons/ai';




function VideoComponent(props) {
    const WATCH = new URLSearchParams(props.location.search).get('watch');
    const [video, setvideo] = useState();
    const ref = firebase.database().ref('videos/' + WATCH);
    const [playingURL, setPlayingURL] = useState('');
    const VideoPlayer = useRef();
    const [addedView, setAddedView] = useState(false);
    const [timeVideoPlayed, setTimeVideoPlayed] = useState(0);
    const [lastNotedTime, setLastNotedTime] = useState(0);



    const updateviews = () =>{
        ref.child('views').set(video.views+1);
    }


    const play = () => {
    }

    const onPlaying = () => {
        if(VideoPlayer.current.currentTime - lastNotedTime < 1){
            setTimeVideoPlayed(timeVideoPlayed + VideoPlayer.current.currentTime - lastNotedTime);
            setLastNotedTime(VideoPlayer.current.currentTime);

        }else{
            setLastNotedTime(VideoPlayer.current.currentTime);
        }
        if(timeVideoPlayed>=30){
            if(!addedView){
                updateviews();
                setAddedView(true);
            }
        }
    }

    useEffect(() => {
        
        if(props.stop){
            setvideo();
            props.setstop(false);
        }
        if (WATCH && playingURL !== WATCH) {
            ref.once('value', (value) => {
                if (video !== value.val()) {
                    setvideo(value.val());
                    props.setcurrentvideo(value.val());
                    setPlayingURL(WATCH);
                    setTimeVideoPlayed(0);
                    setLastNotedTime(0);
                    play();
                }
            })
        }
    }, [props, WATCH, playingURL, ref, video])

    if (WATCH) {
        return (
            <div>
                {video && <div style={{ display: 'flex', flexDirection: 'column', padding:'10px', margin: '10px', boxShadow: '0px 0px 10px gray'}}>
                    <video
                        ref={VideoPlayer}
                        controls={true}
                        onTimeUpdate={onPlaying}
                    >
                        <source src={video.url} />
                    </video>
                    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
                        <b>{video.title}</b>
                        <i>{video.description}{video.playlistid && ' || ' + video.playlistid}<div><AiFillEye />{video.views}</div></i>
                    </div>
                </div>}
            </div>
        );
    }
    return (
        <div style={{display: 'flex', flexDirection: 'column', padding:'20px'}} >
            <input type="search" placeholder="Search..." value={props.search} onChange={(e) => { props.setsearch(e.target.value) }} style={{ boxShadow: '0px 0px 10px gray' }} />
        </div>
    );
}

export default VideoComponent;