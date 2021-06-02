import React, { useState, useEffect } from 'react';
import firebase from '../util/Firebase';
import Friend from '../components/Friend';


function Friends(props) {
    const [fetched, setfetched] = useState(false);
    const [friends, setfriends] = useState([]);
    const ref = firebase.database().ref('users/' + props.uid + "/friends");

    useEffect(() => {
        let uids = [];
        if (!fetched) {
            ref.on('value', (snapshot) => {
                snapshot.forEach((user) => {
                    uids.push(user.val().uid);
                })
            })
            setfriends(uids);
            setfetched(true);
        }
    })
    return (<div>
        {
            friends.map((friend, i) => {
                return (<Friend uid={friend} key={i} />);
            }
            )
        }
    </div>);
}

export default Friends;