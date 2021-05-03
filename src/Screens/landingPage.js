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

    return<div>
        <Header/>
        <Slides/>
        <div>
            extra 
            <br />
            <label style={{ textShadow:' 2px 2px 20px black', fontSize:'20px', width:'100%', textAlign:'center', marginTop:'5%', marginBottom:'5%' , backgroundColor:'blue', padding:'5%'}} onClick={gotowatch}>watch here</label>
        </div>

        {//<embed style={{width: '100%', height: '200px', marginTop: "10%"}} autoPlay={true} src= {staticUrls.videoUrl}/>
        }
        <div id="about">About</div>
        <div id="rules">Rules</div>
        <div>
            <label style={{ textShadow: ' 2px 2px 20px black', fontSize: '20px', width: '100%', textAlign: 'center', marginTop: '5%', marginBottom: '5%', backgroundColor: 'blue', padding: '5%' }} onClick={gotosuggetion}>Suggest here</label>
        </div>
    </div>
}

export default LandingPage;