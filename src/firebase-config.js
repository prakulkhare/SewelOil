import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGwqMTfnJiYe-SQYy3QiYHk1kgZU_W1UE",
    authDomain: "seweloilcom-16052.firebaseapp.com",
    projectId: "seweloilcom-16052",
    storageBucket: "seweloilcom-16052.firebasestorage.app",
    messagingSenderId: "1098173601357",
    appId: "1:1098173601357:web:482094a627463af849ae04"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
