import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6Zvg8bLUWpuYu75lefML29rRTjgAo0dg",
  authDomain: "auth-b8246.firebaseapp.com",
  projectId: "auth-b8246",
  storageBucket: "auth-b8246.firebasestorage.app",
  messagingSenderId: "207614912530",
  appId: "1:207614912530:web:58289a2a27da8930b350cb",
  measurementId: "G-1P60PF0FR5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
