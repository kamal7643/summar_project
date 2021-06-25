import React, { useState, useEffect } from 'react';
import firebase from '../util/Firebase';
import 'bootstrap/dist/css/bootstrap.min.css';




function WatchItem(props){
    const watch = new URLSearchParams(props.location.search).get('watch');
    const ref = firebase.database().ref('videos/' + watch);
    const [video, setvideo] = useState();

    useEffect(() => {
        if(watch){
            ref.once('value', (value)=>{
                setvideo(value.val())
            })
        }
    })

    if(watch && video){
        return (<div className="embed-responsive embed-responsive-16by9">
            <iframe
                title="watch"
                className="embed-responsive-item"
                src={video.link}
                style={{ border: 'none' }}
                sandbox="allow-scripts allow-presentation allow-same-origin"
                allow="autoplay; fullscreen; picture-in-picture; xr-spatial-tracking; encrypted-media"
            ></iframe>
        </div>);
    }else{
        return (<div></div>);
    }
    


    


}



export default WatchItem;