import React from 'react';
import firebase from '../../util/Firebase';
import { useState, useEffect } from 'react';

function EventSTATE(props) {
    const [events, setevents] = useState([]);
    const ref = firebase.database().ref('users/' + props.uid + '/events');
    const [fetched, setfetched] = useState(false);


    useEffect(() => {
        if (!fetched) {
            ref.on('value', (snapshot) => {
                var temp=[];
                snapshot.forEach((snap) => {
                    // console.log(snap.val())
                    const newref = firebase.database().ref('events/' + snap.key);
                    newref.on('value', (nsnap) => {
                        temp.push(nsnap.val());
                        setevents(temp);
                    })
                })
                
            })
            // setevents(temp);
            setfetched(true);
        }
    }, [fetched, setfetched, ref])

    return (
        <div style={{marginTop:'50px'}}>
            {
                events.sort((a, b) => b.id - a.id).map((event, i) =>
                    <div key={i} style={{ boxShadow: '0px 0px 10px gray', margin: '10px', maxWidth: '400px', padding:'10px' }}>
                        <div>
                            <table style={{ width: '100%', margin: '10px' }}>
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


                    </div>
                )
            }
            {
                (
                    ()=>{ 
                        if(events.length===0){
                            return(
                                <div>
                                    <ul>
                                        <li>Go to events</li>
                                        <li>search for best choice</li>
                                        <li>click join</li>
                                    </ul>
                                </div>
                            );
                        }
                    }
                )()
            }
        </div>
    )
}

export default EventSTATE;