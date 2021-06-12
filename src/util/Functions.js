/*
list of functions
GetFriendList line number :35
GetUserInfor line number : 47




















*/

//imports
import firebase from './Firebase';






export const GetFriendiList = (userid) => {
    const ref = firebase.database().ref('users');
    var listOfFriends = [];
    ref.child(userid).child('friends').once('value', (value) => {
        listOfFriends = [];
        value.forEach((snap) => {
            listOfFriends.push(snap.key);
        })
        return listOfFriends;
    })
    console.log(listOfFriends);
    return listOfFriends;
}

export const GetUserInfo = (useruid) =>{ 
    const ref = firebase.database().ref('users/'+useruid+'/profile');
    ref.once('value',(value)=>{
        console.log(value.val());
    })
}