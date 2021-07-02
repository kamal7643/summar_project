import React,{ useState } from 'react';


function PrintMessages(props){
    const [messages, setmessages] = useState([]);
    if(messages!==props.messages){setmessages(props.messages);}

    return(<div>
        {
            messages.map((message, i)=><div
            key={i}
                style={{ textAlign: message.type === 'out' && 'right', minHeight:window.innerHeight-273}}
            >
                <label
                    style={{ border: '1px solid gray', borderRadius: '10px', padding: '8px', margin: '10px', maxWidth: '350px', backgroundColor:(message.type === 'out' && 'royalBlue') || 'salmon' }}
                >{message.content.text}</label>
            </div>)
        }
        </div>);
}

export default PrintMessages;