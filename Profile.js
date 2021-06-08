import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import firebase from '../util/Firebase';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Progress from 'react-progressbar';
import Friends from '../components/Friends';
import Peoples from '../components/Peoples';
import staticUrls from '../config/urls';
import { signout, getcurruser } from '../util/cognito';
import { confirmAlert } from 'react-confirm-alert';
import { MDBIcon, MDBSideNavCat, MDBSideNavNav, MDBSideNav, MDBSideNavLink, MDBContainer, MDBRow, MDBBtn } from 'mdbreact';



function Profile(props) {
    const ID = new URLSearchParams(props.location.search).get('id');
    const JOIN = new URLSearchParams(props.location.search).get('join');
    getcurruser().then((user) => {
        if (user) {
            if (user.uid !== ID) { history.push('/404'); }
        }
    })
    const [user, setuser] = useState();
    const [fetched, setfetched] = useState(false);
    const [playname, setplayname] = useState("");
    const ref = firebase.database().ref('users/' + ID + "/profile");
    const history = useHistory();
    const Storage = firebase.storage();
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(staticUrls.profilephotourl);
    const [winpercent, setwinpercent] = useState(0);
    const [killpercent, setkillpercent] = useState(0);
    const [uploading, setuploading] = useState(false);
    const [uploadpercent, setuploadpercent] = useState(0);
    const [canceluploading, setcanceluploading] = useState(false);
    const [profilePhotoView, setprofilePhotoView] = useState(false);
    const [profileWidth, setprofileWidth] = useState('100px');
    const [profileHeight, setprofileHeight] = useState('100px');
    const [profileScale, setprofileScale] = useState(1);
    const [friends, setfriends] = useState(true);
    const [need, setneed] = useState(0);


    if (ID === 'undefined') {
        alert('Login Failed');
        history.push({ pathname: '/login' });
    }

    function profilePhotoViewFunction() {
        if (!profilePhotoView) {
            setprofilePhotoView(true);
            setstates(profileScale, window.innerWidth);
        } else {
            setprofilePhotoView(false);
            setstates(profileScale, 100);
        }
    }

    function LOGOUT() {
        signout().then((user) => {
            if (user) {
                history.push('profile?id=' + user.uid);
            } else {
                history.push('/login');
            }
        })
    }

    function updatePlayName() {
        ref.child("playname").set(playname)
        alert('updated');
        setfetched(false);
    }

    function upload() {
        setuploading(true);
        const uploadTask = Storage.ref(`/images/${user.uid}/photo`).put(imageAsFile);
        uploadTask.on('state_changed',
            (snapShot) => {
                setuploadpercent((snapShot._delegate.bytesTransferred / snapShot._delegate.totalBytes) * 100);
                if (canceluploading) {
                    snapShot.task.cancel();
                    setcanceluploading(false);
                    setuploading(false);
                }
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
                Storage.ref(`/images/${user.uid}/photo`).getDownloadURL()
                    .then(fireBaseUrl => {
                        ref.child("photo").set(fireBaseUrl);
                    })
            })
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
    function setstates(scale, width) {
        setprofileScale(scale);
        setprofileHeight((width / scale).toString() + 'px');
        if (width === 100) {
            setprofileHeight(width.toString() + 'px');
        }
        setprofileWidth(width.toString() + 'px');
    }

    async function getMeta(url) {
        var img = new Image();
        img.src = url;
        img.onload = function (e) {
            const scale = 100 / img.width;
            setstates(scale, 100);
        };
    }



    useEffect(() => {
        if (user) {
            if (user.photo && user.photo !== imageAsUrl) {
                setImageAsUrl(user.photo);
                getMeta("http://shijitht.files.wordpress.com/2010/08/github.png");
            }
        }
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

            if (JOIN) {
                const dataref = firebase.database().ref('/events/' + JOIN.toString() + '/peoples/' + ID);
                const userref = firebase.database().ref('/users/' + ID + '/events/' + JOIN);
                userref.set({ roomid: '12345', password: '12345', uid: JOIN });
                dataref.set({ uid: ID });
                confirmAlert({
                    title: "event joined",
                    message: "you have joined this event",
                    buttons: [
                        {
                            label: "continue"
                        }
                    ]
                })
                history.push("profile?id=" + ID);
            }


            setfetched(true);
        }
        setTimeout(() => { setneed(need + 1) }, 1000)
    }, [ID, fetched, setplayname, user, ref, Storage, history, imageAsUrl, setneed, need])

    return (
        <div style={{ minHeight: '100%' }}>
            <Header />

            {
                (
                    () => {
                        if (user) {
                            return <div
                                style={{
                                    width: '100%'
                                }}>
                                <div
                                    style={{
                                        textAlign: 'right',
                                        color: 'black',
                                        padding: '5px',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    <span
                                        onClick={LOGOUT}
                                    >log-out
                                </span>
                                </div>
                                <div
                                    style={{
                                        textAlign: 'center'
                                    }}
                                >
                                    <img
                                        alt="profile"
                                        src={imageAsUrl}
                                        width={profileWidth}
                                        height={profileHeight}
                                        onClick={profilePhotoViewFunction}
                                        style={{
                                            borderRadius: !profilePhotoView && '50%'
                                        }}
                                    />
                                    <div
                                        style={{
                                            marginBottom: '40px'
                                        }}
                                    >
                                        {user.name}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        marginBottom: '20px'
                                    }}
                                >
                                    <div
                                        style={{ width: '50%' }}
                                    >
                                        Playname :
                                    </div>
                                    <input
                                        style={{ width: '100%' }}
                                        type="text"
                                        value={playname}
                                        onChange={(e) => {
                                            setplayname(e.target.value)
                                        }}
                                    />
                                    &nbsp;
                                    <Button
                                        style={{
                                            padding: '0.5%'
                                        }}
                                        type="button"
                                        onClick={() => {
                                            updatePlayName()
                                        }}
                                    >update
                                    </Button>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <div
                                        style={{ width: '50%' }}
                                    >
                                        photo:
                                </div>
                                    <input
                                        style={{ width: '100%' }}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            setImageAsFile(e.target.files[0])
                                        }}
                                    />
                                    <Button
                                        style={{
                                            padding: '0.5%'
                                        }}
                                        onClick={upload}
                                        disabled={!imageAsFile}
                                    >upload
                                </Button>
                                </div>
                                {
                                    (
                                        () => {

                                            if (uploading) {
                                                return (<div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row'
                                                    }}>
                                                    <Progress
                                                        completed={uploadpercent}
                                                        style={{
                                                            height: '10px',
                                                            width: '200px',
                                                            marginTop: '7px',
                                                            marginRight: '7px',
                                                            backgroundColor: 'black'
                                                        }}
                                                    /> {parseInt(uploadpercent)}%
                                                    <span
                                                        onClick={() => {
                                                            setcanceluploading(true);
                                                        }}
                                                    >X</span>
                                                </div>)
                                            }
                                        }
                                    )()
                                }
                                <ul
                                    style={{
                                        textAlign: 'left',
                                        marginTop: '5%'
                                    }}
                                >
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
                                                return (
                                                    <div
                                                        id="friends"
                                                    >
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                marginBottom: '10px',
                                                                textAlign: 'center'
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    width: '100%',
                                                                    color: 'black',
                                                                    borderTop: '1px solid black',
                                                                }}
                                                                onClick={() => {
                                                                    setfriends(true);
                                                                }}
                                                            >Friends</div>
                                                            <div
                                                                style={{
                                                                    width: '100%',
                                                                    color: 'gray'
                                                                }}
                                                                onClick={() => {
                                                                    setfriends(false)
                                                                }}>Peoples</div>
                                                        </div>
                                                        <Friends
                                                            uid={ID}
                                                        />
                                                    </div>);
                                            } else {
                                                return (<div
                                                    id="peoples"
                                                >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            marginBottom: '10px',
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                width: '100%',
                                                                color: 'gray'
                                                            }}
                                                            onClick={() => {
                                                                setfriends(true)
                                                            }}
                                                        >Friends</div>
                                                        <div
                                                            style={{
                                                                width: '100%',
                                                                color: 'black',
                                                                borderTop: '1px solid black'
                                                            }}
                                                            onClick={() => {
                                                                setfriends(false)
                                                            }}>Peoples</div>
                                                    </div>
                                                    <Peoples uid={ID} />
                                                </div>);
                                            }
                                        }
                                    )()
                                }
                                <div style={{ fontSize: '2px' }}>{need}</div>
                            </div>
                        } else {
                            return <div>
                                wait...
                            </div>
                        }
                    }
                )()
            }
        </div>
    );
}

export default Profile;
