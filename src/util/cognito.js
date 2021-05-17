import firebase from '../util/Firebase';


export const signup = async (email, password, seterror) => {
    var NUser;
    try{
        const newuser = firebase.auth().createUserWithEmailAndPassword(email, password);
        (await newuser).user.sendEmailVerification();
        (await newuser).user.updateProfile("kamal")
        NUser = (await newuser).user;
    }
    catch (e) {
        console.log(e);
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
        const user = firebase.auth().signInWithEmailAndPassword(email, password);
        return (await user).user;
    }catch (e){
        console.log(e);
        seterror(e.message);
    }
    return user;
}

export const getcurruser = async () =>{ 
    var curruser;
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