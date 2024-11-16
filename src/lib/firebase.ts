import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, connectAuthEmulator, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCAIFXN4ZplnMVCyhAKLKugEBO8q5qXYQU",
  authDomain: "reggaefootballfanz-97160.firebaseapp.com",
  projectId: "reggaefootballfanz-97160",
  storageBucket: "reggaefootballfanz-97160.firebasestorage.app",
  messagingSenderId: "393492319696",
  appId: "1:393492319696:web:005894508eaa09ffd63dd5",
  measurementId: "G-31KV2TYRJJ"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

// Initialize Auth with improved configuration
export const auth = getAuth(app);

// Set persistence to LOCAL to improve offline capabilities
setPersistence(auth, browserLocalPersistence).catch(error => {
  console.error('Error setting auth persistence:', error);
});

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics only in production and if supported
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

// Test connection function with improved error handling
export const testConnection = async () => {
  try {
    // Check if Firebase is initialized
    if (!app) {
      throw new Error('Firebase is not initialized');
    }

    // Check if Auth is initialized
    if (!auth) {
      throw new Error('Auth is not initialized');
    }

    // Check internet connectivity
    if (!navigator.onLine) {
      throw new Error('No internet connection');
    }

    // Test with actual demo credentials
    await signInWithEmailAndPassword(auth, 'fan@reggaefootballfanz.com', 'fan123')
      .then(async (userCredential) => {
        // Sign out immediately after successful test
        await auth.signOut();
        return true;
      })
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          // This means Firebase Auth is working, but credentials are wrong
          return true;
        }
        throw error;
      });

    return true;
  } catch (error: any) {
    console.error('Firebase connection error:', {
      code: error.code,
      message: error.message,
      name: error.name
    });

    // Return specific error messages based on error type
    if (!navigator.onLine) {
      throw new Error('Please check your internet connection');
    }

    if (error.code === 'auth/network-request-failed') {
      throw new Error('Network error - please check your connection');
    }

    if (error.code === 'auth/configuration-not-found') {
      throw new Error('Firebase configuration error - please enable Email/Password authentication in Firebase Console');
    }

    throw new Error(error.message || 'Firebase connection failed');
  }
};