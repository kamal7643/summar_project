import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';


function Error(props) {
    console.log(props.message);
    return(
        <div>{
            NotificationManager.error('Error', "something")
        }
            <NotificationContainer />
        </div>
    );
}

export default Error;