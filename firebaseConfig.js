// Importar os módulos necessários do Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

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

// Inicializar o Firebase Authentication e Firestore com persistência
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);
const storage = getStorage(app); 

export { auth, db, storage }; 
