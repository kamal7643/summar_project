import React from 'react';
import Header from '../components/Header';
import Slides from '../components/Slides';

function LandingPage(props) {
    return<div>
        <Header/>
        <Slides/>
        <div>
            extra 
        </div>
        <div id="about">About</div>
        <div id="rules">Rules</div>
    </div>
}

export default LandingPage;