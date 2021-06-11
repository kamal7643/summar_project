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
                var templist = [];
                ref.on('value', (value) => {
                    value.forEach((snap) => {
                        templist.push(snap.key);
                    })
                    setids(templist);
                })
                setonce(false);
            }
        },1000)

        if(ids.length!==0 && ppls.length===0){
            const ref = firebase.database().ref('users');
            const templist =[];
            ids.map((id) =>{
                ref.child(id).child('profile').on('value', (value)=>{
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
        
        window.scrollTo(0, document.body.scrollHeight);
        return(
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
                <div><ChatOneToOne usertochat={setuserToChat} firstperson={props.uid} secondperson={userToChat.uid}/></div>
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
            }
            {
                (
                    ()=>{
                        if(ppls.length===0){
                            return(<div>loading...</div>);
                        }
                    }
                )()
            }
            </div>
        );
    }
    
}




export default Chat;