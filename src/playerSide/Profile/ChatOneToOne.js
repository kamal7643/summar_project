import React, { useState, useEffect } from 'react';
import firebase from '../../util/Firebase';
import AddMessage from './AddMessage';


function ChatOneToOne(props) {
    const [once, setonce] = useState(true);
    const [messages, setmessages] = useState([]);
    // const [maxlimit, setmaxlimit] = useState(0);
    // const [limit, setlimit] = useState(10);

    // async function getMeta(url) {
    //     var img = new Image();
    //     img.src = url;
    //     img.onload = function (e) {
    //         const scale = img.width / img.height;
            
    //     };
    // }

    useEffect(() => {
        
        if (once) {
            const ref = firebase.database().ref('message-hash/' + props.firstperson + '/' + props.secondperson + '/messages');
            ref.orderByKey().on('value', (value) => {
                var templist = [];
                value.forEach((snap) => {
                    templist.push(snap.val());
                })
                setmessages(templist);
                console.log(templist);
                setTimeout(() => {
                    window.scrollTo(0, document.body.scrollHeight);
                }, 100);
            })
            setonce(false);
        }


    }, [messages, once, props])

    return (

        <div
            style={{
                width: '100%',
                maxWidth: '800px'
            }}
        >
            <div style={{textAlign: 'center'}}><span></span></div>
        {
            messages.map((message, i)=>{
                return (<div
                    key={i}
                    style={{ borderRadius: '10px', padding: '10px', textAlign: message.type === 'out' && 'right' }}
                    >
                        <label style={{border: '1px solid gray', borderRadius:'10px', maxWidth:'350px', padding:'5px', backgroundColor:(message.type === 'out' && 'royalBlue') || 'salmon'}}>{message.content.text}</label>
                    </div>);
            })
        }
        {
                messages.map((message, i) => <div 
                key={i}
                >
                {console.log(message)}
                    
                </div>)
            }
        <AddMessage usertochat={props.usertochat} from={props.firstperson} to={props.secondperson} />
        </div>
    );
}

export default ChatOneToOne;

/*const

<label
                        style={{ border: '1px solid gray', borderRadius: '10px', maxWidth: '350px', padding: '5px', backgroundColor: (message.type === 'out' && 'royalBlue') || 'salmon', textAlign: 'left' }}
                    >{message.content.text}</label>

                    */