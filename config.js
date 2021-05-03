import firebase from 'firebase'
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyCDZsCLdZxYtU2CJPR8vrIwGes97Z_Nx6U",
    authDomain: "booksanta-477fb.firebaseapp.com",
    databaseURL: "https://booksanta-477fb-default-rtdb.firebaseio.com",
    projectId: "booksanta-477fb",
    storageBucket: "booksanta-477fb.appspot.com",
    messagingSenderId: "696063260230",
    appId: "1:696063260230:web:319f9abd6e762414bd7c47"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();