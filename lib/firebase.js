// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMiXM8hRW9jdebTrcKJRiJP8U0GUsk1Xw",
  authDomain: "rusharena-2ee93.firebaseapp.com",
  projectId: "rusharena-2ee93",
  storageBucket: "rusharena-2ee93.firebasestorage.app",
  messagingSenderId: "524879024785",
  appId: "1:524879024785:web:bceec5fa8921c695c2a530",
  measurementId: "G-CNS22FJ7W0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
