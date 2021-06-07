import React from 'react';
import Header from '../components/Header';
import Slides from '../components/Slides';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';
import Footer from '../components/Footer';


function LandingPage(props) {
    const history = useHistory();


    return <div style={{ backgroundColor: '#550080', color: '#00FFFF'}} >
        <Header/>
        <Slides/>
        <div>
            <div onClick={() => {history.push('/events')}} style={{display: 'flex', flexDirection: 'column', border: '1px solid black', borderRadius:'20px',paddingLeft:'30px',paddingRight:'30px', height:'100px', maxWidth:'400px',margin:'20px', boxShadow:'0px 0px 10px black'}}>
                <span style={{marginTop:'10px'}}>Join events</span>
                <span style={{textAlign:'right'}}>&#x2192;</span>
            </div>
            <div onClick={() => { history.push('/signup') }} style={{ display: 'flex', flexDirection: 'column', border: '1px solid black', borderRadius: '20px', paddingLeft: '30px', paddingRight: '30px', height: '100px', maxWidth: '400px', margin: '20px', boxShadow: '0px 0px 10px black' }}>
                <span style={{ marginTop: '10px' }}>Make an account</span>
                <span style={{ textAlign: 'right' }}>&#x2192;</span>
            </div>
            <div onClick={() => { history.push('/watch') }} style={{ display: 'flex', flexDirection: 'column', border: '1px solid black', borderRadius: '20px', paddingLeft: '30px', paddingRight: '30px', height: '100px', maxWidth: '400px', margin: '20px', boxShadow: '0px 0px 10px black' }}>
                <span style={{ marginTop: '10px' }}>Watch videos</span>
                <span style={{ textAlign: 'right' }}>&#x2192;</span>
            </div>
            <div onClick={() => { history.push('/suggestion') }} style={{ display: 'flex', flexDirection: 'column', border: '1px solid black', borderRadius: '20px', paddingLeft: '30px', paddingRight: '30px', height: '100px', maxWidth: '400px', margin: '20px', boxShadow: '0px 0px 10px black' }}>
                <span style={{ marginTop: '10px' }}>Give suggestion</span>
                <span style={{ textAlign: 'right' }}>&#x2192;</span>
            </div>
        </div>

        <div id="about">
            About
            <br/>
            Here you can join CODM matches with global. Make friends and chat with them. Account creation is must.<br/><br/>
        </div>
        <div id="rules">Rules</div>
        <ul>
            <li>No Hats Allowed</li>
            <li>No Fraternizing With The Enemy</li>
            <li>Always On Time</li>
            <li>Away From The Information Super Highway</li>
            <li>Obey The Rules Or Else</li>
            <li>One For All And All For One</li>
        </ul>
        <Footer/>
    </div>
}

export default LandingPage;

//error symbol &#x2300;