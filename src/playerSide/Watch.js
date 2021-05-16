import React, { useState } from 'react';
import Header from '../components/Header';
import staticUrls from '../config/urls';
import styles from '../css/watch.module.css';
// import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import firebase from '../util/Firebase';
import 'bootstrap/dist/css/bootstrap.min.css';


function Watch(props) {

    const [pos, setpos] = useState(0);
    const [videos, setvideos] = useState(staticUrls.videos);
    const [link, setlink] = useState(staticUrls.videos[0].link);
    const [desciption, setdesciption] = useState(staticUrls.videos[0].desciption);
    const [fetched, setfetched] = useState(false);


    function fetchbackend() {
        try {
            const todoref = firebase.database().ref('videos');
            todoref.on('value', (snapshot) => {
                if(snapshot.exists()){
                    let vds = [];
                    snapshot.forEach((element) =>{
                        vds.push(element.val());
                    })
                    setvideos(vds);
                }else{
                    console.log("videos not found");
                }
            })
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
                if(link!==vid.link){
                    setlink(vid.link);
                }
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
                <ul className="list-group">
                {
                    videos.map((video, i) => <li className="list-group-item" onClick={() => { changeIndex(i) }} key={i}>
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