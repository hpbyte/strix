import * as firebase from 'firebase';

let instance = null;
const firebaseConfig = {
  apiKey: "AIzaSyBDee1Y78Q8PO5fSbErkzVcOMrlOr03Ft8",
  authDomain: "strix-c2677.firebaseapp.com",
  databaseURL: "https://strix-c2677.firebaseio.com",
  projectId: "strix-c2677",
  storageBucket: "strix-c2677.appspot.com",
  messagingSenderId: "850748958968"
};

class FirebaseService {
  constructor() {
    if(!instance) {
      this.app = firebase.initializeApp(firebaseConfig);
      instance = this;
    }
    return instance;
  }
}

const firebaseService = new FirebaseService().app;
export default firebaseService;