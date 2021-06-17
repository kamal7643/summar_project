import React,{ useState, useEffect} from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import firebase from '../../util/Firebase';
import { BiArrowBack } from "react-icons/bi";

function AddMessage(props){
    const [content, setcontent] = useState('');
    const [once, setonce] = useState(true);

    function Add(){
        if (content !== '') {
            // if(content.indexOf(' ')===-1){
            //     var i = 0;
            //     while(i<content.length){
            //         i=i+25;
            //         setcontent(content.slice(0, i)+' '+content.slice(i));
            //     }
            // }
            localStorage.setItem('lastmsg', content);
            setcontent('');
            const msgsref = firebase.database().ref('messages');
            var key = msgsref.push({ content: content, from:props.from }).key;
            const msghashref = firebase.database().ref('message-hash');
            msghashref.child(props.from).child(props.to).child("messages").push({ messageid: key, type: 'out' });
            msghashref.child(props.to).child(props.from).child("messages").push({ messageid: key, type: 'in' });
        }
    }

    useEffect(() => {
        if(once){
            window.scrollTo(0, document.body.scrollHeight);
            setonce(false);
        }
    })

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