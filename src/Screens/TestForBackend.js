import React from 'react';
import firebase from '../util/Firebase.js';


function Test(props) {

    const get = async () => {
        const todoref = firebase.database().ref('videos');
        todoref.on('value', (snapshot) => {
            console.log(snapshot.val());
        })
    }

    const main = async () =>{
        const todoref = firebase.database().ref('videos');
        const todo = {
            name: "second video",
            link: "https://www.youtube.com/embed/XumojP2HIkw",
            desciption: "something"
        }

        todoref.push(todo);
    }


    return(
        <div>
        <div onClick={() =>{main()}}>
            testing
        </div>
        <div onClick={() =>{get()}}>
            get
        </div>
        </div>
    );
}


export default Test;