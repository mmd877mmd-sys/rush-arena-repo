// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCMiXM8hRW9jdebTrcKJRiJP8U0GUsk1Xw",
  authDomain: "rusharena-2ee93.firebaseapp.com",
  projectId: "rusharena-2ee93",
  storageBucket: "rusharena-2ee93.firebasestorage.app",
  messagingSenderId: "524879024785",
  appId: "1:524879024785:web:bceec5fa8921c695c2a530",
  measurementId: "G-CNS22FJ7W0",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(app);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

// Export messaging for use in notifications.js
export { messaging };
