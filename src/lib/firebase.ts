import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqX9KZZYJxg6p9e9_pUHF_m8pMKQW9tQc",
  authDomain: "reggae-football-fanz.firebaseapp.com",
  projectId: "reggae-football-fanz",
  storageBucket: "reggae-football-fanz.appspot.com",
  messagingSenderId: "901234567890",
  appId: "1:901234567890:web:abc123def456ghi789jkl"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);