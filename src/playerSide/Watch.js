import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
// import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import firebase from '../util/Firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import WatchItem from '../components/WatchItem';
import { AiFillEye } from 'react-icons/ai';


function Watch(props) {
    
    const [videos, setvideos] = useState([]);
    const [fetched, setfetched] = useState(false);
    const [number, setnumber] = useState(10);
    const todoref = firebase.database().ref('videos');
    const history = useHistory();
    const [video, setvideo] = useState('');


    if (!fetched) {
        todoref.limitToLast(number).once('value', (snapshot) => {
            if (snapshot.exists()) {
                let vds = [];
                snapshot.forEach((element) => {
                    vds.push(element.val());
                })
                setvideos(vds);
            } else {
                console.log("videos not found");
            }
        })
        setfetched(true);
    }

    function myFunction() {
        const bottom = document.documentElement.scrollHeight - window.screen.height - document.documentElement.scrollTop;
        if (bottom < 5) {
            console.log('set');
            setnumber(number+1);
        }
    }


    useEffect(() => {
        window.onscroll = function () { myFunction() };
    })

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


    const compareTwoPercet=(a, b)=>{
        if(video!==''){
            return (Math.round(similarity(b.title, video.title) * 10000) / 100) - (Math.round(similarity(a.title, video.title) * 10000) / 100) ;
        }
    }
    
    // console.log(video);
    return (
        <div >
            <Header />

            <WatchItem {...props} setvideo={setvideo}/>
            
            {
                videos.filter(vdeo=>(vdeo.title!==video.titile && vdeo.description!==video.description)).sort((a, b) => compareTwoPercet(a,b)).map((video, i) => <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', margin: '10px', boxShadow: '0px 0px 10px gray'}} onClick={() => { history.push('/videos?watch=' + video.key); window.scrollTo(0, 0); }} key={i}>
                    <b>{video.title}</b>
                    <span>{video.description}</span>
                    <i><AiFillEye />{video.views}</i>
                </div>)
            }
            
        </div>
    );
}


export default Watch;