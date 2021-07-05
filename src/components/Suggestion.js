import React from 'react';
import styles from '../css/singlesuggestion.module.css';
import { Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useHistory } from 'react-router-dom';
import LikesSuggestion from '../components/LikesSuggestion';

function SingleSuggest(props) {

    const history = useHistory();

    function gotoprofileview() {
        if (props.data.val().uid) {
            history.push({
                pathname: "/profilewall",
                search: 'userid=' + props.data.val().uid
            })
        }
    }

    function showMore() {
        confirmAlert({
            title: props.data.val().title,
            message: props.data.val().content,
            buttons: [
                {
                    label: 'continue'
                }
            ]
        });
    }

    return <div className="hover-overlay hover-zoom hover-shadow ripple">
        <div className={styles.card}>
            <div className={styles.title}  >
                <span style={{width: '100%', overflow:"hidden" }} onClick={showMore}>{props.data.val().title}</span>
                <div><LikesSuggestion uid={props.data.val().id} /></div>
            </div>
            <div className={styles.content}>{props.data.val().content && props.data.val().content.substring(0, 50) + "...\n\n"}</div>
            <span style={{ marginLeft: '10px', fontSize: '10px' }} onClick={gotoprofileview}>By : <b>{props.data.val().name}</b></span>
            <div
                style={{width:'100%',
                    textAlign:'right'}}
            >
                
            </div>
            {
                (
                    () => {
                        if (props.action) {
                            return <div className={styles.defaultButton}>
                                <Button  onClick={()=>{props.onbtnclick(props.data.val().id)}} >remove</Button>
                            </div>
                        }
                    }
                )()
            }
        </div>
    </div>
}

export default SingleSuggest;