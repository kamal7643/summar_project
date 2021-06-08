import React, { Fragment } from 'react';
import styles from '../css/singleevent.module.css';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { useHistory } from 'react-router-dom';
import { getcurruser } from '../util/cognito';
import { confirmAlert } from 'react-confirm-alert';


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
        <div className={styles.card}>
            <MDBTable hover responsive >
                <MDBTableHead>
                
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <th>Type</th>
                        <td>{props.type}</td>
                    </tr>
                    <tr>
                        <th>Time</th>
                        <td>{props.time || '00:00'} on {props.date || '00-00-0000'}</td>
                    </tr>
                    <tr>
                        <th>Action</th>
                        <td><Fragment ><button onClick={join} className={styles.joinbutton} style={{ color: (props.open && 'white') || ('#4CAF50'), boxShadow: props.open && '0px 0px 20px rebeccapurple' }}>join</button></Fragment></td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
        </div>
    );
}


export default OneEvent;