import firebase from '../../util/Firebase';
import React, { useState, useEffect }from 'react';
import staticUrls from '../../config/urls';
import ChatOneToOne from './ChatOneToOne';


function Chat(props){
    const [userToChat, setuserToChat] = useState();
    const [ppls, setppls] = useState([]);
    const [once, setonce] = useState(true);
    const [ids, setids] = useState([]);

    
    useEffect(() => {
        setTimeout(() => {
            if(once){
                const ref = firebase.database().ref('message-hash/' + props.uid);
                
                ref.once('value', (value) => {
                    var templist = [];
                    value.forEach((snap) => {
                        templist.push(snap.key);
                    })
                    if(ids!==templist){
                        setids(templist);
                    }
                })
                setonce(false);
            }
        },1000)

        if(ids.length!==0 && ppls.length===0){
            const ref = firebase.database().ref('users');
            const templist =[];
            ids.map((id) =>{
                ref.child(id).child('profile').once('value', (value)=>{
                    const temp = value.val();
                    templist.push({name:temp.name,uid:temp.uid, photo:temp.photo});
                })
                return(<div></div>);
            })
            if(templist!==ppls){
                setppls(templist);
            }
        }

        
    }, [ids, ppls, once, props.uid, userToChat])
    

    if(userToChat){
        return(
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
                    <span style={{ marginRight: '10px' }} onClick={() => { setuserToChat();  }}>X</span>
                </div>
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
                <div><ChatOneToOne firstperson={props.uid} secondperson={userToChat.uid}/></div>
            </div>
        );
    }else{
        
        return(
            <div style={{marginTop:'20px'}}>{
                ppls.map((ppl, i) => {
                    return (<div
                        style={{
                            width: '100%',
                            borderRadius: '10px',
                            border: '1px solid gray'
                        }}
                        onClick={()=>{
                            setuserToChat(ppl);
                        }}
                        key={i}
                    >
                        <img
                            src={ppl.photo || staticUrls.profilephotourl}
                            alt="icon"
                            style={{ width: '30px', height: '30px', marginTop: '5px', borderRadius: '50px' }}
                        />
                        {ppl.name}
                    </div>);
                })
            }</div>
        );
    }
    
}




export default Chat;