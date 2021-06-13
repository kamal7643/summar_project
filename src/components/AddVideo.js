import React, { useState } from 'react';


function AddVideo(props){
    const [show, setshow] = useState(false);

    const toggleshow = () => { 
        setshow(!show);
    }
    return(
        <div style={{ boxShadow:show && '0px 0px 20px #00000050'}}>
        {
            //show and hide
            //input 
        }
            <div onClick={toggleshow}
            style={{width: '100%', border:'1px solid gray', display:'flex', justifyContent: 'center'}}
            >
            <span>Add new video</span>
            </div>
            {show && <div 
                style={{
                    display: 'flex', 
                    flexDirection: 'row',
                    padding:'20px'
                }}>
                    <input type="file" accept="video/*"  />
                    <button>upload</button></div>}
        </div>
    );
}


export default AddVideo;