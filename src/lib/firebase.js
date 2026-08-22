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

// Firestore supports multiple named databases per project — if yours
// isn't literally named "(default)" (Google Cloud Console sometimes lets
// you pick a custom name when creating it, unlike the Firebase console's
// "Get started" flow which always uses "(default)"), set
// VITE_FIREBASE_DATABASE_ID in .env to match. Left blank, this connects
// to "(default)" as normal.
const databaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID;

export const auth = getAuth(app);
export const db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);
export default app;