import React from 'react';
import firebase from '../util/Firebase.js';


function Test(props) {

    const get = async () => {
        const todoref = firebase.database().ref('players');
        todoref.on('value', (snapshot) => {
            console.log(snapshot.val());
        })
    }

    const main = async () =>{
        const todoref = firebase.database().ref('users');
        const todo = {
            name: "test 01",
            link: "https://www.youtube.com/embed/XumojP2HIkw",
            desciption:"test 01"
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