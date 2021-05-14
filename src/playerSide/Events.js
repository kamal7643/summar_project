import React, { useState, useEffect }from 'react';
import Header from '../components/Header';
import staticUrls from '../config/urls';
import OneEvent from '../components/Event';
import Loading from '../components/Loading';

function Events(props){
    const [fetched, setfetched] = useState(false);
    const [loading, setloading] = useState(true);
    const [events, setevents] = useState([]);
    const [size, setsize] = useState(0);

    function getbackend(){
        fetch(staticUrls.url + '/events')
        .then((response) => { return response.json()})
        .then((response) =>{
            setevents(response);
            try{
                events.map((event, i)=>{
                setsize(size+1);
                return<div key={i}></div>
            })}
            catch(e){
                console.log(e);
            }finally{
                setloading(false);
            }
        })
    }

    useEffect(() => {
        if(!fetched){
            getbackend();
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