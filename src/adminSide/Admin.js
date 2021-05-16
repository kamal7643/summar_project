import React from 'react';
import Header from '../components/Header';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function Admin(props) {
    const history = useHistory();

    return(<div>
            <Header />
            <div>
                <ul className="list-group">
                    <li className="list-group-item" onClick={() => { history.push("/admin/suggestion") }}>Suggestion</li>
                    <li className="list-group-item" onClick={() => { history.push("/admin/events") }}>Event</li>
                </ul>
            </div>
        </div>);
}

export default Admin;