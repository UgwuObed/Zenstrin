import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getAnalytics, logEvent } from 'firebase/analytics';
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCbCX2Xa7nIbfJyknTSVfSNARw1alTdiWg",
  authDomain: "zenstrin.firebaseapp.com",
  projectId: "zenstrin",
  storageBucket: "zenstrin.appspot.com",
  messagingSenderId: "228930221297",
  appId: "1:228930221297:web:84e7367f7a6436d7416550",
  measurementId: "G-TD0GL2K1Z4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);
const analytics = getAnalytics(app);

const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
const twitterAuthProvider = new TwitterAuthProvider();

export {
  db,
  auth,
  functions,
  analytics,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
  signOut,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
  logEvent,
};