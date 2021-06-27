import React, { useState, useEffect, useRef } from 'react';
import firebase from '../util/Firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillEye } from 'react-icons/ai';
import { FiPlay } from 'react-icons/fi';




function WatchItem(props) {

    const watch = new URLSearchParams(props.location.search).get('watch');
    const videoPlayer = useRef();
    const sourceRef = useRef();
    const [currentTime, setCurrentTime] = useState(0);
    const [seekValue, setSeekValue] = useState(0);
    const [activeVideo, setActiveVideo] = useState('');


    useEffect(() => {
        setTimeout(() => {
            if(props.stop){
                setActiveVideo();
                props.setstop(false);
            }
            // sourceRef.current.attributes[1] = null;
            // console.log(sourceRef.current.attributes[1]);
            // console.log(activeVideo.url);
            const ref = firebase.database().ref('videos/'+watch);
            ref.once('value', (value)=>{
                if(activeVideo!==value.val()){
                    setActiveVideo(value.val());
                    props.setcurrentvideo(value.val());
                }
            })
        },1000)
    })


    const onPlaying = () => {
        setCurrentTime(videoPlayer.current.currentTime);
        setSeekValue(
            (videoPlayer.current.currentTime / videoPlayer.current.duration) * 100
        );
    };

    const play = () => {
        videoPlayer.current.play();
    }

    const pause = () => {
        videoPlayer.current.pause();
    };

    const stop = () => {
        videoPlayer.current.pause();
        videoPlayer.current.currentTime = 0;
    };

    const setSpeed = (speed) => {
        videoPlayer.current.playbackRate = speed;
    };

    return(
        <div> {watch && <div style={{ display: 'flex', flexDirection: 'column', margin: '20px', padding: '20px', boxShadow: '0px 0px 10px gray' }}>
            {activeVideo && <video
                width="100%"
                height="100%"
                ref={videoPlayer}
                onTimeUpdate={onPlaying}
            >
                <source
                    id="mp4video"
                    ref={sourceRef}
                    src={activeVideo.url}
                    // src="https://firebasestorage.googleapis.com/v0/b/aplhasecond.appspot.com/o/videos%2FKKR08n4yKUalxy7U3lRuAVL5pug1%2F-Md3H3SAOmaAwQhDImHP?alt=media&token=27fe4125-c58a-4516-b9a5-328a53ad1443"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>}
            <p>{currentTime}</p>
            <input
                type="range"
                min="0"
                max="100"
                step="1"
                style={{ width: '100%'}}
                value={seekValue}
                onChange={(e) => {
                    const seekto = videoPlayer.current.duration * (+e.target.value / 100);
                    videoPlayer.current.currentTime = seekto;
                    setSeekValue(e.target.value);
                }}
            />
            <div style={{textAlign: 'center', marginTop:'10px'}}>
                <span onClick={play}><FiPlay/></span>
                <button onClick={pause}>pause</button>
                <button onClick={stop}>stop</button>
                <button onClick={() => setSpeed(0.5)}>0.5x</button>
                <button onClick={() => setSpeed(1)}>1x</button>
                <button onClick={() => setSpeed(1.5)}>1.5x</button>
                <button onClick={() => setSpeed(2)}>2x</button>
            </div>
            <b>{(activeVideo && activeVideo.title) || "...."}</b>
            <span>{(activeVideo && activeVideo.description) || "..."}</span>
            <span><AiFillEye />{(activeVideo && activeVideo.views)|| "0"}</span>
            
        </div>}
        </div>
    );
}



export default WatchItem;




/*const watch = props.videoid;
    const ref = firebase.database().ref('videos/' + watch);
    const [video, setvideo] = useState();

    useEffect(() => {
        if (watch) {
            ref.once('value', (value) => {
                setvideo(value.val());
                props.setvideo(value.val());
            })
        }
    })

    if (watch && video) {
        return (<div style={{ padding: '10px', margin: '5px', boxShadow: '0px 0px 10px gray'}}>
            <div className="embed-responsive embed-responsive-16by9">
                <iframe
                    title="watch"
                    className="embed-responsive-item"
                    src={video.url}
                    style={{ border: 'none' }}
                    sandbox="allow-scripts allow-presentation allow-same-origin"
                    allow="autoplay; fullscreen; picture-in-picture; xr-spatial-tracking; encrypted-media"
                ></iframe>
            </div>
            <div style={{display: 'flex', flexDirection: 'column' }}>
                <b>{video.title}</b>
                <span>{video.description}</span>
                <i><AiFillEye />{video.views}</i>
            </div>
        </div>);
    } else {
        return (<div></div>);
    }



*/