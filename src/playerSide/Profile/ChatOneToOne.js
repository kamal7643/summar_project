import React, { useState, useEffect } from 'react';
import firebase from '../../util/Firebase';
import AddMessage from './AddMessage';


function ChatOneToOne(props) {
    const [once, setonce] = useState(true);
    const [messages, setmessages] = useState([]);
    const [maxlimit, setmaxlimit] = useState(0);
    const [limit, setlimit] = useState(10);

    async function getMeta(url) {
        var img = new Image();
        img.src = url;
        img.onload = function (e) {
            const scale = img.width / img.height;
            
        };
    }

    useEffect(() => {
        
        if (once) {
            const ref = firebase.database().ref('message-hash/' + props.firstperson + '/' + props.secondperson + '/messages');
            //.limitToLast(10)
            ref.on('value',value=>{
                // setmaxlimit(ref.numChildren());
                setTimeout(()=>{
                    window.scrollTo(0, document.body.scrollHeight);
                },1000);
            })
            ref.orderByKey().on('value', (value) => {
                var templist = [];
                setmaxlimit(value.numChildren());
                value.forEach((snap) => {
                    templist.push(snap.val());
                    if(snap.val().content.text===localStorage.getItem('lastmsg')){
                        localStorage.removeItem('lastmsg');
                    }
                })
                setmessages(templist);
            })
            setonce(false);
        }


    }, [messages, once, props, limit])
    return (

        <div
            style={{
                width: '100%',
                maxWidth: '800px'
            }}
        >
            <div style={{textAlign: 'center'}}><span></span></div>
        {
                messages.map((message, i) => <div 
                key={i}
                style={{ borderRadius:'10px', padding:'10px', textAlign:message.type==='out'&&'right'}}
                >
                    <div>{message.content.photourl!=='' && <img src={message.content.photourl} alt="image" />}</div>
                    <div>
                    {
                        message.content.photourl==='' && message.content.fileurl!=='' && <div>file</div>
                    }
                    </div>
                    <label
                        style={{ border: '1px solid gray', borderRadius: '10px', maxWidth:'350px', padding: '5px', backgroundColor:(message.type==='out' && 'royalBlue')|| 'salmon', textAlign:'left'}}
                    >{message.content.text}</label>
                </div>)
            }
            <AddMessage usertochat={props.usertochat} from={props.firstperson} to={props.secondperson} />
        </div>
    );
}

export default ChatOneToOne;