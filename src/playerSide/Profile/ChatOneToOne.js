import React,{ useState, useEffect} from 'react';
import firebase from '../../util/Firebase';


function ChatOneToOne(props){
    const [once, setonce] = useState(true);
    const [msgs, setmsgs] = useState([]);
    const [ids, setids] = useState([]);

    useEffect(() => {
        setTimeout(() =>{
            if(once){
                var templist = [];
                const ref = firebase.database().ref('message-hash/' + props.firstperson + '/' + props.secondperson+'/messages');
                ref.once('value',(value)=>{
                    value.forEach((snap)=>{
                        templist.push(snap.val());
                    })
                })
                if(templist!==ids){
                    setids(templist);
                }
                setonce(false);
            }
        },100)

        if(ids.length!==msgs.length){
            // var templist1 = [];
            const ref = firebase.database().ref('messages');
            ids.map((id)=>{
                ref.child(id.messageid).once('value',(value)=>{
                    var temp = msgs;
                    temp.push({content:value.val(), type:id.type});
                    setmsgs(temp);
                })
                return(<div></div>)
            })
            // if(msgs!==templist){
            //     setmsgs(templist);
            // }
            // setmsgs(templist1);
        }

        
    }, [ids, msgs, once, props.firstperson, props.secondperson])
    return(
        <div
        style={{ 
            width: '100%'
        }}
        >{
            msgs.map((message,i)=><div key={i}>{message.content}</div>) 
        }here{console.log(msgs)}</div>
    );
}

export default ChatOneToOne;