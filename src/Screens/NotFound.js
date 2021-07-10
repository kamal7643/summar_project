import React from 'react';
import Header from '../components/Header';
import { useHistory } from 'react-router-dom';


function NotFound(props) {
    const history = useHistory();
    return(<div>
            <Header />
            NOT FOUND 
            <button onClick={() => { history.push('/') }} style={{fontSize:'14px'}}> &#x2190;home</button>
        </div>);
}

export default NotFound;