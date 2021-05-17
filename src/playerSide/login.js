import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { signin, getcurruser, signout } from '../util/cognito';
import { Form, Button } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {useHistory} from 'react-router-dom';


function Login(props) {


    const [email, setemail] = useState("kamalswami0808@gmail.com");
    const [password, setpassword] = useState("test7643");
    const [user, setuser] = useState(null);
    const [err, seterr] = useState();
    const [once, setonce] = useState(false);
    const [count, setcount] = useState(0);
    const history = useHistory();


    async function current(){
        setuser(await getcurruser());
    }
    
    if(!once){
        current();
        setonce(true);
    }


    async function logout(e){
        e.preventDefault();
        signout()
        .then((res)=>{ setuser(res)})
    }

    async function handlesubmit (e){ 
        e.preventDefault();
        signin(email,password, seterr)
        .then((response)=>{setuser(response);})
        setemail("");
        setpassword("");
    }

    useEffect(() => {
        if(err){
            NotificationManager.error("ERROR", err, 3000);
            seterr("");
        }
    },[user, err])

    function incr(){
        setcount(count+1);
    }

    return (<div>
        <Header />
        {
            (
                ()=>{ if(user){
                    history.push("/profile?use="+user.email)
                }}
            )()
        }
        {count}<Button onClick={incr}>+</Button>
        {console.log(user)}
        <div>nothing</div>
        <Form style={{ maxWidth: '400px', border: '0.5px solid black', borderRadius:'5px', boxShadow:'0px 0px 15px solid black' }}>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) =>{setemail(e.target.value)}} placeholder="Email"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e)=>{setpassword(e.target.value)}}placeholder="Password"/>
            </Form.Group>
            <Form.Group style={{ textAlign: 'center' }}>
            <Button variant="primary" type="button" onClick={handlesubmit}>
                Login
            </Button>
            </Form.Group>
        </Form>
        <Button onClick={logout}>logout</Button>
        <NotificationContainer />
    </div>);
}

export default Login;
//16365K9cTCPrCoW2kQXDo0QJG0C2