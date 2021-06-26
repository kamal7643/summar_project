import React, { useState, useEffect } from 'react';
import firebase from '../util/Firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillEye } from 'react-icons/ai';




function WatchItem(props) {
    const watch = new URLSearchParams(props.location.search).get('watch');
    const ref = firebase.database().ref('videos/' + watch);
    const [video, setvideo] = useState();
    // console.log(watch);

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






}



export default WatchItem;