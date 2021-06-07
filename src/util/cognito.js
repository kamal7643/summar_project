import firebase from '../util/Firebase';
// import defaultprofilephoto from '../images/signupprofilephoto.png';
// import defaultprofile from '../images/signupprofilephoto.png';
import staticUrls from '../config/urls';


export const signup = async (email, password, name, seterror) => {
    var NUser;

    try {
        const newuser = firebase.auth().createUserWithEmailAndPassword(email, password);
        NUser = (await newuser).user;
        NUser.updateProfile({ 
            name: name,
            photoURL:staticUrls.profilephotourl
        })
        const todoref = firebase.database().ref('users/' + NUser.uid + "/profile");
        todoref.set({
            name: name,
            email: NUser.email,
            playname: "none",
            matches: 0,
            win: 0,
            defeat: 0,
            kills: 0,
            deaths: 0,
            kd: 0,
            points: 0,
            uid: NUser.uid,
            photo: staticUrls.profilephotourl
        })

    }
    catch (e) {
        seterror(e.message);
    }
    return NUser;
}


export const test = async () => {
    // console.log(defaultprofile);
}

export const signin = async (email, password, seterror) => {
    var user;
    try {
        const nuser = firebase.auth().signInWithEmailAndPassword(email, password);
        user = (await nuser).user;
    } catch (e) {
        console.log(e);
        seterror(e.message);
    }
    return user;
}

export const getcurruser = async () => {
    var curruser;
    try {
        const user = firebase.auth().currentUser;
        curruser = (await user);
        return (curruser);
    }
    catch (e) {
        console.log(e);
        return;
    };
}

export const signout = async () => {
    var user;
    try {
        user = firebase.auth().signOut();
        return user;
    } catch (e) { console.log(e.message); }
    return user;
}