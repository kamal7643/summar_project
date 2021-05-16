import React from 'react';
import Header from '../components/Header';
import Slides from '../components/Slides';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';

function LandingPage(props) {
    const history = useHistory();

    // settings localStorage for current session
    localStorage.setItem('name','Kamal Swami');
    localStorage.setItem('isAdmin','false');
    localStorage.setItem('id',1234567890);
    localStorage.setItem('email','kswami848@gmail.com');
    localStorage.setItem('username','kamal7643');
    localStorage.setItem('password','123');
    localStorage.setItem('playname','kamal7643');
    localStorage.setItem('matches',0);
    localStorage.setItem('win',0);
    localStorage.setItem('loss',0);
    localStorage.setItem('kills',0);
    localStorage.setItem('deaths',0);
    localStorage.setItem('KD',0);
    localStorage.setItem('points',0);

    function gotowatch(){
        history.push("/watch");
    }

    function gotosuggetion(){
        history.push("/suggestion");
    }

    localStorage.setItem("logged", false);
    localStorage.setItem("start", false);

    return<div>
        <Header/>
        <Slides/>
        <div>
            extra 
            <div onClick={() => { history.push("/events"); }} style={{ textDecoration: 'underline' }}>events</div>
            <div onClick={()=>{history.push("/login");}} style={{textDecoration:'underline'}}>login or signup</div>
            <br />
            <ul className="list-group">
                <li class="list-group-item" onClick={gotowatch}> watch here</li>
            </ul>
        </div>

        {//<embed style={{width: '100%', height: '200px', marginTop: "10%"}} autoPlay={true} src= {staticUrls.videoUrl}/>
        }
        <div id="about">About</div>
        <div id="rules">Rules</div>
        <div>
            <ul className="list-group">
                <li class="list-group-item" onClick={gotosuggetion}> watch here</li>
            </ul>
        </div>
        
    </div>
}

export default LandingPage;