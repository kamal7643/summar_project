import React, { useState, useEffect } from 'react';
import {signup} from '../util/cognito';
import { Form, Button } from 'react-bootstrap';
import Header from '../components/Header';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router-dom';


function SignUp(props) {
    // const [user, setuser] = useState();
    const [error, seterror] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const history = useHistory();
    const [loading, setloading] = useState(false);

    const handlesubmit = () =>{ 
        setloading(true);
        signup(email, password, seterror)
        .then((res)=>{ 
            if(res){
                history.push({pathname:"profile",search:"id="+res.uid})
            }
        })
        setloading(false);
    }

    useEffect(() => {
        if(error!==""){
            NotificationManager.error("ERROR", error, 3000);
            seterror("");
        }
    }, [error, seterror])
    return (
        <div>
            <Header />
            {
                (
                    ()=>{ 
                        if(loading){
                            return<div>wait</div>
                        }
                    }
                )()
            }
            <Form style={{ maxWidth: '400px', marginTop:'100px', border: '0.5px solid black', borderRadius: '5px', boxShadow: '0px 0px 15px solid black' }}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => { setemail(e.target.value) }} placeholder="Email" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} placeholder="Password" />
                </Form.Group>
                <Form.Group style={{ textAlign: 'center' }}>
                    <Button variant="primary" type="button" onClick={handlesubmit}>
                        Login
            </Button>
                </Form.Group>
            </Form>
            <NotificationContainer />
        </div>
        );
}

export default SignUp;