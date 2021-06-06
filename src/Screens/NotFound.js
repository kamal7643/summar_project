import React from 'react';
import Header from '../components/Header';
import { useHistory } from 'react-router-dom';


function NotFound(props) {
    const history = useHistory();
    return(<div>
            <Header />
            NOT FOUND 
            <span onClick={() => { history.push('/') }} style={{fontSize:'14px', color:'green', textDecoration:'underline', paddingLeft:'50px'}}> &#x2190;home</span>
        </div>);
}

export default NotFound;