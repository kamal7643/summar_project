import React, { useState, useEffect } from 'react';
import firebase from '../../util/Firebase';
import ShowChat from './ShowChat';
import AddMessage from './AddMessage';


function ChatOneToOne(props) {
    const [once, setonce] = useState(true);
    const [ids, setids] = useState([]);

    useEffect(() => {
        if (once) {
            const ref = firebase.database().ref('message-hash/' + props.firstperson + '/' + props.secondperson + '/messages');
            ref.orderByKey().limitToLast(10).on('value', (value) => {
                var templist = [];
                value.forEach((snap) => {
                    templist.push(snap.val());
                })
                setids(templist);
            })
            setonce(false);
        }



    }, [ids, once, props])
    return (

        <div
            style={{
                width: '100%'
            }}
        >{
                ids.map((id, i) => <ShowChat key={i} data={id}></ShowChat>)
            }
            <AddMessage usertochat={props.usertochat} from={props.firstperson} to={props.secondperson} />
            </div>
    );
}

export default ChatOneToOne;