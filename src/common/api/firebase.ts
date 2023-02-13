import { initializeApp } from 'firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from '@firebase/storage';
import { getAnalytics, logEvent } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MESUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyCFBo5xZGUKfX_nPgPWdvOKMLcB1_A3eD4",
  authDomain: "testest-20c96.firebaseapp.com",
  projectId: "testest-20c96",
  storageBucket: "testest-20c96.appspot.com",
  messagingSenderId: "975943672576",
  appId: "1:975943672576:web:728da8ef4b39e9f46b89e5",
  measurementId: "G-G5SXHDDNRV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics();
logEvent(analytics, 'notification_received');