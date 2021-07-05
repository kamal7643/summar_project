import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';
import { IoMdNotifications } from 'react-icons/io';

function Header (props) {
    const [isOpen, setIsOpen] = useState(document.documentElement.scrollWidth >= 900);


    const toggle = () => setIsOpen(!isOpen);
   

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">ByPass</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/Events">Events</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/login">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/videos">Videos</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/admin">Admin</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText><IoMdNotifications/></NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;