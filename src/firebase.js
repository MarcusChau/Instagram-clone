import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBOeTlM3j_XoUmPj38nhTR-EJ_AZIj6jWE",
    authDomain: "instagram-clone-react-912cb.firebaseapp.com",
    projectId: "instagram-clone-react-912cb",
    storageBucket: "instagram-clone-react-912cb.appspot.com",
    messagingSenderId: "434097205020",
    appId: "1:434097205020:web:0e420eaf274850099814d9",
    measurementId: "G-W8HG26Y8M0"
};

// Use this to initialize the firebase app
const firebaseApp = firebase.initializeApp(firebaseConfig);


// use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
