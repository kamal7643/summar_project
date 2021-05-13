import React from 'react';
import Header from '../components/Header';
import {useHistory} from 'react-router-dom';


function Admin(props) {
    const history = useHistory();

    return(<div>
            <Header />
            <div>
                <div onClick={()=>{history.push("/admin/suggestion")}}>Suggestion</div>
            </div>
        </div>);
}

export default Admin;