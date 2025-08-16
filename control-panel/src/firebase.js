// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGh4GA9iYqtZHBKy5Mv-OmMN5NwDwi2Nw",
  authDomain: "legionnaire-3ff3f.firebaseapp.com",
  projectId: "legionnaire-3ff3f",
  storageBucket: "legionnaire-3ff3f.firebasestorage.app",
  messagingSenderId: "59890045757",
  appId: "1:59890045757:web:8fc6a761a261fc74aeab54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export auth instance
export default app;


