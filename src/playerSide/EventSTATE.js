import firebase from '../util/Firebase';
import {useState, useEffect} from 'react';
import OneEvent from '../components/Event';
import Loading from '../components/Loading';

function EventSTATE(props) {
    const [events, setevents] = useState();
    const ref = firebase.database().ref('users/' +props.uid+'/events');
    const [fetched, setfetched] = useState(false);


    useEffect(() => {
        if(!fetched){
            var temp = [];
            ref.on('value', (snapshot)=>{
                snapshot.forEach((snap)=>{
                    const newref = firebase.database().ref('events/'+snap.val().uid);
                    newref.on('value', (nsnap)=>{
                        const event = nsnap.val();
                        temp.push({
                            type: event.type,
                            time: event.time,
                            date: event.date,
                            eventid: event.eventid,
                            password: event.password,
                            uid: event.uid,
                            open: event.open
                        });
                    })
                    })
                    
            })
            setevents(temp);
            setfetched(true);
        }
    },[fetched, setfetched, ref])


    if(events){
        return(
        <div>
        {
                events.sort((a, b) => b.id - a.id).map((event, i) =>
                    <OneEvent
                        type={event.type}
                        time={event.time}
                        date={event.date}
                        eventid={event.eventid}
                        password={event.password}
                        key={i}
                        uid={event.uid}
                        open={event.open}
                    />
                )
        }
        </div>
    );
    }
    else{
        return(
            <div><Loading/></div>
        );
    }
}

export default EventSTATE;