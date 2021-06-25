import React, { useState } from 'react';
import Header from '../components/Header';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from '../components/Loading';
import Popup from '../components/Popup';


function Admin(props) {
    const [isOpen, setisOpen] = useState(true);
    const history = useHistory();
    const togglePopup = () => {
        setisOpen(!isOpen);
    }

    return(<div>
            <Header />
        {isOpen && <Popup
            content={<>
                <div style={{marginBottom:'200px'}}><Loading/></div>
            </>}
            handleClose={togglePopup}
        />}
            <div>
                <ul className="list-group">
                    <li className="list-group-item" onClick={() => { history.push("/admin/suggestion") }}>Suggestion</li>
                    <li className="list-group-item" onClick={() => { history.push("/admin/events") }}>Event</li>
                </ul>
                
                
            </div>
        </div>);
}

export default Admin;