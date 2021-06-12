import React, { useState, useEffect } from 'react';
import firebase from '../util/Firebase';
import Friend from '../components/Friend';


function Peoples(props) {
    const [fetched, setfetched] = useState(false);
    const [ppls, setppls] = useState();
    const ref = firebase.database().ref('users');

    function Addfriend(ppl){
        ref.child(props.uid).child('friends').child(ppl).set({uid:ppl});
    }


    useEffect(() => { 
        if(!fetched){
            var data = [];
            ref.once('value', (snapshot) => {
                snapshot.forEach((snap)=>{
                    if(props.uid !==snap.child("profile").val().uid){
                        data.push(snap.child("profile").val().uid);
                    }
                })
            })
            setppls(data);
            setfetched(true);
        }
    },[fetched, setfetched, ref, setppls, props])

    if(ppls){
        return(
            <div>
            {
                    ppls.map((ppl, i) => <div key={i} style={{ display: 'flex', flexDirection: 'row' }}><div style={{ width: '100%' }}><Friend uid={ppl} /></div><button onClick={() => { Addfriend(ppl)}} style={{height:'35px',marginTop:'10px'}}>add</button></div>)
            }
            </div>
        );
    }
    else{
        return(
            <div>loading...</div>
        );
    }
}

export default Peoples;