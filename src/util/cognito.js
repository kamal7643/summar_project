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
        });
        NUser.sendEmailVerification();
        localStorage.setItem('currusr', JSON.stringify(NUser));
        getfirebaseusr(NUser.uid);
        
        const todoref = firebase.database().ref('users/' + NUser.uid + "/profile");
        todoref.set({
            name: name,
            email: email,
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


export const socialsignin = async (e) => {
    var user;
    var provider;
    if(e==='google'){
        provider = new firebase.auth.GoogleAuthProvider();
        
    }else if(e==='twitter'){
        provider = new firebase.auth.TwitterAuthProvider();
    }    
    else if(e==='facebook'){
        provider = new firebase.auth.FacebookAuthProvider();
    }
    try {
        const nuser = firebase.auth().signInWithPopup(provider);
        user = (await nuser).user;
        localStorage.setItem('currusr', JSON.stringify(user));
        getfirebaseusr(user.uid);
    } catch (e) { console.log(e) }
    return user;
    
}

export const signin = async (email, password, seterror) => {
    var user;
    try {
        const nuser = firebase.auth().signInWithEmailAndPassword(email, password);
        user = (await nuser).user;
        localStorage.setItem('currusr', JSON.stringify(user));
        getfirebaseusr(user.uid);
    } catch (e) {
        console.log(e);
        seterror(e.message);
    }
    return user;
}

const getfirebaseusr = (uid) => {
    const ref = firebase.database().ref('users/'+uid);
    ref.child('profile').once('value', (value)=>{
        localStorage.setItem('firebaseusr', JSON.stringify(value.val()));
    })
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
        localStorage.removeItem('currusr');
        localStorage.removeItem('firebaseusr');
        return user;
    } catch (e) { console.log(e.message); }
    return user;
}


export const passwordReset = async (email, setsuccess) => {
      (await firebase.auth().sendPasswordResetEmail(email)).then((event)=>{console.log('here')}).catch((error)=>{console.log(error)})
}      