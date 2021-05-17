import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import firebase from '../util/Firebase';



function Profile(props) {
    const [user, setuser] = useState();
    const ID = new URLSearchParams(props.location.search).get('user');
    setuser(firebase.auth().currentUser);

    firebase.auth().onAuthStateChanged(uuser =>{
        if(uuser){
            setuser(uuser);
        }
    })
    return(
        <div>
            <Header />
            {ID}
            {
                (
                    ()=>{
                        if(user){
                            return(<div>{user.uid}</div>);
                        }
                    }
                )()
            }
        </div>
    );
}

export default Profile;