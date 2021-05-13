import React from 'react';
import Header from '../components/Header';


function Login(props) {
    if(localStorage.getItem('id')){
        return(<div>
            <Header />
            profile</div>);
    }else{
        return(<div>
            <Header/>
            login</div>);
    }
}

export default Login;