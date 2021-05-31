const staticUrls = {
    // url:'mongodb+srv://kamal7643:dob7643@cluster0.fdabf.mongodb.net/api?retryWrites=true&w=majority',
    url:'http://localhost:3000',
    videos:[
        {
            "name":"first video",
            "link":'https://www.youtube.com/embed/qA0asxmaN7o',
            "desciption":"something"
        },
        {
            "name": "second video",
            "link": 'https://www.youtube.com/embed/XumojP2HIkw',
            "desciption": "something"
        }
    ],
    emailvalidation: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
};

export default staticUrls;