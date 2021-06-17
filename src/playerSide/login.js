import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { signin, getcurruser } from '../util/cognito';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';


function Login(props) {


    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [err, seterr] = useState();
    const [once, setonce] = useState(false);
    const [cursor, setcursor] = useState("default");
    const history = useHistory();


    async function current() {

    }

    if (!once) {
        current();
        setonce(true);
    }



    async function handlesubmit(e) {
        setcursor("wait");
        e.preventDefault();
        signin(email, password, seterr)
            .then((response) => {
                if (response) {
                    history.push("/profile?id=" + response.uid + "&state=profile");
                }
            })
        setcursor("default");
    }

    useEffect(() => {
        getcurruser()
            .then((response) => {
                if (response) {
                    history.push("/profile?id=" + response.uid + "&state=profile");
                }
            })
        if (err) {
            NotificationManager.error("ERROR", err, 3000);
            seterr("");
        }

    }, [err, history])


    return (<div style={{ width: '100%', cursor: cursor }}>
        <Header />
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{borderRadius:'1rem'}}>
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-5 mt-md-4 pb-5">

                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                    <div className="form-outline form-white mb-4">
                                        <input type="email" className="form-control form-control-lg" value={email} onChange={(e) => { setemail(e.target.value)}} placeholder="Email Address"/>
                                        <label className="form-label" htmlFor="typeEmailX">Email</label>
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <input type="password" className="form-control form-control-lg" value={password} onChange={(e) => { setpassword(e.target.value) }} placeholder="password"/>
                                        <label className="form-label" htmlFor="typePasswordX">Password</label>
                                    </div>

                                    <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                        <label className="text-white"><i className="fab fa-facebook-f fa-lg"><FaFacebookF/></i></label>
                                        <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2">login with twitter</i></a>
                                        <a href="#!" className="text-white"><i className="fab fa-google fa-lg">login with google</i></a>
                                    </div>

                                </div>

                                <div>
                                    <p className="mb-0">Don't have an account? <a href="/signup" className="text-white-50 fw-bold">Sign Up</a></p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {//<div style={{margin:'10%'}}>
            //     <Form style={{ width: '80%', maxWidth:"400px", minWidth: "300px", height:'400px', padding: '3%', border: '2px', borderRadius: '5px', boxShadow: '0px 0px 15px black' }}>
            //         <Form.Group>
            //             <Form.Label>Email</Form.Label>
            //             <Form.Control type="email" value={email} onChange={(e) => { setemail(e.target.value) }} placeholder="Email" />
            //         </Form.Group>
            //         <Form.Group>
            //             <Form.Label>Password</Form.Label>
            //             <Form.Control type="password" value={password} onChange={(e) => {setpassword(e.target.value) }} placeholder="Password" />
            //         </Form.Group>
            //         <Form.Group>
            //             <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
            //                 <span style={{width: '100%' }} onClick={handlesubmit}>Log-in</span>
            //                 <span style={{ width: '100%' }} onClick={() =>{ history.push('/signup')}}>Sign-up</span>
            //             </div>
            //         </Form.Group>
            //     </Form>
            // </div>
        }
        <NotificationContainer />
    </div>);
}

export default Login;