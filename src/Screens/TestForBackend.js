import React from 'react';
// import firebase from '../util/Firebase.js';
var unirest = require("unirest");


function Test(props) {

    const get = async () => {
        // var unirest = require("unirest");

        var req = unirest("GET", "https://youtube-videos.p.rapidapi.com/mp4");
        
        req.query({
            "videoId": "M0VWroX0gZA"
        });
        // console.log(req);
        req.headers({
            "x-rapidapi-key": "34b65eb905msh465c8fd435787bcp17b2c1jsn1aae2f2a8df4",
            "x-rapidapi-host": "youtube-videos.p.rapidapi.com",
            "useQueryString": true
        });
        console.log(req);

        req.end(function (res) {
            if (res.error) console.log(res.error);
                

            console.log(res.body);
        });
    }



    return(
        <div>
        <div onClick={() =>{get()}}>
            <button>get</button>
        </div>
        </div>
    );
}


export default Test;