/*eslint-disable*/
import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD9_3CYfLFcUc6f4-H8h75yQvRUkFuUdxY",
  authDomain: "newspaper-638e1.firebaseapp.com",
  projectId: "newspaper-638e1",
  storageBucket: "newspaper-638e1.appspot.com",
  messagingSenderId: "387022870062",
  appId: "1:387022870062:web:f6672f7284d7fdb72071bf"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { db };

const auth = firebase.auth();


export default firebase;