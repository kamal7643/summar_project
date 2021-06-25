import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import firebase from '../../util/Firebase';
import { useHistory } from 'react-router-dom';
import { getcurruser } from '../../util/cognito';
import { confirmAlert } from 'react-confirm-alert';
import ProfileSTATE from './ProfileSTATE';
import PeoplesSTATE from './PeoplesSTATE';
import EventSTATE from './EventSTATE';
import Chat from './Chat';


function Profile(props) {
    const ID = new URLSearchParams(props.location.search).get('id');
    const JOIN = new URLSearchParams(props.location.search).get('join');
    const STATE = new URLSearchParams(props.location.search).get('state');
    getcurruser().then((user) => {
        if (user) {
            localStorage.setItem('user',JSON.stringify(user));
            if (user.uid !== ID) { history.push('/404'); }
        }
    })
    const ref = firebase.database().ref('users/' + ID + "/profile");
    const history = useHistory();
    const [need, setneed] = useState(0);


    if (ID === 'undefined') {
        alert('Login Failed');
        history.push({ pathname: '/login' });
    }



    useEffect(() => {
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
            history.push("profile?id=" + ID + '&state=events');
        }
        setTimeout(() => { setneed(need + 1) }, 1000)
    }, [ID, ref, history, setneed, need, JOIN])

    return (
        <div style={{ minHeight: '100%' }}>
            <Header />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    textAlign: 'center',
                    width: '100%',
                    marginTop: '10px',
                    boxShadow: '0px 0px 4px gray'
                }}
            >
                <span
                    style={{
                        width: '100%',
                        color: (STATE === 'profile' && 'black') || 'gray',
                        fontWeight: (STATE === 'profile' && 'bold')
                    }}
                    onClick={() => { history.push("profile?id=" + ID + '&state=profile'); }}
                >
                    PROFILE
                </span>
                <span
                    style={{
                        width: '100%',
                        color: (STATE === 'peoples' && 'black') || 'gray',
                        fontWeight: (STATE === 'peoples' && 'bold')
                    }}
                    onClick={() => { history.push("profile?id=" + ID + '&state=peoples'); }}
                >
                    PEOPLES
                </span>
                <span
                    style={{
                        width: '100%',
                        color: (STATE === 'events' && 'black') || 'gray',
                        fontWeight: (STATE === 'events' && 'bold')
                    }}
                    onClick={() => { history.push("profile?id=" + ID + '&state=events'); }}
                >
                    EVENTS
                </span>
                <span
                    style={{
                        width: '100%',
                        color: (STATE === 'chat' && 'black') || 'gray',
                        fontWeight: (STATE === 'chat' && 'bold')
                    }}
                    onClick={() => { history.push("profile?id=" + ID + '&state=chat'); }}
                >
                    CHAT
                </span>
            </div>
            {
                (
                    () => {
                        if (STATE === 'profile') {
                            return(<ProfileSTATE uid={ID} />);
                        }
                        else {
                            if (STATE === 'peoples') {
                                return(<PeoplesSTATE uid={ID} />);
                            }
                            else {
                                if (STATE === 'events') {
                                    return (<EventSTATE uid={ID} />);
                                } else {
                                    return (<Chat uid={ID} />);
                                }
                            }
                        }
                    }
                )()
            }
        </div>
    );
}

export default Profile;
