import React, { useState } from 'react';
import { MDBProgress } from 'mdbreact';
import firebase from '../util/Firebase';
import {confirmAlert} from 'react-confirm-alert';
import { FaPlus } from 'react-icons/fa';


function AddVideo(props) {
    const [show, setshow] = useState(false);
    const [file, setfile] = useState();
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [uploading, setuploading] = useState(false);
    const [uploadPercent, setuploadPercent] = useState(0);
    const ref = firebase.database().ref('users/' + props.uid + '/videos/videos');
    const Storage = firebase.storage();

    const toggleshow = () => {
        setshow(!show);
    }



    const uploadVideo = () => {
        if( !file || title=== '' || description === '' )return;
        setuploading(true);
        const date = new Date();
        const key = ref.push({createdAt: date.toString()}).key;
        const uploadTask = Storage.ref(`/videos/${props.uid}/${key}`).put(file);
        /*createdAt: 
        "Thu Jun 24 2021 19:06:11 GMT+0530"
        description:
        "test00"
        likes:
        0
        owner:
        "KKR08n4yKUalxy7U3lRuAVL5pug1"
        title:
        "Travel Agency Automation Software Presentation"
        url:
        "https://firebasestorage.googleapis.com/v0/b/apl..."
        views:
        0*/

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
                        ref.child(key).set({createdAt: date.toString(), description: description, title: title, url: fireBaseUrl, owner: props.uid, likes:0, views:0, key: key})

                        // add to all Videos
                        const videosRef = firebase.database().ref('videos/' + key);
                        videosRef.set({ createdAt: date.toString(), description: description, title: title, url: fireBaseUrl, owner: props.uid, likes: 0, views: 0, key: key});
                    })
                setuploading(false);
                setfile();
                setdescription('');
                settitle('');
            })
    }



    return (
        <div>
            {
                //show and hide
                //input 
            }
            <div
                style={{ width: '100%' }}
            >
                <span>Add new video <i onClick={toggleshow}><FaPlus/></i></span>
            </div>
            {show && <div style={{textAlign:'left'}}>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', margin: '5px', boxShadow: '0px 0px 10px gray' }}>
                    <input placeholder="title" type="text" value={title} onChange={(e) => { settitle(e.target.value) }} />
                    <textarea placeholder="description" value={description} onChange={(e) => { setdescription(e.target.value) }} />
                    <input type="file" accept="video/*" onChange={(e) => { setfile(e.target.files[0]) }} />
                    <button onClick={uploadVideo}>upload</button>
                </div>
                <br />
                {
                    uploading && <MDBProgress value={uploadPercent} className="my-2" style={{ marginBottom: '10px' }} >{parseInt(uploadPercent)}%</MDBProgress>
                }
                <div style={{marginBottom:'20px'}}> </div>
            </div>}
        </div>
    );
}


export default AddVideo;