import React, { useState, useEffect }from 'react';
import Header from '../components/Header';
import SingleSuggest from '../components/Suggestion';
// import styles from '../css/adminSuggestion.module.css';
import Loading from '../components/Loading';
import firebase from '../util/Firebase';


function AdminSuggestion(props) {

    const [fetched, setfetched] = useState(false);
    const [loading, setloading] = useState(true);
    const [sSuggetions, setsSuggetions] = useState(null);

    function deletesuggetion(e){
        // let key;
        // const todoref = firebase.database().ref('suggestion');
        // todoref.on('value', (snapshot) => {
        //     snapshot.forEach(val =>{
        //         // console.log(val.val().title===e.val().title && val.val().content===e.val().content)
        //         if(val.val().title===e.val().title && val.val().content===e.val().content){
        //             val.val().set({deleted:true})
        //         }
        //     })
        //     snapshot.pop(e);
        // })
        // // console.log("key:"+key)
        // e.set({deleted:true});
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