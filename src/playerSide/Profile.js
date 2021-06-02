import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import firebase from '../util/Firebase';
// import createHistory from 'history/createBrowserHistory';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Progress from 'react-progressbar';
import Friends from '../components/Friends';
import staticUrls from '../config/urls';



function Profile(props) {
    const ID = new URLSearchParams(props.location.search).get('id');
    const [user, setuser] = useState();
    const [fetched, setfetched] = useState(false);
    const [playname, setplayname] = useState("");
    // const history = createHistory({ forceRefresh: true });
    const ref = firebase.database().ref('users/' + ID + "/profile");
    const history = useHistory();
    const Storage = firebase.storage();
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(prevObject => ({ ...prevObject, imgUrl: staticUrls.profilephotourl }));
    // (prevObject => ({ ...prevObject, imgUrl: staticUrls.profilephotourl })
    const [winpercent, setwinpercent] = useState(0);
    const [killpercent, setkillpercent] = useState(0);

    try {
        Storage.ref(`/images/${ID}/photo`).getDownloadURL().then((downloadURL) => {
            if (downloadURL) {
                setImageAsUrl(prevObject => ({ ...prevObject, imgUrl: downloadURL }))
            }
        })
    }
    catch (e) {
        console.log(e);
    }
    const [uploading, setuploading] = useState(false);
    const [uploadpercent, setuploadpercent] = useState(0);
    const [canceluploading, setcanceluploading] = useState(false);
    const [profilePhotoView, setprofilePhotoView] = useState(false);
    const [profileWidth, setprofileWidth] = useState('100px');
    const [profileHeight, setprofileHeight] = useState('100px');
    const [friends, setfriends] = useState(true);


    if (ID === 'undefined') {
        alert('Login Failed');
        history.push({ pathname: '/login' });
    }

    function profilePhotoViewFunction() {
        if (!profilePhotoView) {
            setprofilePhotoView(true);
            setprofileWidth('100%');
            setprofileHeight('100%');
        } else {
            setprofilePhotoView(false);
            setprofileWidth('100px');
            setprofileHeight('100px');
        }
    }

    function updatePlayName() {
        ref.child("playname").set(playname)
        setfetched(false);
    }

    function upload() {
        if (imageAsFile === '' || !imageAsFile.name.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
            alert('not accepted')
        } else {
            setuploading(true);
            const uploadTask = Storage.ref(`/images/${user.uid}/photo`).put(imageAsFile);
            uploadTask.on('state_changed',
                (snapShot) => {
                    //takes a snap shot of the process as it is happening
                    setuploadpercent((snapShot._delegate.bytesTransferred / snapShot._delegate.totalBytes) * 100);
                    if (canceluploading) {
                        snapShot.task.cancel();
                        setcanceluploading(false);
                        setuploading(false);
                    }
                }, (err) => {
                    //catches the errors
                    console.log(err)
                }, () => {
                    setuploading(false);
                    alert('uploded');
                    // gets the functions from storage refences the image storage in firebase by the children
                    // gets the download url then sets the image from firebase as the value for the imgUrl key:
                    Storage.ref(`/images/${user.uid}/photo`).getDownloadURL()
                        .then(fireBaseUrl => {
                            setImageAsUrl(prevObject => ({ ...prevObject, imgUrl: fireBaseUrl }))
                        })
                })
        }
    }

    function calculatepercent(us) {
        if (us) {
            let a = us.win;
            let b = us.defeat;
            if (b === 0) {
                setwinpercent(100);
            } else {
                setwinpercent(((a) / (a + b)) * 100);
            }
            a = us.kills;
            b = us.defeat;
            if (b === 0) {
                setkillpercent(100);
            } else {
                setkillpercent(((a) / (a + b)) * 100);
            }
        }
    }

    useEffect(() => {
        if (!fetched) {
            ref.on('value', (value) => {
                if (value) {
                    setuser(value.val());
                    setplayname(value.val().playname);
                    calculatepercent(value.val());
                } else {
                    history.push("/login");
                }
            })
            setfetched(true);
            try {
                Storage.ref(`/images/${ID}/photo`).getDownloadURL().then((downloadURL) => { setImageAsUrl(prevObject => ({ ...prevObject, imgUrl: downloadURL })) })
            }
            catch (e) {
                console.log(e);
            }
        }
    }, [ID, fetched, setplayname, user, ref, Storage])

    return (
        <div>
            <Header />
            {
                (
                    () => {
                        if (user) {
                            return <div style={{ textAlign: 'center', width: '100%' }}>
                                <div><img alt="profile" src={imageAsUrl && imageAsUrl.imgUrl} width={profileWidth} height={profileHeight} onClick={profilePhotoViewFunction} style={{ borderRadius: !profilePhotoView && '50px' }} /></div>
                                Name : {user.name} Authentication pass
                                <br />
                                Email : {user.email}
                                <br /><br />
                                Playname : <input type="text" value={playname} onChange={(e) => { setplayname(e.target.value) }} />
                                &nbsp;
                                <Button style={{ padding: '0.5%' }} type="button" onClick={() => { updatePlayName() }}>update</Button>
                                <br /><br />
                                <input type="file" onChange={(e) => { setImageAsFile(e.target.files[0]) }} /><button onClick={upload} disabled={!imageAsFile}>upload</button>
                                <ul style={{ textAlign: 'left', marginTop: '5%' }}>
                                    <li>Name : {user.name}</li>
                                    <li>Email : {user.email}</li>
                                    <li>playname : {user.playname}</li>
                                    <li>matches : {user.matches}</li>
                                    <li
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}>
                                        win: {user.win}
                                        <Progress
                                            completed={winpercent}
                                            style={{
                                                width: '200px',
                                                height: '10px',
                                                backgroundColor: 'red',
                                                margin: '10px'
                                            }}
                                        />
                                        {winpercent}%
                                                    defeat:{user.defeat}
                                    </li>
                                    <li
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        kills: {user.kills}
                                        <Progress
                                            completed={killpercent}
                                            style={{
                                                width: '200px',
                                                height: '10px',
                                                backgroundColor: 'red',
                                                margin: '10px'
                                            }}
                                        />
                                        {killpercent}%
                                                deaths:{user.deaths}
                                    </li>
                                    <li>KD:{user.kd}</li>
                                    <li>points:{user.points}</li>
                                </ul>

                                {
                                    (
                                        () => {
                                            if (friends) {
                                                return (<div id="friends">
                                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <div style={{ width: '100%', color: 'black', borderTop: '1px solid black' }} onClick={() => { setfriends(true);}}>Friends</div>
                                                        <div style={{ width: '100%', color: 'gray' }} onClick={() => { setfriends(false) }}>Peoples</div>
                                                    </div>
                                                    <Friends uid={ID} />
                                                </div>);
                                            } else {
                                                return (<div id="peoples">
                                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <div style={{ width: '100%', color: 'gray' }} onClick={() => { setfriends(true) }}>Friends</div>
                                                        <div style={{ width: '100%', color: 'black', borderTop: '1px solid black' }} onClick={() => { setfriends(false) }}>Peoples</div>
                                                    </div>
                                                </div>);
                                            }
                                        }
                                    )()
                                }


                                {
                                    (
                                        () => {

                                            if (uploading) {
                                                return (<div style={{ display: 'flex', flexDirection: 'row' }}><Progress completed={uploadpercent} style={{ height: '10px', width: '200px', marginTop: '7px', marginRight: '7px', backgroundColor: 'black' }} /> {parseInt(uploadpercent)}% <span onClick={() => { setcanceluploading(true); }}>X</span></div>)
                                            }
                                        }
                                    )()
                                }
                            </div>
                        } else {
                            return <div>wait...</div>
                        }
                    }
                )()
            }
        </div>
    );
}

export default Profile;