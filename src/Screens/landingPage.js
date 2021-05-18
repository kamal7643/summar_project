import React from 'react';
import Header from '../components/Header';
import Slides from '../components/Slides';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';

function LandingPage(props) {
    const history = useHistory();

    function gotowatch(){
        history.push("/watch");
    }

    function gotosuggetion(){
        history.push("/suggestion");
    }

    localStorage.setItem("logged", false);
    localStorage.setItem("start", false);

    return <div >
        <Header/>
        <Slides/>
        <div>
            extra 
            <div onClick={() => { history.push("/events"); }} style={{ textDecoration: 'underline' }}>events</div>
            <div onClick={()=>{history.push("/signup");}} style={{textDecoration:'underline'}}>signup</div>
            <br />
            <ul className="list-group">
                <li className="list-group-item" onClick={gotowatch}> watch here</li>
            </ul>
        </div>

        <div id="about">About</div>
        <div id="rules">Rules</div>
        <div>
            <ul className="list-group">
                <li className="list-group-item" onClick={gotosuggetion}> suggest here</li>
            </ul>
        </div>
    </div>
}

export default LandingPage;