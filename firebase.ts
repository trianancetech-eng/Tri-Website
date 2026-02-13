
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzA9oT0ragvdJirneoKBkXtNp_vwJi5S0",
  authDomain: "trianance.firebaseapp.com",
  projectId: "trianance",
  storageBucket: "trianance.firebasestorage.app",
  messagingSenderId: "572307097896",
  appId: "1:572307097896:web:f606c3feecf9f31617281d",
  measurementId: "G-NW3V96MQ1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
