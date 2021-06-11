import { useState, useEffect, Fragment  } from 'react';
import Loading from '../../components/Loading';
import firebase from '../../util/Firebase';
import{ confirmAlert} from 'react-confirm-alert';
import staticUrls from '../../config/urls';
import { useHistory } from 'react-router-dom';
import { signout } from '../../util/cognito';
import { MDBProgress  } from 'mdbreact';
import 'react-circular-progressbar/dist/styles.css';


function ProfileSTATE(props) {
    const [user, setuser] = useState();
    const [fetched, setfetched] = useState(false);
    const [playname, setplayname] = useState("");
    const ref = firebase.database().ref('users/' + props.uid + "/profile");
    const history = useHistory();
    const Storage = firebase.storage();
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(staticUrls.profilephotourl);
    const [uploading, setuploading] = useState(false);
    const [uploadpercent, setuploadpercent] = useState(0);
    const [canceluploading, setcanceluploading] = useState(false);
    const [profilePhotoView, setprofilePhotoView] = useState(false);
    const [profileWidth, setprofileWidth] = useState('100px');
    const [profileHeight, setprofileHeight] = useState('100px');
    const [profileScale, setprofileScale] = useState(1);
    

    function profilePhotoViewFunction() {
        if (!profilePhotoView) {
            setprofilePhotoView(true);
            var width= 500;
            if(width>window.innerWidth){
                width=window.innerWidth;
            }
            if(window.innerWidth<100){
                width=100;
            }
            setstates(profileScale, width);
        } else {
            setprofilePhotoView(false);
            setstates(profileScale, 100);
        }
    }
    const sst={
        width: '100%', 
        borderRadius: '50px', 
        border: '10px solid gray', 
        boxShadow: '0px 0px 20px gray'
    };


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
        if(user && user.playname === playname)return ;
        ref.child("playname").set(playname)
        confirmAlert({
            title: 'Update message',
            message: 'success!',
            buttons: [{
                label: 'continue'
            }]
        });
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


    function setstates(scale, width) {
        setprofileScale(scale);
        setprofileHeight((width /scale).toString() + 'px');
        if (width === 100) {
            setprofileHeight(width.toString() + 'px');
        }
        setprofileWidth(width.toString() + 'px');
    }

    async function getMeta(url) {
        var img = new Image();
        img.src = url;
        img.onload = function (e) {
            const scale =  img.width/img.height;
            setstates(scale, 100);
        };
    }

    useEffect(() => {
        if(!fetched){
            ref.on('value', (value) => {
                if (value) {
                    setuser(value.val());
                    setplayname(value.val().playname);
                } else {
                    history.push("/login");
                }
            })
            setfetched(true);
        }
    }, [fetched, setfetched, history, ref])
    
    if(user){
        if (user.photo && user.photo !== imageAsUrl) {
            setImageAsUrl(user.photo);
            getMeta(user.photo);
        }
        return(
            <div>
                <div
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        marginTop:'40px'
                    }}
                >
                    <img 
                    alt="profile" 
                    src={imageAsUrl} 
                    width={profileWidth}
                    height={profileHeight}
                    onClick={profilePhotoViewFunction}
                    style={{
                        borderRadius: !profilePhotoView && '50px'
                    }}
                    />
                    <div>
                        {user.name} &nbsp;&nbsp;
                        <span 
                            style={{
                                fontSize:'10px'
                            }}
                            onClick={LOGOUT}
                        >
                            LOGOUT
                        </span>
                    </div>
                    <span>{user.email}</span>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '10px',
                        marginBottom:'10px',
                        maxWidth:'400px'
                    }}
                >
                    <span
                        style={{
                            width: '100px'
                        }}
                    >
                        Playname : 
                    </span>
                    <input
                     type="text" 
                     value={playname}
                     style={{
                         width:'250px',
                         height:'25px'
                     }}
                     onChange={(e) =>{setplayname(e.target.value);}}
                    />
                    <Fragment>
                        <button
                            color="primary"
                            style={{
                                borderRadius:'0px',
                                padding:'0.5%',
                                width:'70px'
                            }}
                            onClick={(e) => { updatePlayName();}}
                            disabled={playname===user.playname}
                        >update</button>
                    </Fragment>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '10px',
                        maxWidth: '400px'
                    }}
                >
                    <div
                    style={{
                        width:'100px'
                    }}
                    >
                        photo:
                                </div>
                    <input
                        type="file"
                        style={{
                            width:'250px',
                            height:'30px'
                        }}
                        accept="image/*"
                        onChange={(e) => {
                            setImageAsFile(e.target.files[0])
                        }}
                    />
                    <button
                        style={{
                            padding: '0.5%',
                            width:'70px',
                            borderRadius: '0px'
                        }}
                        color="primary"
                        onClick={upload}
                        disabled={!imageAsFile}
                    >upload
                    </button>
                </div>
                <div>
                    {
                        (
                            ()=>{ 
                                if(uploading){
                                    return(
                                        <MDBProgress value={uploadpercent} className="my-2" >{parseInt(uploadpercent)}%</MDBProgress>
                                    );
                                }
                            }
                        )()
                    }
                </div>
                <div
                 style={{
                     maxWidth:'400px',
                     display: 'flex',
                     flexDirection: 'row',
                     marginTop: '50px',
                     textAlign: 'center'
                 }}
                >
                    <div style={sst}>
                        <div>{user.kills}</div>
                        <div ><span style={{ borderTop: '1px solid gray' }}>kills</span></div>
                    </div>
                    <div style={sst}>
                        <div>{user.deaths}</div>
                        <div ><span style={{ borderTop: '1px solid gray' }}>deaths</span></div>
                    </div>
                </div>
                <div
                    style={{
                        maxWidth: '400px',
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '50px',
                        textAlign: 'center'
                    }}
                >
                    <div style={sst}>
                        <div>{user.win}</div>
                        <div ><span style={{ borderTop: '1px solid gray' }}>wins</span></div>
                    </div>
                    <div style={sst}>
                        <div>{user.defeat}</div>
                        <div ><span style={{ borderTop: '1px solid gray' }}>defeats</span></div>
                    </div>
                </div>
                <div
                    style={{
                        maxWidth: '400px',
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '50px',
                        textAlign: 'center'
                    }}
                >
                    <div style={sst}>
                        <div>{user.kd}</div>
                        <div ><span style={{ borderTop: '1px solid gray' }}>kd</span></div>
                    </div>
                    <div style={sst}>
                        <div>{user.points}</div>
                        <div ><span style={{ borderTop: '1px solid gray' }}>points</span></div>
                    </div>
                </div>
                
            </div>
        );
    }else{
        return(<Loading/>);
    }
}

export default ProfileSTATE;




/* 
img.width=1280px
img.height=720px
scale = 1280/720
width=100px
height=100/scalepx
width=400px
height=400*scalepx
*/