// src/lib/firebase.js
// Firebase project connection — Auth (GM login) and Firestore (event data).
// Flyer image uploads go through Cloudinary instead (see src/lib/cloudinary.js)
// since Firebase Storage now requires the paid Blaze plan even for
// free-tier usage.
//
// SETUP: copy .env.example to .env and fill in your Firebase project's
// config values (Firebase Console → Project Settings → General → "Your
// apps" → SDK setup and configuration). Never commit the real .env file.

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
