import firebase from '../../util/Firebase';
import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import staticUrls from '../../config/urls';


function ChatSTATE(props) {
    const [ppls, setppls] = useState([]);
    const [userIdToChat, setuserIdToChat] = useState();
    const [msgs, setmsgs] = useState([]);
    const [onceinuserchat, setonceinuserchat] = useState(true);
    const [once, setonce] = useState(true);
    const [content, setcontent] = useState('');

    function addnewmsg(){
        const msgsref = firebase.database().ref('messages');
        if(content!==''){
            var key = msgsref.push({content: content}).key;
            const msghashref = firebase.database().ref('message-hash');
            msghashref.child(props.uid).child(userIdToChat.uid).child("messages").push({messageid:key, type:'out'})
            msghashref.child(userIdToChat.uid).child(props.uid).child("messages").push({ messageid: key, type: 'in' })
            setonceinuserchat(true);
            setmsgs([]);
            setcontent('');
        }
    }

    function storemessages() {
        
        const ref = firebase.database().ref('message-hash/' + props.uid + '/' + userIdToChat.uid + '/messages');
        ref.on('value', (value) => {
            setmsgs([]);
            value.forEach((snap) => {
                const newref = firebase.database().ref('messages/' + snap.val().messageid);
                newref.on('value', (value) => {
                    var tempmsgslist = msgs;
                    tempmsgslist.push({ content: value.val().content, type: snap.val().type });
                    setmsgs(tempmsgslist);
                })
            })
        })
    }

    function storeppls() {
        
        const dbref = firebase.database().ref('message-hash/' + props.uid);
        dbref.on('value', (snapshot) => {
            console.log('count');
            setppls([]);
            snapshot.forEach((snap) => {
                const ref = firebase.database().ref('users').child(snap.key).child('profile');
                ref.on('value', (value) => {
                    console.log(ppls);
                    console.log({ photo: value.val().photo, name: value.val().name, uid: value.val().uid });
                    var temp = ppls;
                    temp.push({ photo: value.val().photo, name: value.val().name, uid: value.val().uid });
                    console.log(temp);
                    setppls(temp);
                })
            })
        })

    }

    useEffect(() => {
        console.log(ppls.length);
        console.log(msgs.length);
        setTimeout(() => {
            if (once) {
                storeppls();
                setonce(false);
            }

        }, 0)
    })
    if (userIdToChat) {
        if (onceinuserchat) {
            setmsgs([]);
            storemessages();
            setonceinuserchat(false);
        }
        return (
            <div
                style={{
                    width: '100%'
                }}
            >
                <div
                    style={{
                        textAlign: 'right',
                        width: '100%'
                    }}
                >
                    <span style={{ marginRight: '10px' }} onClick={() => { setuserIdToChat(); setmsgs([]); }}>X</span>
                </div>
                <div
                    style={{
                        textAlign: 'center'
                    }}
                >
                    <img
                        src={userIdToChat.photo || staticUrls.profilephotourl}
                        alt="icon"
                        style={{ width: '100px', height: '100px', marginTop: '5px', borderRadius: '50px' }}
                    />
                    <br />
                    <span style={{ width: '100%', marginBottom: '30px' }}>{userIdToChat.name}</span>
                </div>

                <div style={{ width: '100%'}} >
                    {
                        msgs.map((message, i) => <div key={i}>
                            <div
                                style={{
                                    width: '100%',
                                    textAlign: message.type === 'out' && 'right'
                                }}
                            ><span
                                style={{
                                    borderRadius:'20px',
                                    paddingLeft:'20px',
                                    paddingRight:'20px',
                                        border: '1px solid gray',
                                        backgroundColor: (message.type === 'out' && 'blue' )|| 'pink'
                                }}
                            >{message.content}</span></div>
                        </div>)
                    }
                </div>
                <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                }}
                >
                    <input type="text" placeholder="type here" style={{width: '100%'}} value={content} onChange={(e)=>{setcontent(e.target.value)}}/>
                    <button onClick={addnewmsg}>send</button>
                </div>
            </div>
        );
    }
    else {
        return (
            <div
                style={{ marginTop: '10px' }}
            >
                {
                    (
                        () => {
                            if (ppls.length === 0) {
                                return (<div>start new chat<Loading /></div>);
                            }
                        }
                    )()
                }
                {ppls.map((ppl, i) => <div
                    style={{
                        width: '100%',
                        borderRadius: '10px',
                        border: '1px solid gray'
                    }}
                    onClick={() => { setuserIdToChat(ppl); setonceinuserchat(true); }}
                    key={i}
                >
                    <img
                        src={ppl.photo || staticUrls.profilephotourl}
                        alt="icon"
                        style={{ width: '30px', height: '30px', marginTop: '5px', borderRadius: '50px' }}
                    />
                    {ppl.name}
                </div>)}
            </div>
        );
    }
}

export default ChatSTATE;