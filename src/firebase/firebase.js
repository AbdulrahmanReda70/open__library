// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDT6xe1C8tc8fUaOTNDZBLab_ABkWAEPuo",
    authDomain: "fictionbookstore-56dd6.firebaseapp.com",
    projectId: "fictionbookstore-56dd6",
    storageBucket: "fictionbookstore-56dd6.appspot.com",
    messagingSenderId: "115311629501",
    appId: "1:115311629501:web:4d116575570ed9974613d4",
    databaseURL: "https://fictionbookstore-56dd6-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Initialize Firebase Authentication and Google Auth Provider & export all
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();