import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-demo-key";

// export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");
export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

// import * as firebase from 'firebase';
// import Firebase from '../firebase/firebase';

// export const onSignIn = (email, password) => {
//   firebase.auth().signInWithEmailAndPassword(email, password)
//     .then(() => {
//       // AsyncStorage.setItem(USER_KEY, "true");
//     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       if(errorCode === 'auth/wrong-password') {
//         alert('Wrong Password');
//       } else {
//         alert(errorMessage);
//       }
//     });
// }