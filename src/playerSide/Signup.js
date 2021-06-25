import React, { useState, useEffect } from 'react';
import { signup } from '../util/cognito';
import Header from '../components/Header';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router-dom';
import '../css/global.css';
import staticUrls from '../config/urls';
import Loading from '../components/Loading';
import 'bootstrap/dist/css/bootstrap.min.css';


function SignUp(props) {
    // const [user, setuser] = useState();
    const [name, setname] = useState("");
    const [error, seterror] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const history = useHistory();
    const [loading, setloading] = useState(false);


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


    const handlesubmit = () => {
        setloading(true);
        validate().then((res) => {
            if (res) {
                signup(email, password, name, seterror)
                    .then((res) => {
                        if (res) {
                            history.push("/profile?id=" + res.uid + "&state=profile");
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
                            return <div>
                                <section className="vh-100 gradient-custom">
                                    <div className="container py-5 h-100">
                                        <div className="row d-flex justify-content-center align-items-center h-100">
                                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                                <div className="card bg-primary text-white" style={{ borderRadius: '1rem' }}>
                                                    <div className="card-body p-5 text-center">

                                                        <div className="mb-md-5 mt-md-4 pb-5">

                                                            <h2 className="fw-bold mb-2 text-uppercase">Sign up</h2>
                                                            <p className="text-white-50 mb-5">Please enter your correct Information!</p>

                                                            <div className="form-outline form-white mb-4">
                                                                <input type="email" className="form-control form-control-lg" value={name} onChange={(e) => { setname(e.target.value) }} placeholder="Name" />
                                                            </div>

                                                            <div className="form-outline form-white mb-4">
                                                                <input type="email" className="form-control form-control-lg" value={email} onChange={(e) => { setemail(e.target.value) }} placeholder="Email Address" />
                                                            </div>

                                                            <div className="form-outline form-white mb-4">
                                                                <input type="password" className="form-control form-control-lg" value={password} onChange={(e) => { setpassword(e.target.value) }} placeholder="password" ></input>
                                                            </div>

                                                            <div className="form-outline form-white mb-4">
                                                                <input type="password" className="form-control form-control-lg" value={confirmpassword} onChange={(e) => { setconfirmpassword(e.target.value) }} placeholder="confimr password" />
                                                            </div>


                                                            <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handlesubmit}>Sign up</button>

                                                        </div>

                                                        <div>
                                                            <p className="mb-0">Already have an account? <span className="text-white-50 fw-bold" onClick={() => { history.push('/login') }}>Log in</span></p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
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