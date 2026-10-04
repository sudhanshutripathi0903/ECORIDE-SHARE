import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8pW5MdmRBiWAG1qTylTy_6e7FIt8pONI",
  authDomain: "ride-share-501d0.firebaseapp.com",
  databaseURL: "https://ride-share-501d0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ride-share-501d0",
  storageBucket: "ride-share-501d0.firebasestorage.app",
  messagingSenderId: "204567254608",
  appId: "1:204567254608:web:e5682844147ea16cb96355",
  measurementId: "G-Y2PDZ80BZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Modules initialize karke direct export karo
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
