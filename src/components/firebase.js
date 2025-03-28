// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuCddfr8ZT9LFd626XCJh6F1mhq3xn_ec",
  authDomain: "sajilai.firebaseapp.com",
  projectId: "sajilai",
  storageBucket: "sajilai.firebasestorage.app",
  messagingSenderId: "450067573472",
  appId: "1:450067573472:web:4307147df449ff4749fe85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const db=getFirestore(app)
export default app