import React,{ useState, useEffect} from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import firebase from '../../util/Firebase';
import { BiArrowBack } from "react-icons/bi";

function AddMessage(props){
    const [content, setcontent] = useState('');
    const [once, setonce] = useState(true);
    const [dateToBeUpdated, setDateToBeUpdated] = useState(false);


    function updateDate(){
        const lastupdatetimeref1 = firebase.database().ref('message-hash/' + props.from + '/' + props.to + '/time');
        lastupdatetimeref1.set({ time: Date() })
        const lastupdatetimeref2 = firebase.database().ref('message-hash/' + props.to + '/' + props.from + '/time');
        lastupdatetimeref2.set({ time: Date() })
    }
    function Add(){
        if (content !== '') {
            const data ={ content: { text: content, photourl: "", fileurl: "" }, time: Date().toString().substr(16, 5), date: Date().toString().substr(4, 11), type: 'out', from: props.from, to: props.to };
            const data1 ={ content: { text: content, photourl: "", fileurl: "" }, time: Date().toString().substr(16, 5), date: Date().toString().substr(4, 11), type: 'in', from: props.to, to: props.from };
            if(content.indexOf(' ')===-1){
                var i = 0;
                while(i<content.length){
                    i=i+25;
                    setcontent(content.slice(0, i)+' '+content.slice(i));
                }
            }
            const msghashref = firebase.database().ref('message-hash');
            msghashref.child(props.from).child(props.to).child("messages").push(data);
            msghashref.child(props.to).child(props.from).child("messages").push(data1);
            setcontent('');
            setDateToBeUpdated(true);
        }
    }

    useEffect(() => {
        if(once){
            window.scrollTo(0, document.body.scrollHeight);
            setonce(false);
        }
    },[once])

    return(<div
        style={{
            width:'100%',
            display: 'flex',
            flexDirection: 'row',
            position:'fixed',
            bottom:'0px'
        }}
        >
        <button onClick={() => { props.usertochat(); }}><BiArrowBack/></button>
            <input 
            type="text" 
            placeholder="type here ..." 
            style={{
                width:'100%'
            }}
            value={content} 
            onChange={(e) =>{
                setcontent(e.target.value);
            }}
            />
            <button onClick={Add}>send<AiOutlineSend/></button>
        </div>);
}


export default AddMessage;