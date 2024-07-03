// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth ,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-vKUVRqyn64QORTILo8_oO761RGgdeU0",
  authDomain: "chatapp-4d3fa.firebaseapp.com",
  projectId: "chatapp-4d3fa",
  storageBucket: "chatapp-4d3fa.appspot.com",
  messagingSenderId: "1007406766356",
  appId: "1:1007406766356:web:f4836266c74368b93dca01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const provider =  new GoogleAuthProvider()
