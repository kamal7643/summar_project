import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { signin, getcurruser } from '../util/cognito';
import { Form } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router-dom';


function Login(props) {


    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [err, seterr] = useState();
    const [once, setonce] = useState(false);
    const [cursor, setcursor] = useState("default");
    const history = useHistory();


    async function current(){
        
    }

    if(!once){
        current();
        setonce(true);
    }



    async function handlesubmit(e) {
        setcursor("wait");
        e.preventDefault();
        signin(email, password, seterr)
            .then((response) => {
                if (response) {
                    history.push(
                        {
                            pathname: "/profile", search: "id=" + response.uid
                        }
                    );
                }  
            })
        setcursor("default");
    }

    useEffect(() => {
        getcurruser()
            .then((response) => {
                if (response) {
                    history.push(
                        {
                            pathname: "/profile", search: "id=" + response.uid
                        }
                    )
                }
            })
        if (err) {
            NotificationManager.error("ERROR", err, 3000);
            seterr("");
        }

    }, [err, history])


    return(<div style={{width: '100%', cursor:cursor}}>
            <Header />
            <div style={{margin:'10%'}}>
                <Form style={{ width: '80%', maxWidth:"400px", minWidth: "300px", height:'400px', padding: '3%', border: '2px', borderRadius: '5px', boxShadow: '0px 0px 15px black' }}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => { setemail(e.target.value) }} placeholder="Email" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => {setpassword(e.target.value) }} placeholder="Password" />
                    </Form.Group>
                    <Form.Group>
                        <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
                            <span style={{width: '100%' }} onClick={handlesubmit}>Log-in</span>
                            <span style={{ width: '100%' }} onClick={() =>{ history.push('/signup')}}>Sign-up</span>
                        </div>
                    </Form.Group>
                </Form>
            </div>
            <NotificationContainer />
        </div>);
}

export default Login;
//16365K9cTCPrCoW2kQXDo0QJG0C2