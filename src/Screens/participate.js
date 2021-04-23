import React, { useState, useEffect } from 'react';
import './css/participate.css';


function Participate() {
    const [log, setlog] = useState(true);
    const [signup, setsignup] = useState(false);
    const [profile, setprofile] = useState(false);
    const [user, setuser] = useState();
    const [users, setusers] = useState([]);
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newUserName, setNewUserName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPlayName, setNewPlayName] = useState("");
    const [newID, setNewID] = useState(0);
    const [hintText, setHintText] = useState("Log In");

    function gotosignup() {
        setsignup(true);
        setlog(false);
        setprofile(false);
        setHintText("Sign Up");
    }

    function gotologin() {
        setsignup(false);
        setlog(true);
        setprofile(false);
        setHintText("Log In");
    }

    function gotoprofile() {
        setsignup(false);
        setlog(false);
        setprofile(true);
    }

    function handleLogin() {
        users.map((player, i) => {
            if (player.username === username && player.password === password) {
                setuser(player);
                gotoprofile();
            }
            return <div></div>
        })
    }

    function getNewID() {
        users.map((player, i) => {
            if (i >= newID) {
                setNewID(i + 1);
            }
            return <div></div>
        })
    }

    function validateNewUser() {

    }

    function handleSignup() {
        if (newName !== "" &&
            newEmail !== "" &&
            newUserName !== "" &&
            newPassword !== "" &&
            newPlayName !== ""
        ) {
            getNewID();
            validateNewUser();
            fetch('http://localhost:3000/users', {
                method: 'POST',
                body: JSON.stringify({
                    id: newID,
                    name: newName,
                    email: newEmail,
                    username: newUserName,
                    password: newPassword,
                    playname: newPlayName,
                    matches: 0,
                    win: 0,
                    loss: 0,
                    kills: 0,
                    deaths: 0,
                    kd: 0,
                    points: 0
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then((response) => { return response.json() })
                .then((response) => { setuser(response); gotoprofile(); })
            return;
        }
        else {
            alert("fill the form!");
        }
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:3000/Users")
                .then((response) => { return response.json() })
                .then((response) => { setusers(response) })
        }, 2000);
    })

    return (
        <div className="container-body">
            {(
                () => {
                    if (log) {
                        return <div className="card">
                            <form className="login">
                                <label className="hint">{hintText}</label>
                                <input className="logininput" type="text" 
                                placeholder="Username" value={username} 
                                onChange={e => { setusername(e.target.value) }} />
                                <br />
                                <input className="logininput" type="password" 
                                placeholder="Password" value={password} 
                                onChange={e => { setpassword(e.target.value) }} />
                                <br />
                                <button type="button" className="loginbutton" 
                                onClick={handleLogin}>Login</button>
                            </form>
                            <button type="button" className="ChangeForm" 
                            onClick={gotosignup}>Signup</button>
                        </div>
                    } else if (signup) {
                        return <div className="card">
                            <form className="login">
                                <label className="hint">{hintText}</label>
                                <input className="logininput" type="text" 
                                placeholder="Name" value={newName} 
                                onChange={e => { setNewName(e.target.value) }} />
                                <br />
                                <input className="logininput" type="text" 
                                placeholder="Email" value={newEmail} 
                                onChange={e => { setNewEmail(e.target.value) }} />
                                <br />
                                <input className="logininput" type="text" 
                                placeholder="Cod Name" value={newPlayName} 
                                onChange={e => { setNewPlayName(e.target.value) }} />
                                <br />
                                <input className="logininput" type="text" 
                                placeholder="Username" value={newUserName} 
                                onChange={e => { setNewUserName(e.target.value) }} />
                                <br />
                                <input className="logininput" type="password" 
                                placeholder="Password" value={newPassword} 
                                onChange={e => { setNewPassword(e.target.value) }} />
                                <br />
                                <button type="button" className="loginbutton" 
                                onClick={handleSignup}>Sign Up</button>
                            </form>
                            <button type="button" className="ChangeForm" 
                            onClick={gotologin}>Login</button>
                        </div>
                    } else if (profile) {
                        return <div className="card">
                            {user.name}{                                                                                                user.id}
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