import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import './css/ranks.css';
import logo from './imgs/ranks-bg.jpg';


function compare(a, b) {
    return parseInt(b.points)-parseInt(a.points);
}


function Ranks() {
    const history = useHistory();
    const [users, setusers] = useState([]);
    const [loaded, setloaded] = useState(false);

    function gotoprofile(e){
        history.push({pathname:'/participants',state:{e}});
    }
    
    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:3000/Users")
            .then((response) => { return response.json() })
            .then((resp) => {
                setloaded(true);
                setusers(resp);
            });
        }, 200);
        
    });

    return (
        <div className="ranks-body">
            {(() => {
                if (loaded) {
                    return <div>
                        <img className="ranks-bg" src={logo} alt="log"/>
                        <table className="table-ranks">
                            <thead className="thead-ranks">
                                <tr className="tr-ranks" >
                                    <th className="th-ranks">
                                        Rank
                                    </th>
                                    <th className="th-ranks">
                                        Name
                                    </th>
                                    <th className="th-ranks">
                                        Matchs
                                    </th>
                                    <th className="th-ranks">
                                        Win
                                    </th>
                                    <th className="th-ranks">
                                        Loss
                                    </th>
                                    <th className="th-ranks">
                                        Kills
                                    </th>
                                    <th className="th-ranks">
                                        Deaths
                                    </th>
                                    <th className="th-ranks">
                                        KD
                                    </th>
                                    <th className="th-ranks">
                                        Points
                                    </th>
                                </tr>
                            </thead>
                            
                            {
                                users.sort(compare).map((user,i)=>(
                                    <tr className="tr-ranks" key={i}>
                                        <td className="td-ranks">{i+1}</td>
                                        <td className="td-ranks">
                                            <label onClick={()=>gotoprofile(user)}>{user.playname}</label>
                                        </td>
                                        <td className="td-ranks">{user.matches}</td>
                                        <td className="td-ranks">{user.win}</td>
                                        <td className="td-ranks">{user.loss}</td>
                                        <td className="td-ranks">{user.kills}</td>
                                        <td className="td-ranks">{user.deaths}</td>
                                        <td className="td-ranks">{user.kd}</td>
                                        <td className="td-ranks">{user.points}</td>
                                    </tr>
                                ))
                            }
                            
                        </table>
                    </div>
                } else {
                    return <div className="loading">loading...</div>
                }
            }
            )()}
        </div>
    );
}

export default Ranks;