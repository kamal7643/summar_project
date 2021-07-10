import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import styles from '../css/adminevent.module.css';
import Loading from '../components/Loading';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import firebase from '../util/Firebase';
import { useHistory } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';

function AdminEvents(props) {
    const typeOptions = [
        {
            label: "TDM",
            value: "TDM",
        },{
            label: "Battlegrounds",
            value: "Battlegrounds"
        }
    ];

    const gameOptions=[
        {
            label: "BGMI",
            value: "BGMI"
        }, 
        {
            label: "COD",
            value: "COD"
        }, {
            label: "GTA V",
            value: "GTA V"
        }

    ]

    const [game, setgame] = useState("");
    const [type, settype] = useState("");
    const [time, settime] = useState("");
    const [date, setdate] = useState("");
    const [id, setid] = useState("");
    const [password, setpassword] = useState("");
    const [gotlast, setgotlist] = useState(false);
    const [events, setevents] = useState([]);
    const history = useHistory();

    function getData() {
        const todoref = firebase.database().ref('events');
        todoref.on('value', (snapshot) => {
            if (snapshot.exists()) {
                let eet = [];
                snapshot.forEach((element) => {
                    eet.push(element.val());
                })
                setevents(eet);
            }
            else {
                console.log("events not found");
            }
        })
    }


    function AddNew() {
        if (game === "" || type === "" || time === "" || date === "") {
            confirmAlert({
                title: "ERROR",
                message: "please fill all fields",
                buttons: [
                    {
                        label: 'continue'
                    }
                ],
                closeOnClickOutside: false
            })
        } else {
            getData();
            try {
                const todoref = firebase.database().ref('events');
                const todo={
                    game:game,
                    type: type,
                    date: date,
                    time: time,
                    eventid:id,
                    password: password,
                    open:true
                };
                const key = todoref.push(todo).key;
                todoref.child(key).child('uid').set(key);
                NotificationManager.success('Event created', 'Added');
                getData();
                setgame("");
                settype("");
                settime("");
                setdate("");
                setid("");
                setpassword("");

            }
            catch (e) {
                console.log(e);
            }

        }
    }

    function finalDeleteEvent(uid) {
        const todoref = firebase.database().ref('events/'+uid);
        todoref.child('peoples').once('value', (value)=>{
            value.forEach((usr)=>{
                const tempref = firebase.database().ref('users/'+usr.key+'/events/'+uid);
                tempref.set({})
            })
        })
        todoref.set({});
        setevents([]);
        getData();
    }

    function deleteEvent(e) {
        try {
            confirmAlert({
                title: "Are you sure?",
                message: "This event will be deleted",
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => finalDeleteEvent(e)
                    }, {
                        label: 'No'
                    }
                ]
            })
        }
        catch (e) {
            console.log(e);
        }

    }

    function editEvent(e) {
        console.log(e);
        getData();
    }

    useEffect(() => {
        if (!gotlast) {
            getData();
            setgotlist(true);
        }
    }, [setgotlist, gotlast])

    return (<div >
        <Header />
        <div><span onClick={() => { history.push('/admin') }}>admin{'>'}</span><span>suggestions</span></div>
        <div className={styles.heading}>Add New Event</div>
        <div className={styles.enter} style={{padding:'20px', maxWidth: '400px'}}>
            <select className={styles.item} value={game} onChange={(e)=>{setgame(e.target.value)}}>
                <option value={""} >Select one</option>
                {gameOptions.map((game)=>(
                    <option value={game.value} key={game.value}>{game.label}</option>
                ))
                }
            </select>
            <select className={styles.item} value={type} onChange={(e) => { settype(e.target.value) }}>
                <option value={""}>Select one</option>
                {typeOptions.map((option) => (
                    <option value={option.value} key={option.value}>{option.label}</option>
                ))}
            </select>
            <input value={time} onChange={(e) => (settime(e.target.value))} className={styles.item} type="time" placeholder="time" />
            <input value={date} onChange={(e) => { setdate(e.target.value) }} className={styles.item} type="date" placeholder="date" />
            <input value={id} onChange={(e) => { setid(e.target.value) }} className={styles.item} type="text" placeholder="id" />
            <input value={password} onChange={(e) => { setpassword(e.target.value) }} className={styles.item} type="text" placeholder="password" />
            <label style={{ backgroundColor:'gray', textAlign: 'center', margin:'10px'}} onClick={AddNew}>Add</label>
        </div>
        <div className={styles.heading}>
            Privious Events
        </div>
        <div>
            {
                (
                    () => {
                        if (gotlast) {
                            return events.reverse().map((event, i) => {
                                return (<div key={i} style={{ boxShadow: '0px 0px 10px gray', margin: '10px', maxWidth: '400px', padding: '10px' }}>
                                    <div>
                                        <div style={{ width: '100%', textAlign: 'right' }}>
                                            <MdEdit onClick={() => { editEvent(event.uid) }} style={{ margin: '10px' }}/>
                                            <MdDelete onClick={() => { deleteEvent(event.uid) }} style={{ margin: '10px' }}/></div>
                                    </div>
                                    <div>
                                        <table style={{width:'100%', margin:'10px'}}>
                                            <thead></thead>
                                            <tbody>
                                                <tr>
                                                    <td>Game</td>
                                                    <td>:</td>
                                                    <td>{event.game}</td>
                                                </tr>
                                                <tr>
                                                    <td>Type</td>
                                                    <td>:</td>
                                                    <td>{event.type}</td>
                                                </tr>
                                                <tr>
                                                    <td>Time</td>
                                                    <td>:</td>
                                                    <td>{event.time}</td>
                                                </tr>
                                                <tr>
                                                    <td>Date</td>
                                                    <td>:</td>
                                                    <td>{event.date}</td>
                                                </tr>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>:</td>
                                                    <td>{event.eventid}</td>
                                                </tr>
                                                <tr>
                                                    <td>password</td>
                                                    <td>:</td>
                                                    <td>{event.password}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
        
                                    
                                </div>);
                            })
                        } else {
                            return (<Loading />);
                        }
                    }
                )()
            }
        </div>
        <NotificationContainer />
    </div>);
}

export default AdminEvents;