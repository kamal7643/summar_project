import React, { useState } from 'react';
import Header from '../components/Header';
import staticUrls from '../config/urls';
import styles from '../css/watch.module.css';
// import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import firebase from '../util/Firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player/youtube';


function Watch(props) {

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
            <div >
                <ReactPlayer playing={true} light={true} className="embed-responsive-item" style={{width: '100%', maxWidth:'400px', height:'400px'}} controls={true} url={link} />
            </div>
            <div className={styles.watchdesciption} style={{padding:'10px', border: '1px solid gray', height:'50px', overflow: 'hidden'}}>
                {desciption}
            </div>
            <div className={styles.watchlist}>
                <label style={{ width: '100%', textAlign: 'center', backgroundColor: 'gray', padding: '1%' }} >All Videos</label>
                <ul className="list-group">
                {
                    videos.map((video, i) => <li style={{ padding:'10px', borderRadius:'10px', border: '1px solid gray', marginBottom:'10px'}} onClick={() => { changeIndex(i) }} key={i}>
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