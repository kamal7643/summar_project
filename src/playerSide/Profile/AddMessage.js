import React,{ useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import firebase from '../../util/Firebase';

function AddMessage(props){
    const [content, setcontent] = useState('');

    function Add(){
        if(content!==''){
            const msgsref = firebase.database().ref('messages');
            var key = msgsref.push({ content: content }).key;
            console.log(key);
            setcontent('');
            const msghashref = firebase.database().ref('message-hash');
            msghashref.child(props.from).child(props.to).child("messages").push({ messageid: key, type: 'out' })
            msghashref.child(props.to).child(props.from).child("messages").push({ messageid: key, type: 'in' })
        }
    }

    return(<div
        style={{
            width:'100%',
            display: 'flex',
            flexDirection: 'row',
            position:'fixed',
            bottom:'0px'
        }}
        >
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