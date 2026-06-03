// Firebase Configuration Module
// Replace the placeholder values below with your actual Firebase project credentials
// from https://console.firebase.google.com → Project Settings → General → Your apps → Firebase SDK snippet

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH7ZHUWkMQyH8Det6vMkN0bStH8d3GYZk",
  authDomain: "nas-portfolio-fe833.firebaseapp.com",
  projectId: "nas-portfolio-fe833",
  storageBucket: "nas-portfolio-fe833.firebasestorage.app",
  messagingSenderId: "32797437959",
  appId: "1:32797437959:web:4ded036b3f486bf4bbfaa2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore database instance
const db = getFirestore(app);

// Firebase Storage instance
const storage = getStorage(app);

// Document reference for the main portfolio data
const portfolioDocRef = doc(db, "portfolio", "main");

export {
  db,
  storage,
  portfolioDocRef,
  storageRef,
  uploadBytes,
  getDownloadURL,
  setDoc,
  onSnapshot,
};
