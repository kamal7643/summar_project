import React, { useState, useEffect } from 'react';
import firebase from '../util/Firebase';
import Friend from '../components/Friend';


function Peoples(props) {
    const [fetched, setfetched] = useState(false);
    const [ppls, setppls] = useState();
    const ref = firebase.database().ref('users');


    useEffect(() => { 
        if(!fetched){
            var data = [];
            ref.on('value', (snapshot) => {
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
                ppls.map((ppl, i) =><Friend key={i} uid={ppl}/>)
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