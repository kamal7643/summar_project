import React, { useState, useEffect }from 'react';
import firebase from '../../util/Firebase';



function ShowChat(props){
    const [message, setmessage] = useState([]);
    const ref = firebase.database().ref('messages/'+props.data.messageid);
    useEffect(()=>{
        setTimeout(()=>{
            ref.on('value',(value)=>{
                setmessage(value.val());
            })
        },2000)
    })
    return(
        <div
            style={{
                width: '100%',
                maxWidth: '400px',
                textAlign: (!message.content || message.from === props.uid) && 'right',
                overflow: 'hidden' ,
                minHeight:'20px',
                marginTop:'10px'
            }}
        >
        <div
            style={{
                width: '100%'
            }}
            ><label style={{
                borderRadius: '20px',
                paddingLeft: '20px',
                textAlign:'left',
                paddingRight: '20px',
                border: '1px solid gray',
                maxWidth: '300px',
                    backgroundColor: ((!message.content || message.from === props.uid) && '#BF5EFA') || '#5F9EA0'
                }}>{message.content || '' }</label></div></div>
    );
}

export default ShowChat;

