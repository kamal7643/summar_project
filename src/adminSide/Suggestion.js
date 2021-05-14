import React, { useState, useEffect }from 'react';
import Header from '../components/Header';
import staticUrls from '../config/urls';
import SingleSuggest from '../components/Suggestion';
// import styles from '../css/adminSuggestion.module.css';
import Loading from '../components/Loading';


function AdminSuggestion(props) {

    const [fetched, setfetched] = useState(false);
    const [loading, setloading] = useState(true);
    const [sSuggetions, setsSuggetions] = useState(null);

    function deletesuggetion(e){
        fetch(staticUrls.url + '/suggestions/' + e, {
            method: 'DELETE'
        }).then((response)=> { return response.json()})
            .then((res) => { getBackEnd();})
    }

    function getBackEnd(){
        fetch(staticUrls.url +'/suggestions')
            .then((response) => { return response.json()})
            .then((response) =>{ 
            setsSuggetions(response);
        })
        return true;
    }

    useEffect(() => {
        if(!fetched){
            getBackEnd();
            setloading(false);
            setfetched(true);
        }
    },[setloading, setfetched, fetched])

    return(
        <div>
            <Header />
            {
                (
                    ()=>{
                        if (loading || !sSuggetions){
                            return <Loading />
                        }else{
                            return sSuggetions.sort((a, b) => b.id - a.id).map((sug, i)=>
                                <div key={i}>
                                    <SingleSuggest
                                    id={sug.id}
                                    title={sug.title}
                                    content={sug.content}
                                    action="remove"
                                    onbtnclick={deletesuggetion}
                                    />
                                </div>
                            )
                        }
                    }
                )()
            }
        </div>
    );
}


export default AdminSuggestion;