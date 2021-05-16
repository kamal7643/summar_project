import firebase from 'firebase/app';
// import 'firebase/database'; // If using Firebase database
// import 'firebase/storage'; // If using Firebase storage
// import 'firebase/auth';        // for authentication
// import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
// import 'firebase/firestore';   // for cloud firestore
// import 'firebase/messaging';   // for cloud messaging
// import 'firebase/functions';   // for cloud functions

const firebaseConfig = {
    apiKey: "AIzaSyBjjeLSnW0buyijmhn7QOLbsnExpuBBXcQ",
    authDomain: "aplhasecond.firebaseapp.com",
    databaseURL: "https://aplhasecond-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "aplhasecond",
    storageBucket: "aplhasecond.appspot.com",
    messagingSenderId: "9023237183",
    appId: "1:9023237183:web:6517c24502db054a779c8a",
    measurementId: "G-9Z7N8K3EW8"
};

// const firebaseApp = 
firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

// export default db;
export default firebase;