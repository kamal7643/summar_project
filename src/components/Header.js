import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';


function Header(props) {
    const history = useHistory();
    const sst = { 
        marginRight:'100px',
    };
    return(
        <Navbar expand="lg" style={{ boxShadow:'0px 0px 10px gray' }} >
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <label style={sst} onClick={() => { history.push("/") }}>Home</label>
                    <label style={sst} onClick={() => { history.push("/ranks") }}>Ranks</label>
                    <label style={sst} onClick={() => { history.push("/events") }}>Events</label>
                    <label style={sst} onClick={() => { history.push("/login") }}>Login</label>
                    <label style={sst} onClick={() => { history.push("/#about") }}>About</label>
                    <label style={sst} onClick={() => { history.push("/suggestion") }}>Suggestion</label>
                    <label style={sst} onClick={() => { history.push("/admin") }}>Admin</label>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
    );
}

export default Header;