import firebaseService from '../service/firebase';

export const isSignedIn = () => {
  var user = firebaseService.auth().currentUser;
  if(user) {
    return true;
  }
  return false;
}