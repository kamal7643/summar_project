import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import firebase from '../../util/Firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import { AiFillEye } from 'react-icons/ai';
// import WatchItem from '../../components/WatchItem';
import VideoComponent from './VideoComponent';

const getAllVideos = (videos, setvideos) => {
    const ref = firebase.database().ref('videos');
    ref.once('value', (value) =>{
        let tempList = [];
        value.forEach( video =>{
            tempList.push(video.val());
        });
        setvideos(tempList);
        localStorage.setItem('videos', JSON.stringify(tempList));
    })
}



function VideoPlateform(props) {

    const history = useHistory();
    const [videos, setvideos] = useState(JSON.parse(localStorage.getItem('videos')) || []);
    const [once, setonce] = useState(true);
    const watch = new URLSearchParams(props.location.search).get('watch');
    const [stop, setstop] = useState(false);
    const [currentVideo, setcurrentVideo] = useState();
    const [search, setsearch] = useState('');


    function similarity(s1, s2) {
        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        var longerLength = longer.length;
        if (longerLength === 0) {
            return 1.0;
        }
        return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    function editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        var costs = [];
        for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
                if (i === 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        var newValue = costs[j - 1];
                        if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue),
                                costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }


    const compareTwoPercet = (a, b) => {
        if (currentVideo) {
            return (Math.round(similarity(b.title, currentVideo.title) * 10000) / 100) - (Math.round(similarity(a.title, currentVideo.title) * 10000) / 100);
        }
    }


    // const compareTwoPercetSearch = (a, b)=>{
    //     if ( search !== '' ) {
    //         return (a.title.toLowerCase().cantains(search.toLowerCase()) || a.description.toLowerCase().cantains(search.toLowerCase()) - (b.title.toLowerCase().cantains(search.toLowerCase()) || b.description.toLowerCase().cantains(search.toLowerCase());
    //     }else{return true;}
    // }


    useEffect(() => {
        setTimeout(() => {
            if(!watch){
                setcurrentVideo(null);
            }
            if(once){
                getAllVideos(videos,setvideos);
                setonce(false);
            }
        },100)
    })

    return(
            <div style={{ width: '100%' }}>
                <Header />
            <div style={{ maxWidth: '1200px', textAlign: 'left'}}>
                <VideoComponent {...props} setcurrentvideo={setcurrentVideo} stop={stop} setstop={setstop} search={search} setsearch={setsearch}/>
                {
                    videos.filter(video => 
                        {
                            if(currentVideo){
                                return video.url !== currentVideo.url
                            }else{
                                return true;
                            }
                        }
                    )
                    .filter(video =>(video.title.toLowerCase().includes(search.toLowerCase()) || video.description.toLowerCase().includes(search.toLowerCase())))
                    .sort((a, b) => compareTwoPercet(a, b))
                    .map((video, i)=><div key={i} onClick={()=>{
                            setstop(true);
                            history.push('videos?watch=' + video.key);
                    }}>
                        <div style={{ display:'flex', flexDirection: 'column', margin: '20px', padding:'20px', boxShadow: '0px 0px 10px gray', minHeight:'150px', onSelectStart: 'false'}}>
                        <b>{video.title}</b>
                        <span>{video.description}{video.playlistid && ' || '+video.playlistid}</span>
                        <span><AiFillEye/>{video.views}</span>
                    </div>
                    </div>)
                }
                </div>
            </div>
        );
}


export default VideoPlateform;