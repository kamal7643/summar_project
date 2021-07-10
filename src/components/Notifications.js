import React,{ useState, useEffect} from 'react';
import firebase from '../util/Firebase';
import Header from './Header';
import { MdDelete } from 'react-icons/md';


function Notifications(){

    const [once, setonce] = useState(true);
    const [notifications, setnotifications] = useState([]);

    const deleteNotification = (key)=>{
        const ref = firebase.database().ref('users/' + JSON.parse(localStorage.getItem('firebaseusr')).uid + '/notifications');
        ref.child(key).set({});
        setnotifications([]);
    }

    const getNotifications = () => {
        if (localStorage.getItem('firebaseusr')) {
            const ref = firebase.database().ref('users/' + JSON.parse(localStorage.getItem('firebaseusr')).uid + '/notifications');
            var tempList = [];
            ref.on('value', (value) => {
                value.forEach((snap) => {
                    tempList.push({msg:snap.val(),key:snap.key});
                    setnotifications(tempList);
                })
            })
        }
    }


    useEffect(() => {
        setTimeout(() =>{
            if(once){
                getNotifications();
                setonce(false);
            }
        })
    })
    return (
        <div>
            <Header/>{
                <div>
                    {
                        notifications.map((notification, i) => <div key={i} style={{ display: 'flex', flexDirection: 'row', width: '100%', border: '.5px solid gray' }}>
                            <div style={{ width: '100%', padding: '10px' }}>{notification.msg}</div>
                            <div style={{ margin: '10px' }} onClick={() => { deleteNotification(notification.key); }}><MdDelete /></div>
                        </div>)
                    }
                </div>
            }
        </div>
    );
}


export default Notifications;