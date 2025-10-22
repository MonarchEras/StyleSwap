import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if all required environment variables are present
const requiredConfig = [
    firebaseConfig.apiKey, 
    firebaseConfig.authDomain, 
    firebaseConfig.projectId, 
    firebaseConfig.storageBucket, 
    firebaseConfig.messagingSenderId, 
    firebaseConfig.appId
];

let app;

if(requiredConfig.every(value => value)) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} else {
    console.warn("Firebase config is incomplete. Firebase features will be disabled.");
}


const auth = app ? getAuth(app) : null;

export { app, auth };
