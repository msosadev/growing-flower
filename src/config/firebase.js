// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFYhuFlfLQJXKen1-I99KMXk2gXuyHjIU",
  authDomain: "growing-flower.firebaseapp.com",
  databaseURL: "https://growing-flower-default-rtdb.firebaseio.com",
  projectId: "growing-flower",
  storageBucket: "growing-flower.firebasestorage.app",
  messagingSenderId: "55794606411",
  appId: "1:55794606411:web:830e6b78e7ffe5547cc8ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();