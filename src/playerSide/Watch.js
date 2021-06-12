import React, { useState } from 'react';
import Header from '../components/Header';
import styles from '../css/watch.module.css';
// import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import firebase from '../util/Firebase';
import 'bootstrap/dist/css/bootstrap.min.css';


function Watch(props) {

    const [videos, setvideos] = useState([]);
    const [link, setlink] = useState();
    const [desciption, setdesciption] = useState();
    const [name, setname] = useState();
    const [fetched, setfetched] = useState(false);
    const [watching, setwatching] = useState(false);
    const todoref = firebase.database().ref('videos').limitToLast(20);


    if (!fetched) {
        todoref.once('value', (snapshot) => {
            if (snapshot.exists()) {
                let vds = [];
                snapshot.forEach((element) => {
                    vds.push(element.val());
                    console.log(element.val());
                    setlink(element.val().link);
                })
                setvideos(vds);
            } else {
                console.log("videos not found");
            }
        })
        setfetched(true);
    }


    return (
        <div className={styles.watchclass}>
            <Header />
            {watching && <div className="embed-responsive embed-responsive-16by9">
                <iframe title="watch" className="embed-responsive-item" controls={true} src={link} allowFullScreen ></iframe>
                <div>
                    <label>{name}</label>
                    <label>{desciption}</label>
                </div>
            </div>}
            <div className={styles.watchlist}>
                <ul className="list-group">
                {
                        videos.map((video, i) => <li style={{ padding: '10px', borderRadius: '10px', border: '1px solid gray', marginBottom: '10px' }} onClick={() => { setwatching(true); setlink(video.name); setdesciption(video.desciption); setname(video.name) }} key={i}>
                        <div className={styles.watchlistcontainerhead}>{video.name}</div>
                        <div className={styles.watchlistcontainerbody}>{video.desciption}</div>
                    </li>)
                }
                </ul>
            </div>
        </div>
    );
}


export default Watch;