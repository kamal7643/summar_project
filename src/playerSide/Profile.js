import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import firebase from '../util/Firebase';
import createHistory from 'history/createBrowserHistory';



function Profile(props) {
    // const user = props.location.state;
    const ID = new URLSearchParams(props.location.search).get('id');
    const [user, setuser] = useState();
    const [count, setcount] = useState(0);
    const [fetched, setfetched] = useState(false);
    const history = createHistory({ forceRefresh: true });

    useEffect(() => {
        if(!fetched){
            const ref = firebase.database().ref('users/' + ID);
            ref.on('value', (value) => {
                value.forEach(data => {
                    setuser(data.val());
                })
            })
            setfetched(true);
        }
    },[ ID , fetched])

    return(
        <div>
            <Header />
            {count}<button onClick={() => {setcount(count+1);}}>plus</button>
            {
                (
                    () =>{ 
                        if(user){
                            
                            return<div>{user.uid}</div>
                        }else{
                            return<div>wait...</div>
                        }
                    }
                )()
            }
        </div>
    );
}

export default Profile;