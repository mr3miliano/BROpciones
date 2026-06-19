import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1qZeA6pDMB4Wzo-PXkEOCaeDgkZJdqhg",
  authDomain: "bropciones-9b206.firebaseapp.com",
  projectId: "bropciones-9b206",
  storageBucket: "bropciones-9b206.firebasestorage.app",
  messagingSenderId: "26915225476",
  appId: "1:26915225476:web:cff8ee59581f98db5da7d1"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);
