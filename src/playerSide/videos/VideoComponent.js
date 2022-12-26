import React, { useState, useEffect, useRef } from 'react';
import firebase from '../../util/Firebase';
import { AiFillEye } from 'react-icons/ai';




function VideoComponent(props) {
    const WATCH = new URLSearchParams(props.location.search).get('watch');
    const watchatyoutube = new URLSearchParams(props.location.search).get('watchatyoutube')
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
                    console.log(value.val());
                    setvideo(value.val());
                    props.setcurrentvideo(value.val());
                    setPlayingURL(WATCH);
                    setTimeVideoPlayed(0);
                    setLastNotedTime(0);
                    play();
                }
            })
        }
        if(watchatyoutube && playingURL!==watchatyoutube){
            const y = "https://www.googleapis.com/youtube/v3/videos?id="+watchatyoutube+"&key=AIzaSyCjMibLBYPrOpBr0jd_jTg8R7P4ifyHXfY&part=snippet,contentDetails,statistics,status";
            fetch(y).then(r=>r.json())
            .then(result=>{
                /*
                createdAt
                : 
                "Tue Dec 28 2021 18:54:43 GMT+0530 (India Standard Time)"
                description
                : 
                "test"
                key
                : 
                "-Ms0Ciii5gnm8elprrU2"
                likes
                : 
                0
                owner
                : 
                "KKR08n4yKUalxy7U3lRuAVL5pug1"
                title
                : 
                "test"
                url
                : 
                "https://firebasestorage.googleapis.com/v0/b/aplhasecond.appspot.com/o/videos%2FKKR08n4yKUalxy7U3lRuAVL5pug1%2F-Ms0Ciii5gnm8elprrU2?alt=media&token=eb1b3299-e884-4423-bd32-8778b42b0fe2"
                views
                : 
                5
                */
               console.log(result);
                const v = {
                    url: "https://www.youtube.com/embed/"+watchatyoutube+"?controls=1",
                    youtubeid: watchatyoutube,
                    title:result.items[0].snippet.localized.title,
                    description:result.items[0].snippet.localized.description,
                    views: result.items[0].statistics.viewCount,
                    height: result.items[0].snippet.thumbnails.standard.height,
                    width:result.items[0].snippet.thumbnails.standard.width
                }
                console.log(v);
                setvideo(v);
                props.setcurrentvideo(v);
                setPlayingURL(watchatyoutube);
                    setTimeVideoPlayed(0);
                    setLastNotedTime(0);
                    play();
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
    else if(watchatyoutube){
        return (
            <div>
                {video &&
                <div style={{ display: 'flex', flexDirection: 'column', padding:'10px', margin: '10px', boxShadow: '0px 0px 10px gray'}}>
                
                <iframe src={video.url} height={video.height} allow="fullscreen;">

                </iframe>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
                    <b>{video.title}</b>
                    <i>{video.description}{video.playlistid && ' || ' + video.playlistid}<div><AiFillEye />{video.views}</div></i>
                </div>
            </div>
                }
            </div>
        )
    }
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', padding:'20px'}} >
            <input type="search" placeholder="Search..." value={props.search} onChange={(e) => { props.setsearch(e.target.value) }} style={{ boxShadow: '0px 0px 10px gray' }} />
            <button onClick={props.youtubeResutls}>search</button>
        </div>
    );
}

export default VideoComponent;