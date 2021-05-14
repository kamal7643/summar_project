import React from 'react';
import styles from '../css/button.module.css';


function Button(props) {
    return(
        <button width={props.width} height={props.height}onClick={() => { props.onClick(props.passbtnonclick1)}} className={styles.defaultButton}>{props.name}</button>
    );
}


export default Button;