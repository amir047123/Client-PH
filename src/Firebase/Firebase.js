// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBM8LK83s4YzWWpTjpDkU-hpO4X5Rtfxvw",
  authDomain: "recipes-fae27.firebaseapp.com",
  projectId: "recipes-fae27",
  storageBucket: "recipes-fae27.appspot.com",
  messagingSenderId: "183388674363",
  appId: "1:183388674363:web:f82fc5ea452dbf3ada7f1e",
  measurementId: "G-574GPXBVB6"
};

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
