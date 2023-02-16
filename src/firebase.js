// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAi3Td36XZ0TVZacMD-XxiDWC1qKr9VPIQ",
  authDomain: "gdrive-efedf.firebaseapp.com",
  projectId: "gdrive-efedf",
  storageBucket: "gdrive-efedf.appspot.com",
  messagingSenderId: "740058651150",
  appId: "1:740058651150:web:1f25e9d571a9e58e9b7a5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const storage = getStorage(app)
export const db = getFirestore(app)
//const auth = getAuth(app)
//const provider = new GoogleAuthProvider()
//export default {auth, provider}