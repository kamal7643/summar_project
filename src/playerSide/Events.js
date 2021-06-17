import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import firebase from '../util/Firebase';
import OneEvent from '../components/Event';
import Loading from '../components/Loading';

function Events(props) {
    const [fetched, setfetched] = useState(false);
    const [loading, setloading] = useState(true);
    const [events, setevents] = useState([]);


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
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {
                                        events.sort((a, b) => b.id - a.id).map((event, i) =>
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