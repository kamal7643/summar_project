import React from 'react';
import './css/admin.css';

function Admin(props){
    const access = (props.history.action==='PUSH');
    
    

    return(
        <div className="admin-body">
            {(
                ()=>{
                    if(access){
                        return <div>handle</div>
                    }else{
                        return <div>something went wrong...
                            <a href="/admin-login">login first</a>
                        </div>
                    }
                }
            )()}
        </div>
    );
}

export default Admin;