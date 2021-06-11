import React from 'react';
import Friends from '../../components/Friends';
import Peoples from '../../components/Peoples';

function PeoplesSTATE(props){
    return(<div>
        <div
            style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '10px' }}
        >
            <input
                style={{ width: '150%', textAlign: 'center' }}
            />
            <button style={{ width: '50%' }} color="primary">Search</button>
        </div>
        <span>Friends</span>
        <Friends uid={props.uid} />
        <span>Peoples</span>
        <Peoples uid={props.uid} />
        </div>);
}

export default PeoplesSTATE;
/*
<div
            style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop:'10px'}}
            >
            <input
            style={{width: '150%', textAlign: 'center'}}
            />
            <MDBBtn style={{width: '50%'}} color="primary">Search</MDBBtn>
            </div>
            <span>Friends</span>
            <Friends uid={props.uid}/>
            <span>Peoples</span>
            <Peoples uid={props.uid}/>
            */