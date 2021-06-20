import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';


function Header(props) {
    const history = useHistory();
    

    return(
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" style={{ boxShadow:'0px 0px 10px gray' }} >
            {//<Navbar.Brand style={{ marginRight: '100px' }} onClick={() => { history.push('/') }}><img style={{ width: '40px', height: '40px', borderRadius:'50px'}} src={photo} alt="logo"/></Navbar.Brand>
            }<Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link style={{ marginRight: '100px' }} onClick={() => { history.push("/") }} >Home</Nav.Link>
                    <Nav.Link style={{ marginRight: '100px' }} onClick={() => { history.push("/ranks") }}>Ranks</Nav.Link>
                    <Nav.Link style={{ marginRight: '100px' }} onClick={() => { history.push("/events") }}>Events</Nav.Link>
                    <Nav.Link style={{ marginRight: '100px' }} onClick={() => { history.push("/login") }}>Login</Nav.Link>
                    <Nav.Link style={{ marginRight: '100px' }} onClick={() => { history.push("/#about") }}>About</Nav.Link>
                    <Nav.Link style={{ marginRight: '100px' }} onClick={() => { history.push("/suggestion") }}>Suggestion</Nav.Link>
                    <Nav.Link style={{ marginRight: '100px' }} onClick={() => { history.push("/admin") }}>Admin</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
    );
}

export default Header;