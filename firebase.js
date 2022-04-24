// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxLH4yS7ikUS_THUbws-F1ZDUVCLQ3rBw",
  authDomain: "instagram-clone-348116.firebaseapp.com",
  projectId: "instagram-clone-348116",
  storageBucket: "instagram-clone-348116.appspot.com",
  messagingSenderId: "689680724726",
  appId: "1:689680724726:web:979cd192ae357e0480b2d7"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app, db, storage};