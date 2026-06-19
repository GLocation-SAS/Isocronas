import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase avoiding multiple initializations in Next.js development HMR
// Check if config exists to prevent crashing if .env is missing
const isFirebaseConfigured = Boolean(firebaseConfig.apiKey);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

if (isFirebaseConfigured) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
} else {
  console.warn("Firebase is not configured. Missing NEXT_PUBLIC_FIREBASE_API_KEY environment variable.");
}

export function initFirebaseAuth(): Auth | null {
  if (!auth && isFirebaseConfigured && app) {
    auth = getAuth(app);
  }
  return auth;
}

const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
