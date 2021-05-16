import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';


function Header(props) {
    const history = useHistory();
    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <label style={{ color: 'white' }} onClick={() => { history.push("/") }}>Home</label>
                    <label style={{ color: 'white' }} onClick={() => { history.push("/ranks") }}>Ranks</label>
                    <label style={{ color: 'white' }} onClick={() => { history.push("/events") }}>Events</label>
                    <label style={{ color: 'white' }} onClick={() => { history.push("/login") }}>Login</label>
                    <label style={{ color: 'white' }} onClick={() => { history.push("/#about") }}>About</label>
                    <label style={{ color: 'white' }} onClick={() => { history.push("/suggestion") }}>Suggestion</label>
                    <label style={{ color: 'white' }} onClick={() => { history.push("/admin") }}>Admin</label>
                     {//<Nav.Link href="/">Home</Nav.Link>
                    // <Nav.Link href="/ranks">Ranks</Nav.Link>
                    // <Nav.Link href="/events">Events</Nav.Link>
                    // <Nav.Link href="/login">Login</Nav.Link>
                    // <Nav.Link href="/#about">About</Nav.Link>
                    // <Nav.Link href="/#rules">Rules</Nav.Link>
                    // <Nav.Link href="/admin">Admin</Nav.Link>
                }
                </Nav>
            </Navbar.Collapse>
            </Navbar>
    );
}

export default Header;