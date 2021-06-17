import React from 'react';
import { useHistory } from 'react-router-dom';
import { getcurruser } from '../util/cognito';
import { confirmAlert } from 'react-confirm-alert';
import 'bootstrap/dist/css/bootstrap.min.css';


function OneEvent(props){
    const history = useHistory();


    function join(){
        getcurruser().then((user)=>{
            if(user){
                if(props.open){history.push('profile?id='+user.uid+'&join='+props.uid+'&state=events')}
            }
            else{
                confirmAlert({
                    title: 'You are not logged in',
                    message: 'please login',
                    buttons: [{
                        label: 'login',
                        onClick: () => history.push("/login")
                    }]
                })
                history.push("/login");
            }
        })
    }

    

    return(
        <div>
            <div className="card" style={{width:'200px', height:'150px', margin:'20px', fontSize:'12px'}}>
                <div className="card-body">
                    <div className="card-text">
                        <table style={{width:'100%'}}>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <th>Game</th>
                                    <td>{props.game}</td>
                                </tr>
                                <tr>
                                    <th>Type</th>
                                    <td>{props.type}</td>
                                </tr>
                                <tr>
                                    <th>Time</th>
                                    <td>{props.time || '00:00'} on {props.date || '00-00-0000'}</td>
                                </tr>
                                {props.eventid && <tr>
                                    <th>Room id</th>
                                    <td>{props.eventid }</td>
                                </tr>}
                                {props.password && <tr>
                                    <th>Password</th>
                                    <td>{props.password}</td>
                                </tr>}
                            </tbody>
                        </table>
                    </div>
                    {!props.eventid && props.open && <span className="btn btn-primary" onClick={join}>join</span>}
                </div>
            </div>
            
        </div>
    );
}


export default OneEvent;