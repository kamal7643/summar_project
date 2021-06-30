import React, { useState } from 'react';
import { MDBProgress } from 'mdbreact';
import firebase from '../util/Firebase';
import { confirmAlert } from 'react-confirm-alert';



function  AddVideoToPlayList (props) {
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [file, setfile] = useState();
    const [uploading, setuploading] = useState(false);
    const [uploadPercent, setuploadPercent] = useState(0);
    const ref = firebase.database().ref('users/' + props.uid + '/videos/playlists/'+props.playlistid+'/videos');
    const Storage = firebase.storage();

    const upload = () => { 
        if (!file || title === '' || description === '') return;
        setuploading(true);
        const date = new Date();
        const key = ref.push({ createdAt: date }).key;
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
                        ref.child(key).set({ playlistid:props.playlistid, createdAt: date.toString(), description: description, title: title, url: fireBaseUrl, owner: props.uid, likes: 0, views: 0, key: key })

                        // add to all Videos
                        const videosRef = firebase.database().ref('videos/' + key);
                        videosRef.set({ playlistid: props.playlistid, createdAt: date.toString(), description: description, title: title, url: fireBaseUrl, owner: props.uid, likes: 0, views: 0, key: key });
                    })
                setuploading(false);
                setfile();
                setdescription('');
                settitle('');
                props.toglle(false);
            })
    }

    return(
        <div style={{display: 'flex', flexDirection: 'column', padding:'10px', margin:'5px', boxShadow: '0px 0px 10px gray'}}>
            <input placeholder="title" type="text" value={title} onChange={(e)=>{settitle(e.target.value)}}/>
            <textarea placeholder="description" value={description} onChange={(e)=>{setdescription(e.target.value)}}/>
            <input type="file" accept="video/*" onChange={(e)=>{setfile(e.target.files[0])}}/>
            <button onClick={upload}>upload</button>
            {
                uploading && <MDBProgress value={uploadPercent} className="my-2" style={{ marginBottom: '10px' }} >{parseInt(uploadPercent)}%</MDBProgress>
            }
        </div>
    );
}




export default AddVideoToPlayList;