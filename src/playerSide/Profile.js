import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import firebase from '../util/Firebase';
// import createHistory from 'history/createBrowserHistory';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Progress from 'react-progressbar';



function Profile(props) {
    const ID = new URLSearchParams(props.location.search).get('id');
    const ACTION = new URLSearchParams(props.location.search).get('action');
    const [user, setuser] = useState();
    const [fetched, setfetched] = useState(false);
    const [playname, setplayname] = useState("");
    const [all, setall] = useState([]);
    const [friends, setfriends] = useState([]);
    const [once, setonce] = useState(false);
    // const history = createHistory({ forceRefresh: true });
    const ref = firebase.database().ref('users/' + ID + "/profile");
    const history = useHistory();
    const Storage = firebase.storage();
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(prevObject => ({ ...prevObject, imgUrl: 'https://th.bing.com/th/id/Rda101509944c7018ec13c00641f58255?rik=6bEaV6pENR8uEA&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_569204.png&ehk=zCjD%2bU5ttkYgCvyamLohf3H5GGvL6NmSBkWfwThbNNM%3d&risl=&pid=ImgRaw' }));
    
    try{
        Storage.ref(`/images/${ID}/photo`).getDownloadURL().then((downloadURL) => {
            if(downloadURL){
                setImageAsUrl(prevObject => ({ ...prevObject, imgUrl: downloadURL }))
            }else{
                setImageAsUrl(prevObject => ({ ...prevObject, imgUrl:'https://th.bing.com/th/id/Rda101509944c7018ec13c00641f58255?rik=6bEaV6pENR8uEA&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_569204.png&ehk=zCjD%2bU5ttkYgCvyamLohf3H5GGvL6NmSBkWfwThbNNM%3d&risl=&pid=ImgRaw'}))
            }
        })
    }
    catch(e){
        console.log(e);
    }
    const [uploading, setuploading] = useState(false);
    const [uploadpercent, setuploadpercent] = useState(0);
    const [canceluploading, setcanceluploading] = useState(false);
    const [profilePhotoView, setprofilePhotoView] = useState(false);
    const [profileWidth, setprofileWidth] = useState('100px');
    const [profileHeight, setprofileHeight] = useState('100px');
    //fetch peoples
    const fref = firebase.database().ref('users');
    if (!once) {
        let frefl = [];
        // fref.on('value', (snapshot) => {
        //     snapshot.forEach((user) => {
        //         user.child('friends').forEach((friend) => {
        //             let item = firebase.database().ref('users/' + friend.val() + '/profile');
        //             frefl.push(item.push);
        //         })
        //     })
        // })

        setfriends(frefl);

        let arefl = [];
        fref.on('value', (snapshot) => {
            snapshot.forEach((ppl) => {
                arefl.push(ppl.child('profile').val());
            })
        })

        setall(arefl);
        console.log(frefl);
        setonce(true);
    }


    const sst = {
        margin: '5%',
        width: '100%',
        fontSize: '20px'
    };

    if (ID === 'undefined') {
        alert('Login Failed');
        history.push({ pathname: '/login' });
    }

    function profilePhotoViewFunction(){
        if (!profilePhotoView){
            setprofilePhotoView(true);
            setprofileWidth('100%');
            setprofileHeight('100%');
        }else{
            setprofilePhotoView(false);
            setprofileWidth('100px');
            setprofileHeight('100px');
        }
    }

    function updatePlayName() {
        ref.child("playname").set(playname)
        setfetched(false);
    }

    function upload(){
        if (imageAsFile==='' || !imageAsFile.name.match(/\.(JPG|jpg|jpeg|png|gif)$/)){
            alert('not accepted')
        }else{
            setuploading(true);
            const uploadTask = Storage.ref(`/images/${user.uid}/photo`).put(imageAsFile);
            uploadTask.on('state_changed',
                (snapShot) => {
                    //takes a snap shot of the process as it is happening
                    setuploadpercent((snapShot._delegate.bytesTransferred / snapShot._delegate.totalBytes) * 100);
                    if(canceluploading){
                        snapShot.task.cancel();
                        setcanceluploading(false);
                        setuploading(false);
                    }
                }, (err) => {
                    //catches the errors
                    console.log(err)
                }, () => {
                    setuploading(false);
                    // gets the functions from storage refences the image storage in firebase by the children
                    // gets the download url then sets the image from firebase as the value for the imgUrl key:
                    Storage.ref(`/images/${user.uid}/photo`).getDownloadURL()
                        .then(fireBaseUrl => {
                            setImageAsUrl(prevObject => ({ ...prevObject, imgUrl: fireBaseUrl }))
                        })
                })
        }
    }

    useEffect(() => {
        if (!fetched) {
            ref.on('value', (value) => {
                setuser(value.val());
                setplayname(value.val().playname);
            })
            setfetched(true);
            try{
                Storage.ref(`/images/${ID}/photo`).getDownloadURL().then((downloadURL) => { setImageAsUrl(prevObject => ({ ...prevObject, imgUrl: downloadURL })) })
            }
            catch(e){
                console.log(e);
            }
        }
    }, [ID, fetched, setplayname, user, ref, Storage])

    return (
        <div>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'blue', position: 'absolute', bottom: '0' }} >
                <div style={sst} onClick={() => { history.push({ pathname: '/profile', search: 'id=' + user.uid }) }}>&#x2190;</div>
                <div style={sst} onClick={() => { history.push({ pathname: '/profile', search: 'id=' + user.uid + '&action=settings' }) }}>settings</div>
                <div style={sst} onClick={() => { history.push({ pathname: '/profile', search: 'id=' + user.uid + '&action=peoples' }) }}>peoples</div>
                <div style={sst} onClick={() => { history.push({ pathname: '/profile', search: 'id=' + user.uid + '&action=chat' }) }}>chat</div>
            </div>
            {
                (
                    () => {
                        if (user) {

                            if (ACTION === 'chat') {
                                return <div>chat</div>
                            } else if (ACTION === 'peoples') {
                                return <div>
                                    <ul className="list-group" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <li className="list-group-item"> friends </li>
                                        <li className="list-group-item"> all </li>
                                        {
                                            (
                                                () => {
                                                    if (all.length !== 0) {
                                                        all.map((user, i) => {
                                                            return (<li className="list-group-item" key={i}>{user.name}</li>);
                                                        })
                                                    }
                                                }
                                            )()
                                        }
                                    </ul>
                                </div>
                            } else if (ACTION === 'settings') {
                                return <div>settings</div>
                            }
                            return <div style={{ textAlign: 'center', width: '100%' }}>
                                <div><img alt="profile" src={imageAsUrl.imgUrl} width={profileWidth} height={profileHeight} onClick={profilePhotoViewFunction} style={{ borderRadius: !profilePhotoView && '50px' }} /></div>
                                Name : {user.name} Authentication pass
                                <br />
                                Email : {user.email}
                                <br /><br />
                                Playname : <input type="text" value={playname} onChange={(e) => { setplayname(e.target.value) }} />
                                &nbsp;
                                <Button style={{ padding: '0.5%' }} type="button" onClick={() => { updatePlayName() }}>update</Button>
                                <br /><br />
                                <input type="file" onChange={(e) => { setImageAsFile(e.target.files[0]) }} /><button onClick={upload} disabled={!imageAsFile}>upload</button>
                                
                                {
                                    (
                                        () => {

                                            if(uploading){
                                                return (<div style={{ display: 'flex', flexDirection: 'row' }}><Progress completed={uploadpercent} style={{ height: '10px', width: '200px', marginTop: '7px', marginRight: '7px', backgroundColor: 'black' }} /> {uploadpercent}% <span onClick={() => { setcanceluploading(true);}}>X</span></div>)
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