import React,{ useState, useEffect } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import styles from '../css/adminevent.module.css';
import Loading from '../components/Loading';
import staticUrls from '../config/urls';
import OneEvent from '../components/Event';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


function AdminEvents(props) {
    const options = [
        {
            label: "TDM",
            value: "TDM",
        },
        {
            label: "Mango",
            value: "mango",
        },
        {
            label: "Banana",
            value: "banana",
        },
        {
            label: "Pineapple",
            value: "pineapple",
        },
    ];

    const [type, settype] = useState("");
    const [time, settime] = useState("");
    const [date, setdate] = useState("");
    const [id, setid] = useState("");
    const [password, setpassword] = useState("");
    const [gotlast, setgotlist] = useState(false);
    const [events, setevents] = useState([]);
    const [ID, setID] = useState(0);

    function getData(){
        fetch(staticUrls.url + '/events')
        .then((response) => { return response.json()})
        .then((response)=>{ 
            setevents(response);
            if(response.length !== 0){
                setID(response[0].id+1);
            }
            else{
                setID(9988776655);
            }

        })
    }


    function AddNew(){
        if(type==="" || time === "" || date === ""){
            confirmAlert({
                title:"ERROR",
                message:"please fill all fields",
                buttons: [
                    {
                        label: 'continue'
                    }
                ],
                closeOnClickOutside: false
            })
        }else{
            getData();
            try{
                fetch(staticUrls.url + '/events', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        id: ID,
                        type: type,
                        time: time,
                        date: date,
                        eventid: id,
                        password: password
                    })
                }
                ).then((response) => { return response.json() })
                    .then((res) => {
                        NotificationManager.success('Event created', 'Added');
                        getData();
                        settype("");
                        settime("");
                        setdate("");
                        setid("");
                        setpassword("");
                    })
            }
            catch(e){
                console.log(e);
            }
            
        }
    }

    function finalDeleteEvent(e){
        fetch(staticUrls.url + '/events/' + e, {
            method: 'DELETE'
        }).then((response) => { return response.json() })
            .then((res) => {
                getData();
                NotificationManager.success('Event delete successfull', 'Deleted');
            })
    }
    
    function deleteEvent(e){
        try{
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
        catch(e){
            console.log(e);
        }
             
    }

    function editEvent(e){
        console.log(e);
        getData();
    }

    useEffect(() => {
        if(!gotlast){
            getData();
            setgotlist(true);
        }
    },[setgotlist, gotlast])

    return (<div>
        <Header />
        <div className={styles.heading}>Add New Event</div>
        <div className={styles.enter}>
            <select className={styles.item} value={type} onChange={(e) => { settype(e.target.value) }}>
                <option value={""}>Select one</option>
                {options.map((option) => (
                    <option value={option.value} key={option.value}>{option.label}</option>
                ))}
            </select>
            <input value={time} onChange={(e) =>(settime(e.target.value))}className={styles.item} type="time" placeholder="time" />
            <input value={date} onChange={(e) =>{setdate(e.target.value)}}className={styles.item} type="date" placeholder="date" />
            <input value={id} onChange={(e) =>{setid(e.target.value)}}className={styles.item} type="text" placeholder="id" />
            <input value={password} onChange={(e) =>{setpassword(e.target.value)}} className={styles.item} type="text" placeholder="password" />
            <Button onClick={AddNew} className={styles.item} name=" Add " />
        </div>
        <div className={styles.heading}>
                    Privious Events
        </div>
        <div>
            {
                (
                    ()=>{
                        if(gotlast){
                            return events.sort((a, b) => b.id- a.id).map((event, i)=>{
                                return(<div key={i}><OneEvent 
                                type={event.type}
                                time={event.time}
                                date={event.date}
                                eventid={event.eventid}
                                password={event.password}
                                />
                                <div  className={styles.action}>
                                        <Button name="edit" onClick={editEvent} passbtnonclick1={event.id}/>
                                        <Button name="delete" onClick={deleteEvent} passbtnonclick1={event.id}/>
                                </div>
                                </div>);
                            })
                        }else{
                            return(<Loading />);
                        }
                    }
                )()
            }
        </div>
        <NotificationContainer/>
    </div>);
}

export default AdminEvents;