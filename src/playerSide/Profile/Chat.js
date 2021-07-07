import firebase from '../../util/Firebase';
import React, { useState, useEffect } from 'react';
import staticUrls from '../../config/urls';
import ChatOneToOne from './ChatOneToOne';
import Popup from '../../components/Popup';
import SetStartingState from './SetStartingState';
import { RiAddCircleLine } from 'react-icons/ri';


function Chat(props) {
    const [userToChat, setuserToChat] = useState();
    const [once, setonce] = useState(true);
    const [ids, setids] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }



    useEffect(() => {
        setTimeout(() => {
            if (once) {
                const ref = firebase.database().ref('message-hash/' + props.uid);
                var templist = [];
                ref.on('value', (value) => {
                    templist = [];
                    value.forEach((snap) => {
                        templist.push({ key: snap.key,uid:snap.key, time: snap.val().time,name:snap.val().info.info.name,photo: snap.val().info.info.photo})
                    })
                    setids(templist);
                })
                setonce(false);
            }
        }, 1000)



    }, [ids, once, props.uid, userToChat, setonce, setids])


    if (userToChat) {
        // window.scrollTo(0, document.body.scrollHeight);
        return (
            <div
                style={{
                    width: '100%'
                }}
            >
                <div
                    style={{
                        textAlign: 'center'
                    }}
                >
                    <img
                        src={userToChat.photo || staticUrls.profilephotourl}
                        alt="icon"
                        style={{ width: '100px', height: '100px', marginTop: '5px', borderRadius: '50px' }}
                    />
                    <br />
                    <span style={{ width: '100%', marginBottom: '30px' }}>{userToChat.name}</span>
                </div>
                <div>
                    <ChatOneToOne
                        usertochat={setuserToChat}
                        firstperson={props.uid}
                        secondperson={userToChat.uid}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={togglePopup}
                    style={{
                        border: '0px solid gray',
                        backgroundColor: 'white',
                        position: 'fixed',
                        bottom: '50px',
                        borderRadius: '50px',
                        height: '50px',
                        width: '50px',
                        right: '2%',
                        boxShadow: '0px 0px 20px black'
                    }}
                ><RiAddCircleLine style={{ fontSize: '30px' }} />
                </button>
                {isOpen && <Popup
                    content={<>
                        <b>choose one to chat</b>
                        <SetStartingState uid={props.uid} togglepopup={togglePopup} setuser={setuserToChat} />

                    </>}
                    handleClose={togglePopup}
                />}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {
                        ids.sort((a, b) => parseInt(Date.parse(b.time.time)) - parseInt(Date.parse(a.time.time))).map((ppl, i) => {
                            return (<div key={i}>
                                <div
                                    style={{ padding: '0px' }}
                                >

                                </div>
                                <div
                                    style={{ margin: '5px', boxShadow: '0px 0px 5px gray', padding: '10px' }}
                                    onClick={() => {
                                        setuserToChat(ppl);
                                    }}

                                >
                                    <img
                                        src={ppl.photo || staticUrls.profilephotourl}
                                        alt="icon"
                                        style={{ width: '30px', height: '30px', marginTop: '5px', borderRadius: '50px' }}
                                    />
                                    <label style={{ marginLeft: '20px', marginTop: '5px ' }}>{ppl.name}</label>
                                </div>
                            </div>);
                        })
                    }
                </div>
            </div>
        );
    }

}




export default Chat;