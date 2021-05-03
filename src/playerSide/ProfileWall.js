import React from 'react';
import Header from '../components/Header';

function ProfileWall(props){
    const player = props.location.data;

    return(
        <div>
            <Header />
            <div>
                {player.name}
                {localStorage.getItem('logged')}
            </div>
        </div>
    );
}

export default ProfileWall;