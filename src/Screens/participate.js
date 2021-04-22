import React, { useState } from 'react';
import './css/participate.css';


function Participate() {
    const [log, setlog] = useState(true);
    const [signup, setsignup] = useState(false);
    const [profile, setprofile] = useState(false);
    const [user, setuser] = useState(null);
    const [username, setusername] = useState(null);
    const [password, setpassword] = useState(null);

    function gotosignup() {
        setsignup(true);
        setlog(false);
        setprofile(false);
    }

    function gotologin() {
        setsignup(false);
        setlog(true);
        setprofile(false);
    }

    function gotoprofile() {
        setsignup(false);
        setlog(false);
        setprofile(true);
    }

    function handleLogin(){
        
    }

    return (
        <div className="container-body">
            {(
                () => {
                    if (log) {
                        return <div className="card">
                            <form className="login">
                                <input className="logininput" type="text" placeholder="Username" value={username} onChange={e => { setusername(e.target.value) }} />
                                <br />
                                <input className="logininput" type="password" placeholder="Password" value={password} onChange={e => { setpassword(e.target.value) }} />
                                <br />
                                <button type="button" className="loginbutton" onClick={handleLogin}>Login</button>
                            </form>
                        </div>
                    } else if (signup) {
                        return <div className="card">
                            signup
                        </div>
                    } else if (profile) {
                        return <div className="card">
                            logged in
                            </div>
                    }
                }
            )()}
            <div className="container-extra">

            </div>
        </div>
    );
}

export default Participate;