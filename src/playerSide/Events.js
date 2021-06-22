import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import firebase from '../util/Firebase';
import OneEvent from '../components/Event';
import Loading from '../components/Loading';

function Events(props) {
    const [fetched, setfetched] = useState(false);
    const [loading, setloading] = useState(true);
    const [events, setevents] = useState([]);
    
    const [search, setSearch] = useState('');


    useEffect(() => {
        if (!fetched) {
            const todoref = firebase.database().ref('events');
            todoref.limitToLast(100).on('value', (snapshot) => {
                if (snapshot.exists()) {
                    let eet = [];
                    snapshot.forEach((element) => {
                        eet.push(element.val());
                    })
                    setevents(eet);
                }
                else {
                    console.log("event not found");
                }
            })
            setfetched(true);
            setloading(false);
        }
    }, [fetched, setfetched, setloading])

    return (
        <div>
            <Header />
            {
                (
                    () => {
                        if (loading) {
                            return (<Loading />);
                        } else {
                            return (<div>
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row'}}>
                                    <input type="search" placeholder="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} style={{ width:'100%', margin:'20px', padding:'20px' }}/>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {
                                        events.filter(e=>{
                                            return(
                                                (e.game && e.game.toLowerCase().includes(search.toLowerCase())) ||
                                                (e.type && e.type.toLowerCase().includes(search.toLowerCase())) || 
                                                (e.time && e.time.toLowerCase().includes(search.toLowerCase())) || 
                                                (e.date && e.date.toLowerCase().includes(search.toLowerCase()))
                                                )
                                        }).sort((a, b) => b.id - a.id).map((event, i) =>
                                            <OneEvent
                                                style={{ display: 'inline' }}
                                                game={event.game}
                                                type={event.type}
                                                time={event.time}
                                                date={event.date}
                                                key={i}
                                                uid={event.uid}
                                                open={event.open}
                                            />
                                        )
                                    }
                                </div>
                            </div>);
                        }
                    }
                )()
            }
        </div>
    );
}

export default Events;