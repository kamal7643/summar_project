import React from 'react';
import styles from '../css/singlesuggestion.module.css';
import Button from '../components/Button';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

function SingleSuggest(props) {

    function showMore(){
        confirmAlert({
            title:props.title,
            message:props.content,
            buttons:[
                {
                    label: 'continue'
                }
            ]
        });
    }

        
    return<div className={styles.card} onClick={showMore} >
        <div className={styles.title}>{props.title}</div>
        <div className={styles.content}>{props.content.substring(0, 50)+"...\n\n"}</div>
        {
            (
                ()=>{
                    if(props.action){
                    return <div className={styles.defaultButton}>
                        <Button onClick={props.onbtnclick} passbtnonclick1={props.id} name={props.action}/>
                    </div>
                    }
                }
                )()
    }
    </div>
}

export default SingleSuggest;