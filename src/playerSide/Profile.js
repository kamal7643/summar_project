import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import firebase from '../util/Firebase';
// import createHistory from 'history/createBrowserHistory';
import { Button } from 'react-bootstrap';



function Profile(props) {
    const ID = new URLSearchParams(props.location.search).get('id');
    const [user, setuser] = useState();
    const [fetched, setfetched] = useState(false);
    const [playname, setplayname] = useState("");
    // const history = createHistory({ forceRefresh: true });
    const ref = firebase.database().ref('users/' + ID + "/profile");


    function updatePlayName(){
        ref.child("playname").set(playname)
        setfetched(false);
    }

    useEffect(() => {
        if(!fetched){
            ref.on('value', (value) => {
                setuser(value.val());
                setplayname(value.val().playname);
            })
            setfetched(true);
        }
    },[ ID , fetched, setplayname, user, ref])

    return(
        <div>
            <Header />
            {
                (
                    () =>{ 
                        if(user){
                            
                            return<div>
                                Name : {user.name} Authentication pass
                                <br/>
                                Email : {user.email} 
                                <br/><br/>
                                Playname : <input type="text" value={playname} onChange={(e)=>{setplayname(e.target.value)}} />
                                &nbsp;            
                                <Button style={{ padding: '0.5%' }} type="button" onClick={() => {updatePlayName()}}>update</Button>
                                </div>
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