import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import SingleSuggest from '../components/Suggestion';
import Loading from '../components/Loading';
import firebase from '../util/Firebase';
import refresh from '../images/refreshicon.png';
import { getcurruser } from '../util/cognito';
import { useHistory } from 'react-router-dom';


function Suggestion(props) {
    const [suggestion, setsuggestion] = useState([]);
    const [loading, setloading] = useState(true);
    const [head, sethead] = useState("");
    const [body, setbody] = useState("");
    const [wait, setwait] = useState(false);
    const [name, setname] = useState('');
    const history = useHistory();

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


    function addNewSuggestion() {
        if (head !== "") {
            if (body !== "") {
                const todoref = firebase.database().ref('suggestion');
                const todo = {
                    title: head,
                    content: body,
                    uid: JSON.parse(localStorage.getItem('firebaseusr')).uid,
                    name: JSON.parse(localStorage.getItem('firebaseusr')).playname
                };
                const key = todoref.push(todo).key;
                todoref.child(key).child('id').set(key);
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

    async function addNew() {
        setwait(true);
        getcurruser().then((user) => {
            if (user) {
                addNewSuggestion();
            }
            else {
                confirmAlert({
                    title: 'You are not logged in',
                    message: 'please login',
                    buttons: [
                        {
                            label: 'continue',
                            onClick: () => history.push("/login")
                        }
                    ]
                })
            }

        })

    setwait(false);

}

useEffect(() => {
    setTimeout(() => {
        const todoref = firebase.database().ref('suggestion');
        todoref.on('value', (snapshot) => {
            if (snapshot.exists()) {
                let ssg = [];
                snapshot.forEach((element) => {
                    ssg.push(element);
                })
                setsuggestion(ssg);
            } else {
                console.log("suggestion not found");
            }
        })
        setloading(false);
    }, 10)
})
if (!wait) {
    return (
        <div >
            <Header />
            <div style={{ maxWidth: '400px', marginTop: '30px', padding: '3%', border: '2px', borderRadius: '5px', boxShadow: '0px 0px 15px black' }}>
                <div style={{ marginTop: '5%' }}>
                    <input style={{ width: '100%' }} type="text" name="" placeholder="heading" value={head} onChange={(e) => { sethead(e.target.value) }} />
                </div>
                <div>
                    <textarea style={{ width: '100%', height: '100px' }} type="text" name="" placeholder="content" value={body} onChange={(e) => { setbody(e.target.value) }} />
                </div>
                <button style={{ width: '70px' }} onClick={addNew}>add</button>
            </div>
            <br />
            <div style={{ textAlign: 'center', padding: '5px', maxWidth: '400px' }}>Privious suggestions &nbsp;
                <img
                    style={{
                        widht: '20px',
                        height: '20px',
                        backgroundColor: '#FFFFFF'
                    }}
                    alt=""
                    onClick={() => { setsuggestion([]); }}
                    src={refresh}
                />
            </div>
            <div>
                {
                    (
                        () => {
                            if (loading) {
                                return (<Loading />);
                            }
                            else {
                                return suggestion.reverse().map((s, i) => {
                                    return (<div key={i}>
                                        <SingleSuggest
                                            data={s}
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
else {
    return (<div>
        <Header />
        <Loading />
    </div>)
}
}

export default Suggestion;