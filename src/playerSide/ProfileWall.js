import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
// import styles from '../css/profileWall.module.css';
import Loading from '../components/Loading';
// import { confirmAlert } from 'react-confirm-alert';
// import {useHistory} from 'react-router-dom';
import firebase from '../util/Firebase';
import Progress from 'react-progressbar';
import staticUrls from '../config/urls';

function ProfileWall(props) {
    const ID = new URLSearchParams(props.location.search).get('userid');
    const [user, setuser] = useState();
    const [loading, setloading] = useState(true);
    const [fetched, setfetched] = useState(false);
    const [winpercent, setwinpercent] = useState(0);
    const [killpercent, setkillpercent] = useState(0);
    const [imageAsUrl, setImageAsUrl] = useState(prevObject => ({ ...prevObject, imgUrl: staticUrls.profilephotourl }));
    // const history = useHistory();

    try {
        const action = firebase.storage().ref(`/images/${ID}/photo`);
        action.getDownloadURL().then((downloadURL) => {
            if (downloadURL) {
                setImageAsUrl(prevObject => ({ ...prevObject, imgUrl: downloadURL }))
            }
        })
    }
    catch (e) {
        console.log(e);
    }


    useEffect(() => {
        if (!fetched) {
            const ref = firebase.database().ref('users/' + ID);
            ref.on('value', (value) => {
                value.forEach(data => {
                    setuser(data.val());
                    let a = data.val().win;
                    let b = data.val().defeat;
                    if (b === 0) {
                        setwinpercent(100);
                    } else {
                        setwinpercent(((a) / (a + b)) * 100);
                    }
                    a = data.val().kills;
                    b = data.val().defeat;
                    if (b === 0) {
                        setkillpercent(100);
                    } else {
                        setkillpercent(((a) / (a + b)) * 100);
                    }
                })
            })
            setloading(false);
            setfetched(true);
        }
    }, [fetched, ID, setfetched, setloading])

    return (
        <div>
            <Header />
            <div>
                {
                    (
                        () => {
                            if (loading) {
                                return (<Loading />);
                            } else {
                                if (user) {
                                    return (
                                        <div>
                                            {
                                                (
                                                    () => { 
                                                        if(imageAsUrl){
                                                            return(<div style={{width:'100%', textAlign: 'center'}}>
                                                                    
                                                                    <img alt="profile" src={imageAsUrl.imgUrl} width="100px" height="100px" style={{borderRadius:'50px'}}/>
                                                                </div>);
                                                        }
                                                    }
                                                )()
                                            }
                                            <ul>
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
                                        </div>
                                    );
                                } else if (fetched) {
                                    return (<div>wait...
                                    </div>);
                                }
                            }
                        }
                    )()
                }
            </div>
        </div>
    );
}

export default ProfileWall;