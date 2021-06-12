import React, { useState, useEffect } from 'react';
import firebase from '../util/Firebase';
import Friend from '../components/Friend';



function Friends(props) {
    const [fetched, setfetched] = useState(false);
    const [friends, setfriends] = useState();
    const ref = firebase.database().ref('users/' + props.uid + "/friends");

    useEffect(() => {
        
        setTimeout(() => {
            let uids = [];
            ref.on('value', (snapshot) => {
                uids = [];
                snapshot.forEach((user) => {
                    uids.push(user.key);
                })
            })
            setfriends(uids);
        },1000)
        if (!fetched) {
           
            setfetched(true);
        }
    }, [fetched, ref, setfriends, setfetched])
    if(friends){
        return (<div>
        {
            friends.map((friend, i) => {
                return (<Friend uid={friend} key={i} />);
            }
            )
        }
    </div>);
    }
    else{
        return(<div>Loading...</div>);
    }
}

export default Friends;