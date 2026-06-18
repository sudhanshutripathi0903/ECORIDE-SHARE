import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 🔥 Tumhara real config jo tumne daal rakha hai
const firebaseConfig = {
  apiKey: "AIzaSyDPvZEZLNClyWij4Q7jqikd7LeWCUFzlLw",
  authDomain: "projectecoride.firebaseapp.com",
  projectId: "projectecoride",
  storageBucket: "projectecoride.firebasestorage.app",
  messagingSenderId: "286002531445",
  appId: "1:286002531445:web:e8e5434a42a59bc0b3bc3c",
  measurementId: "G-GD9KX1DVED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Modules initialize karke direct export karo
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };