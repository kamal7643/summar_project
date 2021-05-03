import React from 'react';
import styles from '../css/singlesuggestion.module.css';

function SingleSuggest(props) {
    return<div className={styles.card} >
        <div className={styles.title}>{props.title}</div>
        <div className={styles.content}>{props.content}</div>
    </div>
}

export default SingleSuggest;