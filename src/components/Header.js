import React, { useState, useEffect } from 'react';
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
import firebase from '../util/Firebase';

function Header (props) {
    const [isOpen, setIsOpen] = useState(document.documentElement.scrollWidth >= 900);
    const [count , setcount] = useState(0);
    const [once, setonce] = useState(true);
    const toggle = () => setIsOpen(!isOpen);

    const getNotifications = () => {
        if (localStorage.getItem('firebaseusr')){
            const ref = firebase.database().ref('users/' + JSON.parse(localStorage.getItem('firebaseusr')).uid+'/notifications');
            ref.on('value',(value)=>{
                let temp = 0;
                value.forEach((snap)=>{
                    temp+=1;
                })
                setcount(temp);
            })
        }
    }


    useEffect(() => {
        if(once){
            getNotifications();
            setonce(false);
        }
    },[once,setonce])
   

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Project</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/ranks">Ranks</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/Events">Events</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={(JSON.parse(localStorage.getItem('firebaseusr')) && "/profile?id="+JSON.parse(localStorage.getItem('firebaseusr')).uid+"&state=profile")|| "/login"}>Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/login">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/videos">Videos</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/suggestion">Suggestions</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/admin">Admin</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText style={{color:count>0&& 'red'}}><IoMdNotifications/><label style={{color:'red'}}>{count!==0 && count}</label></NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;