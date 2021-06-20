import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Slides from '../components/Slides';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import { MDBProgress } from 'mdbreact';
import style from '../css/landingpage.module.css';


function LandingPage(props) {
    const history = useHistory();
    const [count, setcount] = useState(0);


    useEffect(() => {
        setTimeout(() => {
            // navigator.geolocation.getCurrentPosition(function (position) {
            //     console.log("Latitude is :", position.coords.latitude);
            //     console.log("Longitude is :", position.coords.longitude);
            // }, function (error){console.log(error)});
            setcount(count + 1);
        }, 100)
    })


    return <div>
        {
            (
                () => {
                    if (count < 10) {
                        return (
                            <MDBProgress className="my-2" material value={count * 10} color="info" />
                        );
                    }
                }
            )()
        }
        <Header />
        <div className="text-secondary">
            <div><Slides /></div>
            <div className={style.groupcards}>
                <div className={style.landingpagegotocards}>
                    <div className="card-body">
                        <h5 className="card-title">Join events</h5>
                        <p className="card-text">$cardContent</p>
                        <span onClick={() => { history.push('/events') }} className="btn btn-primary">Click</span>
                    </div>
                </div>
                <div className={style.landingpagegotocards} >
                    <div className="card-body">
                        <h5 className="card-title">Make an account</h5>
                        <p className="card-text">$cardContent</p>
                        <span onClick={() => { history.push('/signup') }} className="btn btn-primary">Click</span>
                    </div>
                </div>
                <div className={style.landingpagegotocards} >
                    <div className="card-body">
                        <h5 className="card-title">Watch videos</h5>
                        <p className="card-text">$cardContent</p>
                        <span onClick={() => { history.push('/watch') }} className="btn btn-primary">Click</span>
                    </div>
                </div>
                <div className={style.landingpagegotocards} >
                    <div className="card-body">
                        <h5 className="card-title">Give suggestion</h5>
                        <p className="card-text">$cardContent</p>
                        <span onClick={() => { history.push('/suggestion') }} className="btn btn-primary">Click</span>
                    </div>
                </div>
            </div>
            <div id="about" className={style.instuctionbox}>
                About
                <br />
                Here you can join CODM matches with global. Make friends and chat with them. Account creation is must.<br />
                Chat with firends.<br />
                Upload videos.<br />
                <br />
            </div>
            <div id="rules" className={style.instuctionbox}>Rules</div>
            <ul>
                <li>No Hats Allowed</li>
                <li>No Fraternizing With The Enemy</li>
                <li>Always On Time</li>
                <li>Away From The Information Super Highway</li>
                <li>Obey The Rules Or Else</li>
                <li>One For All And All For One</li>
            </ul>
        </div>
        <Footer />
    </div>
}

export default LandingPage;

//error symbol &#x2300;