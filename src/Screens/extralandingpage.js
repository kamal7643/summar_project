import React from 'react';
import './css/landingpagebody.css';
import logo from './imgs/extra-home-bg.jpg';
function ExtraLandingPage(){
    
    return(
        <div className="landingPage-body">
            <img className="bg-pic" src={logo} alt="logo"/>
            <a className="to-admin" href="/admin-login">Admin</a>
        </div>
    );
}

export default ExtraLandingPage;