import React, { useState, useEffect }from 'react';
import firebase from '../util/Firebase';
import staticUrls from '../config/urls';
import { useHistory } from 'react-router-dom';

function Friend(props) {
    const [fetched, setfetched] = useState(false);
    const [user, setuser] = useState();
    const ref = firebase.database().ref('users/' + props.uid);
    const [url, seturl] = useState(prevObject=>({...prevObject, imgUrl: staticUrls.profilephotourl}));
    const history = useHistory();

    useEffect(() => {
        if(!fetched){
            ref.on('value', (snapshot)=>{
                snapshot.forEach((snap)=>{
                    setuser(snap.val());
                })
            })
            setfetched(true);
            try{   
                const action = firebase.storage().ref(`/images/${props.uid}/photo`);
                action.getDownloadURL().then((downloadURL) => {
                    if (downloadURL) {
                        seturl(prevObject => ({ ...prevObject, imgUrl: downloadURL }))
                    }
                })
            }catch(e){console.log(e);}
        }
    })
    return(
        <div style={{widht: '100%', border:'1px solid gray', height: '40px', margin: '10px', borderRadius:'10px'}}>
            {
                (
                    ()=>{ 
                        if(user){
                            return(
                                <div style={{display: 'flex', flexDirection: 'row'}} onClick={() =>{history.push({pathname:'profilewall', search:'userid='+props.uid})}}>
                                    <div style={{ width: '50%' }}><img alt="profile" src={url.imgUrl} style={{width:'30px', height:'30px', marginTop:'5px', borderRadius:'50px'}}/></div>
                                    <div style={{ width: '150%', textAlign:'left' }}>{user.name}</div>
                                    <div style={{ width: '100%' }}>{user.points} points</div>
                                </div>
                            );
                        }
                    }
                )()
            }
        </div>
    );
}


export default Friend;