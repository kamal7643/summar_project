import React,{ useState, useEffect } from 'react';
import Header from '../components/Header';
import staticUrls from '../config/urls';
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';
import styles from '../css/profileWall.module.css';
import { confirmAlert } from 'react-confirm-alert';
import {useHistory} from 'react-router-dom';

function ProfileWall(props){
    const userName = new URLSearchParams(props.location.search).get('user');
    const [user, setuser] = useState();
    const [loading, setloading] = useState(true);
    const [fetched, setfetched] = useState(false);
    const history = useHistory();


    function showerror(e) {
        confirmAlert({
            title: 'Error',
            message: e,
            buttons: [
                {
                    label: 'continue',
                    onClick: () => history.push("/ranks")
                }
            ],
            closeOnClickOutside: false
        });
    }


    useEffect(() => {
        if(!fetched){
            fetch(staticUrls.url + '/players')
            .then((response) => { return response.json()})
            .then((response) => {
            for(let i =0; i < response.length; i++){
                if(response[i].playname === userName){
                    setuser(response[i]);
                }
            }
            })
            setloading(false);
            setfetched(true);
        }
    },[ fetched, userName, setfetched, setloading])

    return(
        <div>
            <Header />
            <div>
            {
                (
                    ()=>{
                        if(loading){
                            return (<Spinner className={styles.loader} animation="border" variant="primary" />);
                        }else{
                            if(user){
                                return(<div>hello user</div>);
                            }else if(fetched){
                                    return (<div>
                                        {(
                                            ()=>{//showerror("we are sorry!")
                                            }
                                        )()}
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