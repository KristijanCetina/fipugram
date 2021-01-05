import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyBLSa8rdAT6PKbiOZroeBtlXWiZQpalRC0",
    authDomain: "fipugram-4522d.firebaseapp.com",
    projectId: "fipugram-4522d",
    storageBucket: "fipugram-4522d.appspot.com",
    messagingSenderId: "842093482851",
    appId: "1:842093482851:web:6e1812753b0d5d1b0d3956"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export { firebase, db };