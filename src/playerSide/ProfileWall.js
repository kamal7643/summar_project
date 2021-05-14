import React,{ useState, useEffect } from 'react';
import Header from '../components/Header';
import staticUrls from '../config/urls';
// import styles from '../css/profileWall.module.css';
import Loading from '../components/Loading';
// import { confirmAlert } from 'react-confirm-alert';
// import {useHistory} from 'react-router-dom';
 
function ProfileWall(props){
    const ID = new URLSearchParams(props.location.search).get('userid');
    const [user, setuser] = useState();
    const [loading, setloading] = useState(true);
    const [fetched, setfetched] = useState(false);
    // const history = useHistory();


    // function showerror(e) {
    //     confirmAlert({
    //         title: 'Error',
    //         message: e,
    //         buttons: [
    //             {
    //                 label: 'continue',
    //                 onClick: () => history.push("/ranks")
    //             }
    //         ],
    //         closeOnClickOutside: false
    //     });
    // }


    useEffect(() => {
        if(!fetched){
            fetch(staticUrls.url + '/players/'+ID)
            .then((response) => { return response.json()})
            .then((response) => {
                setuser(response);
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
                                return(<div>hello {user.name}</div>);
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