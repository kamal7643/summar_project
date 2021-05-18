import React,{ useState, useEffect } from 'react';
import Header from '../components/Header';
// import styles from '../css/profileWall.module.css';
import Loading from '../components/Loading';
// import { confirmAlert } from 'react-confirm-alert';
// import {useHistory} from 'react-router-dom';
import firebase from '../util/Firebase';
 
function ProfileWall(props){
    const ID = new URLSearchParams(props.location.search).get('userid');
    const [user, setuser] = useState();
    const [loading, setloading] = useState(true);
    const [fetched, setfetched] = useState(false);
    // const history = useHistory();




    useEffect(() => {
        if(!fetched){
            const ref = firebase.database().ref('users/'+ID);
            ref.on('value', (value) =>{
                value.forEach(data=>{
                    setuser(data.val());
                })
            })
            setloading(false);
            setfetched(true);
        }
    },[ fetched, ID, setfetched, setloading])

    return(
        <div>
            <Header />
            <div>
            {
                (
                    ()=>{
                        if(loading){
                            return (<Loading />);
                        }else{
                            if(user){
                                return(
                                    <div>
                                        hello {user.email}
                                    </div>
                                    );
                            }else if(fetched){
                                    return (<div>wait...
                                    </div>);
                            }
                        }
                    }
                )()
            }
            </div>
        </div>
    );
}

export default ProfileWall;