import React, { useState, useEffect } from 'react';
import firebase from '../../util/Firebase';
import AddMessage from './AddMessage';
import PrintMessages from './PrintMessages';


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
            <PrintMessages messages={messages}/>
        <AddMessage usertochat={props.usertochat} from={props.firstperson} to={props.secondperson} />
        </div>
    );
}

export default ChatOneToOne;