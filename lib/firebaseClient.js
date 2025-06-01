import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVN67k-obMmoX_hJOypO3EhWYiDJVUjbM",
  authDomain: "square-7a815.firebaseapp.com",
  projectId: "square-7a815",
  storageBucket: "square-7a815.firebasestorage.app",
  messagingSenderId: "1045565870891",
  appId: "1:1045565870891:web:b7767d3d602d3bc8d16b6e",
  measurementId: "G-PVDMTD8PVB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
