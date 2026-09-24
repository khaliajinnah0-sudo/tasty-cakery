// ========================================
// FIREBASE CONFIGURATION
// ========================================

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import { getAuth } from
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import { getFirestore } from
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// Tasty Cakery Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_12KS67cAV405fVeH68NPPN-ttNDxovo",
    authDomain: "tasty-cakery.firebaseapp.com",
    projectId: "tasty-cakery",
    storageBucket: "tasty-cakery.firebasestorage.app",
    messagingSenderId: "174780105729",
    appId: "1:174780105729:web:2191e0e2b92d44d06cac00"
};


// Start Firebase
const app = initializeApp(firebaseConfig);


// Firebase services we will use
const auth = getAuth(app);
const db = getFirestore(app);


// Make them available to our other JavaScript files
export { auth, db };