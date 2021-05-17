import React, { useState, useEffect } from 'react';
import {signup, phonesignup} from '../util/cognito';
import { Button } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function SignUp(props) {
    const [user, setuser] = useState();
    const [error, seterror] = useState("");
    const Add = () =>{ 
        signup('kamal0808@gmail.com','test7643', seterror)
        .then((res)=>{ setuser(res)})
    }
    const phoneAdd = () =>{ 
        // phonesignup(7023095311, seterror)
        // .then((res)=>{ setuser(res)})
    }

    useEffect(() => {
        if(error!==""){
            NotificationManager.error("ERROR", error, 3000);
            seterror("");
        }
    }, [error, seterror])
    return (
        <div>
            <Button onClick={Add}>add</Button>
            <Button onClick={phoneAdd}>phone-add</Button>
            {console.log(user)}
            <NotificationContainer />
        </div>
        );
}

export default SignUp;