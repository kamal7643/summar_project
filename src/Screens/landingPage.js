import React from 'react';
import './css/LandingPage.css';

function LandingPage() {

    return (
        <div className="header">
            <div className="header-links">
                <a className="header-path" href="/">Home</a>
                <a className="header-path" href="/ranks">Ranks</a>
                <a className="header-path" href="/participate">Participate</a>
                <a className="header-path" href="/performance">Performance</a>
                <a className="header-path" href="/support">Support</a>
                <a className="header-path" href="/about">About</a>
            </div>
        </div>
    );
}

export default LandingPage;