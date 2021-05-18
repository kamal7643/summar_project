import React from 'react';
import styles from '../css/singleevent.module.css';



function OneEvent(props){
    return(
        <div className="hover-overlay hover-zoom hover-shadow ripple">
        <div className={styles.card}>
            <div className={styles.element}>Type : {props.type}</div>
            <div className={styles.element}>Time : {props.date}&nbsp;&nbsp;{props.time}</div>
            <div className={styles.element}>ID : {props.eventid}</div>
            <div className={styles.element}>Password : {props.password}</div>
        </div>
        </div>
    );
}


export default OneEvent;