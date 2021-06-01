import React from 'react';
import Header from '../components/Header';
import Slides from '../components/Slides';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';

function LandingPage(props) {
    const history = useHistory();

    const spsl ={
        color:"blue",
        fontSize:"20px",
        textAlign:"left"
    };

    function gotowatch(){
        // history.push("/watch");
        alert("sorry");
    }

    function gotosuggetion(){
        history.push("/suggestion");
    }

    

    return <div >
        <Header/>
        <Slides/>
        <div>
            soon...
            <ul className="list-group" style={{display:'flex',flexDirection:'column', justifyContent: 'center'}}>
                <li className="list-group-item" onClick={() => { history.push("/events"); }} style={spsl}> events &#x2192;</li>
                <li className="list-group-item" onClick={() => { history.push("/signup"); }} style={spsl}> signup &#x2192;</li>
                <li className="list-group-item" onClick={gotowatch} style={spsl}> watch &#x2300;</li>
                <li className="list-group-item" onClick={gotosuggetion} style={spsl}> suggest &#x2192;</li>
            </ul>
        </div>

        <div id="about">About</div>
        <div id="rules">Rules</div>
        <svg width="200" height="200" onClick={() =>{alert("Thanks")}}>
            <line x1="10" y1="10" x2="10" y2="100" style={{stroke:"#006600", markerEnd: "url(#markerArrow)"}} />
            <line x1="10" y1="50" x2="70" y2="10" style={{ stroke: "#006600", markerEnd: "url(#markerArrow)" }} />
            <line x1="10" y1="50" x2="70" y2="100" style={{ stroke: "#006600", markerEnd: "url(#markerArrow)" }} />
        </svg>
    </div>
}

export default LandingPage;

//error symbol &#x2300;