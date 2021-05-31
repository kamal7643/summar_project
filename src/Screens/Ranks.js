import React,{ useState, useEffect} from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import styles from '../css/ranks.module.css';
import Table from 'react-bootstrap/Table'
import {useHistory} from 'react-router-dom';
import firebase from '../util/Firebase';
import { NotificationContainer, NotificationManager } from 'react-notifications';


function Ranks(props) {

    const history = useHistory();
    const [players, setplayers] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(null);
    const [one, setone] = useState(false);
    const ref = firebase.database().ref('users');

    function once(){    
        ref.on('value', (snapshot) => {
            var ppls = [];
            snapshot.forEach((element) => {
                    ppls.push(element.child("profile").val());  
            })
            setplayers(ppls);
        })
        setloading(true);
    }
    
    if(!one){
        once();
        setone(true);
    }


    useEffect(() => {
        
        if (error) {
            NotificationManager.error("ERROR", error, 3000);
            seterror("");
        }
        
    },[players, error])
    return (
        <div>
            <Header/>
            {(
                ()=>{
                    if(loading){
                        return<div>
                            <div>
                                developers knows
                            </div>
                            <Table striped bordered hover variant="primary" size="sm">
                                <thead>
                                    <tr>
                                        <th width="100">Playname</th>
                                        <th width="100">Points</th>
                                        <th width="100">matches</th>
                                        <th width="100">Wins</th>
                                        <th width="100">Kills</th>
                                        <th width="100">KD</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {
                                                players.sort((a,b)=>b.points-a.points).map((player, i) => {
                                                    if(i<100){
                                                        return(
                                                            <tr key={i}>
                                                                <td onClick={() =>{history.push({
                                                                    pathname:'/profileWall',
                                                                    search:'userid='+player.uid,
                                                                    data: player
                                                                })
                                                                }} style={{ textDecoration: 'underline' }}>{player.playname}</td>
                                                                <td>{player.points}</td>
                                                                <td>{player.matches}</td>
                                                                <td>{player.win}</td>
                                                                <td>{player.kills}</td>
                                                                <td>{player.kd}</td>
                                                            </tr>
                                                        );
                                                    }
                                                    return <div></div>
                                                    })
                                        }
                                </tbody>
                            </Table>
                        </div>
                    }else{
                        return<div  className={styles.loading}>
                            <Loading />
                        </div>
                    }
                }
            )()}
            <NotificationContainer />
        </div>
    );
}

export default Ranks;