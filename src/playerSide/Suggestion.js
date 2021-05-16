import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import staticUrls from '../config/urls';
import 'bootstrap/dist/css/bootstrap.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import SingleSuggest from '../components/Suggestion';
import Loading from '../components/Loading';
import firebase from '../util/Firebase';


function Suggestion(props) {
    const [suggestion, setsuggestion] = useState([]);
    const [loading, setloading] = useState(true);
    const [head, sethead] = useState("");
    const [body, setbody] = useState("");

    function showAlert(a, b) {
        confirmAlert({
            title: a,
            message: b,
            buttons: [
                {
                    label: 'continue'
                }
            ]
        })
    }

    function getid() {
        var max = 0;
        suggestion.map((s, i) => {
            if (s.id > max) {
                max = s.id;
            }
            return <div></div>
        })
        return max + 1;
    }

    function addNewSuggestion() {
        const newId = getid();
        fetch(staticUrls.url + '/suggestions', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                id: newId,
                title: head,
                content: body
            })
        }).then((response) => { return response.json() })
            .then((response) => {
                var temp = suggestion;
                temp.push(response);
                setsuggestion(temp);
            })
    }

    function addNew() {
        if (head !== "") {
            if (body !== "") {
                addNewSuggestion();
                sethead("");
                setbody("");
                showAlert("Action complete", "Your suggetion has been added")
            } else {
                showAlert("Empty Input", "Please fill the content ")
            }
        } else {
            showAlert("Empty Input", "please fill the heading")
        }

    }

    useEffect(() => {
        setTimeout(() => {
            const todoref = firebase.database().ref('suggestions')
            todoref.on('value', (snapshot) =>{
                
            })
            setloading(false);
        }, 1000)
    })

    return (
        <div>
            <Header />
            <div>
                <div style={{marginTop:'5%'}}>
                    <input style={{width:'100%'}} type="text" name="" placeholder="heading" value={head} onChange={(e) => { sethead(e.target.value) }} />
                </div>
                <div>
                    <textarea style={{width:'100%', height:'100px'}} type="text" name="" placeholder="content" value={body} onChange={(e) => { setbody(e.target.value) }} />
                </div>
                <button style={{width:'70px'}} onClick={addNew}>add</button>
            </div>
            <br/>
            <div style={{textAlign: 'center',padding:'5px'}}>Privious suggestions</div>
            <div>
                {
                    (
                        () =>{
                            if(loading){
                                return (<Loading />);
                            }
                            else{
                                return suggestion.sort((a, b) => b.id - a.id).map((s, i) => {
                                    return (<div key={i}>
                                        <SingleSuggest
                                            id={s.id}
                                            title={s.title}
                                            content={s.content}
                                        />
                                    </div>);
                                }
                                )
                            }
                            
                        }
                    )()
                }
            </div>
        </div>
    );
}

export default Suggestion;