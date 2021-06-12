import React, { useState, useEffect } from 'react';
import firebase from '../../util/Firebase';
import Friend from '../../components/Friend';


function SetStartingState(props) {
    const [fetched, setfetched] = useState(false);
    const [ppls, setppls] = useState();
    const ref = firebase.database().ref('users');


    useEffect(() => {
        if (!fetched) {
            var data = [];
            ref.child(props.uid).child('friends').once('value', (snapshot) => {
                snapshot.forEach((snap) => {
                        data.push(snap.val().uid);
                })
            })
            setppls(data);
            setfetched(true);
        }
    }, [fetched, setfetched, ref, setppls, props])

    if (ppls) {
        return (
            <div>
                {
                    ppls.map((ppl, i) => <div 
                    key={i} 
                    style={{ 
                        display: 'flex', 
                        flexDirection: 'row'
                    }}
                    >
                        <div 
                        style={{ 
                            width: '100%' 
                        }}
                        >
                            <Friend uid={ppl} onClick={()=>{props.togglepopup();}} functioncall={props.setuser} />
                        </div>
                    </div>)
                }
            </div>
        );
    }
    else {
        return (
            <div>loading...</div>
        );
    }
}

export default SetStartingState;