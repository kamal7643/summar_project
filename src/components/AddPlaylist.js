import React, { useState } from 'react';


function AddPlaylist(props) {
    const [show, setshow] = useState(false);

    const toggleshow = () => {
        setshow(!show);
    }
    return (
        <div style={{ boxShadow: show && '0px 0px 20px #00000050' }}>
            {
                //show and hide
                //input 
            }
            <div onClick={toggleshow}
                style={{ width: '100%', border: '1px solid gray', display: 'flex', justifyContent: 'center' }}
            >
                <span >Add new playlist</span>
            </div>
            {show && <div 
                style={{ 
                    display: 'flex', 
                    flexDirection: 'row',
                    padding:'20px' 
                }}
                >
                    <input style={{width: '100%'}} type="text" />
                    <button>add</button></div>}
        </div>
    );
}


export default AddPlaylist;