import React, { useState } from 'react';
import { MDBProgress } from 'mdbreact';
import firebase from '../util/Firebase';
import {confirmAlert} from 'react-confirm-alert';


function AddVideo(props) {
    const [show, setshow] = useState(false);
    const [file, setfile] = useState();
    // const 
    const [uploading, setuploading] = useState(false);
    const [uploadPercent, setuploadPercent] = useState(0);
    const ref = firebase.database().ref('users/' + props.uid + '/videos/videos');
    const Storage = firebase.storage();

    const toggleshow = () => {
        setshow(!show);
    }



    const uploadVideo = () => {
        if(!file)return;
        setuploading(true);
        const date = new Date();
        const key = ref.push({createdAt: date.toString()}).key;
        const uploadTask = Storage.ref(`/videos/${props.uid}/${key}`).put(file);
        uploadTask.on('state_changed',
            (snapShot) => {
                setuploadPercent((snapShot._delegate.bytesTransferred / snapShot._delegate.totalBytes) * 100);
            }, (err) => {
                console.log(err)
            }, () => {
                setuploading(false);
                confirmAlert({
                    title: 'Upload message',
                    message: 'success!',
                    buttons: [{
                        label: 'continue'
                    }]
                })
                Storage.ref(`/videos/${props.uid}/${key}`).getDownloadURL()
                    .then(fireBaseUrl => {
                        // add to profile
                        ref.child(key).set({createdAt: date.toString(), url: fireBaseUrl, owner: props.uid, likes:0, views:0})

                        // add to all Videos
                        const videosRef = firebase.database().ref('videos/' + key);
                        videosRef.set({ createdAt: date.toString(), url: fireBaseUrl, owner: props.uid, likes: 0, views: 0});
                    })
                setuploading(false);
                setfile();
            })
    }



    return (
        <div style={{ boxShadow: show && '0px 0px 20px #00000050' }}>
            {
                //show and hide
                //input 
            }
            <div onClick={toggleshow}
                style={{ width: '100%', border: '1px solid gray' }}
            >
                <span>Add new video</span>
            </div>
            {show && <div style={{textAlign:'left'}}>
                <input type="text" placeholder="Title for video" style={{width:'90%', margin:'10px'}}/>
                <br/>
                <textarea placeholder="Description for video" style={{ width: '90%', margin: '10px' }}/>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '20px'
                }}><input type="file" accept="video/*" onChange={(e) => { setfile(e.target.files[0]); }} />
                    <button onClick={uploadVideo} disabled={uploading}>upload</button>
                </div>
                <br />
                {
                    uploading && <MDBProgress value={uploadPercent} className="my-2" style={{ marginBottom: '10px' }} >{parseInt(uploadPercent)}%</MDBProgress>
                }
                <div style={{marginBottom:'20px'}}></div>
            </div>}
        </div>
    );
}


export default AddVideo;