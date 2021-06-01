import React, { useState, useEffect } from 'react';
import { signup } from '../util/cognito';
import { Form, Button } from 'react-bootstrap';
import Header from '../components/Header';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router-dom';
import '../css/global.css';
import staticUrls from '../config/urls';
import Loading from '../components/Loading';


function SignUp(props) {
    // const [user, setuser] = useState();
    const [name, setname] = useState("");
    const [error, seterror] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const history = useHistory();
    const [loading, setloading] = useState(false);
    const [type, settype] = useState("password");
    const [checked, setchecked] = useState(false);


    async function validate() {

        //name validation
        if(name!==""){
            if(name.length<5){
                seterror("Name should be at least of 5 characters");
                return false;
            }else if(name.length>40){
                seterror("Name length is limited to 40 characters");
                return false;
            }
        }else{
            seterror("Name field is required");
            return false;
        }

        // email-addresses validation
        if(email!==""){
            if (!staticUrls.emailvalidation.test(email)) {
                seterror("Email Email Address is not valid");
                return false;
            }
        }else{
            seterror("Email field is required");
            return false;
        }

        if(password!==confirmpassword){
            seterror("Password does not match");
            return false;
        }
        
        return true;
    }

    const handlesubmit = () => {
        setloading(true);
        validate().then((res) => {
            if (res) {
                signup(email, password, name, seterror)
                    .then((res) => {
                        if (res) {
                            history.push({ pathname: "profile", search: "id=" + res.uid })
                        }
                    })
            }else{
                seterror("Please Enter valid inputs");
                setloading(false);
            }
        })
    }

    useEffect(() => {
        if (error !== "") {
            NotificationManager.error("ERROR", error, 3000);
            seterror("");
        }
    }, [error, seterror])
    return (
        <div style={{ widht: '100%' }}>
            <Header />
            {
                (
                    () => {
                        if (loading) {
                            return <div><Loading/></div>
                        } else {
                            return <div style={{ width: '100%', justifyContent: 'center', padding: "5%" }}>
                                <Form style={{ maxWidth: '400px', marginTop: '30px', padding: '3%', border: '2px', borderRadius: '5px', boxShadow: '0px 0px 15px black' }}>
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="test" value={name} onChange={(e) => { setname(e.target.value) }} placeholder="name" required/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" value={email} onChange={(e) => { setemail(e.target.value) }} placeholder="Email" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type={type} value={password} onChange={(e) => { setpassword(e.target.value) }} placeholder="Password" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" value={confirmpassword} onChange={(e) => { setconfirmpassword(e.target.value) }} placeholder="Confirm Password" />
                                    </Form.Group>
                                    <Form.Group>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Form.Control style={{ width: "20px", height: "20px" }} type="checkbox" checked={checked} onChange={
                                                (e) => {
                                                    setchecked(e.currentTarget.checked);
                                                    if (type === "password") {
                                                        settype("text");
                                                    } else {
                                                        settype("password");
                                                    }
                                                }} />
                                            <div>Show Password</div>
                                        </div>
                                    </Form.Group>
                                    <Form.Group style={{ textAlign: 'center' }}>
                                        <Button variant="primary" type="button" onClick={handlesubmit}>
                                            Sign-up
                                        </Button>
                                        <Button style={{marginLeft:'15%'}} onClick={() => { history.push("/login")}}>Log-in</Button>
                                    </Form.Group>
                                </Form>
                            </div>
                        }
                    }
                )()
            }

            <NotificationContainer />
        </div>
    );
}

export default SignUp;