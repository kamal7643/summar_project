import firebase from '../util/Firebase';
// import defaultprofilephoto from '../images/signupprofilephoto.png';


export const signup = async (email, password, name, seterror) => {
    var NUser;
    try{
        const newuser = firebase.auth().createUserWithEmailAndPassword(email, password);
        NUser = (await newuser).user;
        const todoref = firebase.database().ref('users/'+NUser.uid+"/profile");
        todoref.set({
            name:name,
            email:NUser.email,
            playname:"none",
            matches: 0,
            win: 0,
            defeat: 0,
            kills: 0,
            deaths: 0,
            kd: 0,
            points: 0,
            uid: NUser.uid,
            photo:false
        })
        
    }
    catch (e) {
        seterror(e.message);
    }
    return NUser;
}


// export const phonesignup = async (phonenumber, seterror) => {
//     var NUser;
//     try {
//         const newuser = firebase.auth().createUserWithPhoneNumber(phonenumber);
//         (await newuser).user.sendEmailVerification();
//         NUser = (await newuser).user;
//     }
//     catch (e) {
//         console.log(e);
//     }
//     return NUser;
// }

export const signin = async (email, password, seterror) =>{
    var user;
    try{
        const nuser = firebase.auth().signInWithEmailAndPassword(email, password);
        user= (await nuser).user;
    }catch (e){
        console.log(e);
        seterror(e.message);
    }
    return user;
}

export const getcurruser = async () =>{ 
    var curruser="hello";
    while(curruser){
        try{
            const user = firebase.auth().currentUser;
            curruser = (await user);
            console.log(user);
        }
        catch(e){
            console.log(e);
            return ;
        }
    }
    return curruser;
}

export const signout = async () =>{
    var user;
    try{
        user = firebase.auth().signOut();
        return user;
    }catch (e){console.log(e.message);}
    return user;
}