import React from 'react';
import styles from '../css/singlesuggestion.module.css';
import Button from '../components/Button';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

function SingleSuggest(props) {

    function showMore(){
        confirmAlert({
            title: props.data.val().title,
            message: props.data.val().content,
            buttons:[
                {
                    label: 'continue'
                }
            ]
        });
    }

        
    return <div className="hover-overlay hover-zoom hover-shadow ripple">
        <div className={styles.card}>
            <div className={styles.title} onClick={showMore} >{props.data.val().title}</div>
            <div className={styles.content}>{props.data.val().content.substring(0, 50)+"...\n\n"}</div>
            {
                (
                    ()=>{
                        if(props.action){
                        return <div className={styles.defaultButton}>
                            <Button onClick={props.onbtnclick} passbtnonclick1={props.data} name={props.action}/>
                        </div>
                        }
                    }
                    )()
        }
        </div>
    </div>
}

export default SingleSuggest;