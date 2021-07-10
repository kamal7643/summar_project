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
import { CgProfile } from 'react-icons/cg';
import { BsPeopleFill } from 'react-icons/bs';
import { MdEvent } from 'react-icons/md';
import { HiChatAlt2 } from 'react-icons/hi';


function Profile(props) {
    const ID = new URLSearchParams(props.location.search).get('id');
    const JOIN = new URLSearchParams(props.location.search).get('join');
    const STATE = new URLSearchParams(props.location.search).get('state');
    // const CHATWITH = new URLSearchParams(props.location.search).get('chatwith');
    getcurruser().then((user) => {
        if (user) {
            localStorage.setItem('currusr',JSON.stringify(user));
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
            userref.set({ uid: JOIN });
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
                    marginTop: '10px'
                }}
            >
                <span
                    style={{
                        width: '90%',
                        color: (STATE === 'profile' && 'black') || 'gray',
                        fontWeight: (STATE === 'profile' && 'bold'),
                        boxShadow: '0px 0px 5px gray',marginLeft:'20px',marginRight:'20px',paddingTop:'10px',paddingBottom:'10px'
                    }}
                    onClick={() => { history.push("profile?id=" + ID + '&state=profile'); }}
                >
                    <CgProfile/>
                </span>
                <span
                    style={{
                        width: '100%',
                        color: (STATE === 'peoples' && 'black') || 'gray',
                        fontWeight: (STATE === 'peoples' && 'bold'),
                        boxShadow: '0px 0px 5px gray', marginLeft: '20px', marginRight: '20px', paddingTop: '10px', paddingBottom: '10px'
                    }}
                    onClick={() => { history.push("profile?id=" + ID + '&state=peoples'); }}
                >
                    <BsPeopleFill />
                </span>
                <span
                    style={{
                        width: '100%',
                        color: (STATE === 'events' && 'black') || 'gray',
                        fontWeight: (STATE === 'events' && 'bold'),
                        boxShadow: '0px 0px 5px gray', marginLeft: '20px', marginRight: '20px', paddingTop: '10px', paddingBottom: '10px'
                    }}
                    onClick={() => { history.push("profile?id=" + ID + '&state=events'); }}
                >
                    <MdEvent/>
                </span>
                <span
                    style={{
                        width: '100%',
                        color: (STATE === 'chat' && 'black') || 'gray',
                        fontWeight: (STATE === 'chat' && 'bold'),
                        boxShadow: '0px 0px 5px gray', marginLeft: '20px', marginRight: '20px', paddingTop: '10px', paddingBottom: '10px'
                    }}
                    onClick={() => { history.push("profile?id=" + ID + '&state=chat'); }}
                >
                    <HiChatAlt2/>
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
