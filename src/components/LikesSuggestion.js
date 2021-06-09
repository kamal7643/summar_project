import React, { useState, useEffect } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FcLike } from "react-icons/fc";
import { getcurruser } from '../util/cognito';
import firebase from '../util/Firebase';

function LikesSuggestion(props){

    const [liked, setliked] = useState(false);
    const [likes, setlikes] = useState(0);
    const [fetched, setfetched] = useState(false);
    const ref = firebase.database().ref('suggestion/'+props.uid+'/likes');

    function handleChangeState(){
        getcurruser().then((user) => {
            if(user){
                if (liked) {
                    setlikes(likes - 1);
                    ref.child(user.uid).remove();

                } else {
                    setlikes(likes + 1);
                    ref.child(user.uid).set({uid:user.uid});
                }
            }
        })
        
        setliked(!liked);
    }

    useEffect(() => {
        if(!fetched){
            getcurruser().then((user) => {
                if(user){
                    ref.on('value', (snapshot) => {
                        setlikes(snapshot.numChildren());
                        snapshot.forEach((snap) => {
                            if (snap.val().uid === user.uid) {
                                setliked(true);
                            }
                        })
                    })
                }
            })
            
            setfetched(true);
        }
    }, [fetched, ref, setfetched])

    return(<div style={{display: 'flex', flexDirection: 'row'}}>
            <div onClick={handleChangeState}>  
                {
                    (liked && <FcLike/>) || <AiOutlineHeart/>
                }
            </div>
            <span>{likes}</span>
        </div>);
}

export default LikesSuggestion;