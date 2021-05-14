import React,{ useState, useEffect} from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import styles from '../css/ranks.module.css';
import staticUrls from '../config/urls';
import Table from 'react-bootstrap/Table'
import {useHistory} from 'react-router-dom';


function Ranks(props) {

    const history = useHistory();
    const [players, setplayers] = useState([]);
    const [loading, setloading] = useState(false);


    

    useEffect(() => {
        setTimeout(() => {
            if (players.length === 0) {
                fetch(staticUrls.url + "/players")
                    .then((response) => { return response.json() })
                    .then((response) => { setplayers(response) })
                setloading(true);
            }
        },1000);
        
        
    },[setloading, players, setplayers])
    if(localStorage.getItem('start')===false){
        history.push('/')
    }
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
                                        <th width="170">Playname</th>
                                        <th width="170">Points</th>
                                        <th width="170">matches</th>
                                        <th width="170">Wins</th>
                                        <th width="170">Kills</th>
                                        <th width="170">KD</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {
                                                players.sort((a,b)=>b.points-a.points).map((player, i) => {
                                                    if(i<100){
                                                        return(
                                                            <tr key={i}>
                                                                <td onClick={() =>{history.push({
                                                                    pathname:'/profileWall?userid='+player.id,
                                                                    data: player
                                                                })
                                                                }} style={{ textDecoration: 'underline' }}>{player.playname}</td>
                                                                <td>{player.points}</td>
                                                                <td>{player.matches}</td>
                                                                <td>{player.win}</td>
                                                                <td>{player.kills}</td>
                                                                <td>{player.KD}</td>
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
        </div>
    );
}

export default Ranks;