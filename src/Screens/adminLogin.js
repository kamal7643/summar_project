import React, { useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './css/adminlogin.css';
import logo from './imgs/admin.jpg';

function AdminLogin() {
    const history = useHistory();
    const [admins, setadmins] = useState([]);
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");


    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:3000/Admin")
                .then(response => { return response.json(); })
                .then(response => { setadmins(response); });
        }, 200);
    })

    function handleLogin(){
        if(admins){
            admins.map((admin, i) => {
                if (admin.username === username && admin.password === password) {
                    console.log("logged in");
                    history.push('/admin')
                }
                return <div></div>
            })
        }
        else{
            alert("Failed to fetch from server")
        }
    }

    return (
        <div className="admin-login">
            <img className="admin-login-bg" src={logo} alt="logo" />
            <form className="login">
                <label className="hint">Admin Login</label>
                <input className="logininput" type="text" placeholder="Username" value={username} onChange={e=>{setusername(e.target.value)}}/>
                <br />
                <input className="logininput" type="password" placeholder="Password" value={password} onChange={e=>{setpassword(e.target.value)}}/>
                <br />
                <button type="button" className="loginbutton" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
}

export default AdminLogin;