import React from 'react';
import Header from '../components/Header';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../util/Firebase';

function Admin(props) {
    const history = useHistory();

    if (JSON.parse(localStorage.getItem('firebaseusr'))){
        if (JSON.parse(localStorage.getItem('firebaseusr')).email!=='kswami848@gmail.com'){
            history.push('/404');
        }
    }
    const sendWelcomeMessage = () => {
        const usrRef = firebase.database().ref('users');
        usrRef.once('value', (usrs)=>{
            usrs.forEach((usr)=>{
                const key = usr.key;
                const notificationRef = firebase.database().ref('users/'+key+'/notifications');
                notificationRef.child('1').set('welcome to this site');
            })
        })
    }
    

    return(<div>
            <Header />
            <div>
                <ul className="list-group">
                    <li className="list-group-item" onClick={() => { history.push("/admin/suggestion") }}>Suggestion</li>
                    <li className="list-group-item" onClick={() => { history.push("/admin/events") }}>Event</li>
                </ul>
                
            <button onClick={sendWelcomeMessage}>send welcome message</button>
            </div>
        </div>);
}

export default Admin;