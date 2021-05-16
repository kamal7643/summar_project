import React, { useState, useEffect }from 'react';
import Header from '../components/Header';
import firebase from '../util/Firebase';
import OneEvent from '../components/Event';
import Loading from '../components/Loading';

function Events(props){
    const [fetched, setfetched] = useState(false);
    const [loading, setloading] = useState(true);
    const [events, setevents] = useState([]);


    useEffect(() => {
        if(!fetched){
            const todoref = firebase.database().ref('events');
            todoref.on('value', (snapshot) => {
                if(snapshot.exists()){
                    let eet = [];
                    snapshot.forEach((element) =>{
                        eet.push(element.val());
                    })
                    setevents(eet);
                }
                else{
                    console.log("event not found");
                }
            })
            setfetched(true);
            setloading(false);
        }
    }, [fetched, setfetched, setloading])

    return(
        <div>
            <Header/>
            {
                (
                    () =>{
                        if(loading){
                            return(<Loading />);
                        }else{
                                return events.sort((a, b) => b.id - a.id).map((event, i)=>
                                    <OneEvent 
                                        type={event.type}
                                        time={event.time}
                                        date={event.date}
                                        eventid={event.eventid}
                                        password={event.password}
                                        key={i}
                                    />
                                )
                        }
                    }
                )()
            }
        </div>
    );
}

export default Events;