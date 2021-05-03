import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import staticUrls from '../config/urls';
import styles from '../css/watch.module.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


function Watch(props) {

    const [pos, setpos] = useState(0);
    const [videos, setvideos] = useState(staticUrls.videos);
    const [link, setlink] = useState(staticUrls.videos[0].link);
    const [desciption, setdesciption] = useState(staticUrls.videos[0].desciption);
    const [fetched, setfetched] = useState(false);

    function showerror() {
        confirmAlert({
            title: 'Backend Error',
            message: 'You are not allowed to watch all!',
            buttons: [
                {
                    label: 'continue'
                }
            ]
        });
    }

    function fetchbackend() {
        try {
            fetch(staticUrls.url + '/videos')
                .then((response) => { return response.json(); })
                .then((response) => { setvideos(response); })
        } catch (e) {
            console.log(e);
        }
        setfetched(true);
    }

    if (!fetched) {
        fetchbackend();
    }

    function changeIndex(e) {
        setpos(e);
        videos.map((vid, i) => {
            if (i === e) {
                setlink(vid.link);
                setdesciption(vid.desciption);
            }
            return <div></div>
        })

    }

    return (
        <div className={styles.watchclass}>
            <Header />
            <div className={styles.watchvideo}>{
                //upgrade video player
            }
                <embed style={{ width: '100%', height: '100%' }} src={link} key={pos} />
            </div>
            <div className={styles.watchdesciption}>
                {desciption}
            </div>
            <div className={styles.watchlist}>
                <label style={{ textShadow: ' 2px 2px 5px red', width: '100%', textAlign: 'center', backgroundColor: 'blue', padding: '1%' }} >All Videos</label>
                {
                    videos.map((video, i) => <div className={styles.watchlistcontainer} onClick={() => { changeIndex(i) }} key={i}>
                        <div className={styles.watchlistcontainerhead}>{video.name}</div>
                        <div className={styles.watchlistcontainerbody}>{video.desciption}</div>
                    </div>)
                }
            </div>
        </div>
    );
}


export default Watch;