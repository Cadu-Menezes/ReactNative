// Importar os módulos necessários do Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase 
const firebaseConfig = {
  apiKey: "AIzaSyDw4wnE8iwAn1G8wp7WrOGuUnhER8OVvPc",
  authDomain: "reactnative-1ca6e.firebaseapp.com",
  projectId: "reactnative-1ca6e",
  storageBucket: "reactnative-1ca6e.appspot.com",
  messagingSenderId: "398213731828",
  appId: "1:398213731828:web:91cfaaf9fa0e019edf95a1",
  measurementId: "G-GF8LCB9B0E"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar o Firebase Authentication e Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };