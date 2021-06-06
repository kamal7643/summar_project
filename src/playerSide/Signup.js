import React, { useState, useEffect } from 'react';
import { signup } from '../util/cognito';
import { Form } from 'react-bootstrap';
import Header from '../components/Header';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router-dom';
import '../css/global.css';
import staticUrls from '../config/urls';
import Loading from '../components/Loading';
import { FaGoogle } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';


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
        if (name !== "") {
            if (name.length < 5) {
                seterror("Name should be at least of 5 characters");
                return false;
            } else if (name.length > 40) {
                seterror("Name length is limited to 40 characters");
                return false;
            }
        } else {
            seterror("Name field is required");
            return false;
        }

        // email-addresses validation
        if (email !== "") {
            if (!staticUrls.emailvalidation.test(email)) {
                seterror("Email Email Address is not valid");
                return false;
            }
        } else {
            seterror("Email field is required");
            return false;
        }

        if (password !== confirmpassword) {
            seterror("Password does not match");
            return false;
        }

        return true;
    }

    function googlelogin(){
        // var provider = new firebase.auth.GoogleAuthProvider();
        // firebase.auth().signUpWithPopup(provider).then(function (result) {
        //     // This gives you a Google Access Token.
        //     var token = result.credential.accessToken;
        //     console.log(token);
        //     // The signed-in user info.
        //     var user = result.user;
        //     console.log(user);
        // });
        confirmAlert({
            title:'sorry',
            message:'sorry',
            buttons:[{
                label:'continue'
            }]
        })
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
            } else {
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
                            return <div><Loading /></div>
                        } else {
                            return <div style={{ margin:'10%' }}>
                                <Form style={{ width: '80%', maxWidth: "400px", minWidth: "300px", padding: '3%', border: '2px', borderRadius: '5px', boxShadow: '0px 0px 15px black' }}>
                                        <Form.Group>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="test" value={name} onChange={(e) => { setname(e.target.value) }} placeholder="name" required />
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
                                            <div style={{display: 'flex', flexDirection: 'row' }}>
                                                <span style={{width: '100%' }} onClick={handlesubmit}>Sign-up</span>
                                                <span style={{ width: '100%' }} onClick={() => { history.push("/login") }}>Log-in</span>
                                                <FaGoogle style={{ width: '100%', marginTop:'10px' }} onClick={googlelogin} />
                                            </div>
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