import React, { useState, useEffect }from 'react';
import Header from '../components/Header';
import SingleSuggest from '../components/Suggestion';
import Loading from '../components/Loading';
import firebase from '../util/Firebase';
import {useHistory} from 'react-router-dom';


function AdminSuggestion(props) {

    const [fetched, setfetched] = useState(false);
    const [loading, setloading] = useState(true);
    const [sSuggetions, setsSuggetions] = useState(null);
    const history = useHistory();

    function deletesuggetion(e){
        const ref = firebase.database().ref('suggestion/'+e);
        ref.remove();
        setsSuggetions([]);
        setfetched(false);
    }

    function getBackEnd(){
        const todoref = firebase.database().ref('suggestion');
        todoref.on('value', (snapshot) => {
            if(snapshot.exists()){
                let ssg = [];
                snapshot.forEach((element) =>{
                    ssg.push(element);
                })
                setsSuggetions(ssg);
            }else{
                console.log("suggestion not found");
            }
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
            <div><span onClick={()=>{ history.push('/admin')}}>admin{'>'}</span><span>suggestions</span></div>
            {
                (
                    ()=>{
                        if (loading || !sSuggetions){
                            return <Loading />
                        }else{
                            return sSuggetions.sort((a, b) => b.id - a.id).map((sug, i)=>
                                <div key={i}>
                                    <SingleSuggest
                                    data={sug}
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