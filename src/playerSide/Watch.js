import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import styles from '../css/watch.module.css';
// import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import firebase from '../util/Firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import WatchItem from '../components/WatchItem';


function Watch(props) {
    
    const [videos, setvideos] = useState([]);
    const [fetched, setfetched] = useState(false);
    const [number, setnumber] = useState(10);
    const todoref = firebase.database().ref('videos');
    const history = useHistory();


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
        }
    }


    useEffect(() => {
        window.onscroll = function () { myFunction() };
    })
    

    return (
        <div className={styles.watchclass} >
            <Header />

            <WatchItem {...props}/>
            
            
            
            <div className={styles.watchlist}>
                <ul className="list-group">
                {
                        videos.map((video, i) => <li style={{ padding: '10px', borderRadius: '10px', border: '1px solid gray', marginBottom: '10px' }} onClick={() => { history.push('/videos?watch='+video.key)}} key={i}>
                        <div className={styles.watchlistcontainerhead}>{video.name}</div>
                        <div className={styles.watchlistcontainerbody}>{video.description}</div>
                    </li>)
                }
                </ul>
            </div>
        </div>
    );
}


export default Watch;