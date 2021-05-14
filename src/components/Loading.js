import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';


function Loading(props) {
    return(<Spinner style={{marginLeft:'45%', marginTop:'20%'}} animation="border" variant="primary"/>);
}

export default Loading;