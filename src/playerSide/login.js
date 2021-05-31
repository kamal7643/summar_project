import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { signin, getcurruser, signout } from '../util/cognito';
import { Form, Button } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router-dom';


function Login(props) {


    const [email, setemail] = useState("kamalswami0808@gmail.com");
    const [password, setpassword] = useState("test7643");
    const [user, setuser] = useState(null);
    const [err, seterr] = useState();
    const [once, setonce] = useState(false);
    const history = useHistory();


    // async function current(){
    //     getcurruser()
    //         .then((response) => {
    //             if(response){
    //                 setuser(response);
    //                 history.push(
    //                     {
    //                         pathname: "/profile", search:"id=" + response.uid
    //                     }
    //                 )
    //             }
    //         })
    // }

    // if(!once){
    //     current();
    //     setonce(true);
    // }


    async function logout(e) {
        e.preventDefault();
        signout()
            .then((res) => { setuser(res) })
    }

    async function handlesubmit(e) {
        e.preventDefault();
        signin(email, password, seterr)
            .then((response) => {
                if (response) {
                    history.push(
                        {
                            pathname: "/profile", search: "id=" + response.uid
                        }
                    )
                }
            })
    }

    useEffect(() => {
        if (err) {
            NotificationManager.error("ERROR", err, 3000);
            seterr("");
        }

    }, [user, err])


    return (<div style={{ widht: '100%', justifyContent: 'center' }}>
        <Header />
        <Form style={{ maxWidth: '400px', maxHeight: '400px', marginTop: '10%', padding: '10%', border: '2px', borderRadius: '5px', boxShadow: '0px 0px 15px black' }}>
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
        <Button onClick={logout}>logout</Button>
        {user}
        <NotificationContainer />
    </div>);
}

export default Login;
//16365K9cTCPrCoW2kQXDo0QJG0C2