// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp, getApps } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
console.log("FIREBASE_API_KEY:", process.env.FIREBASE_API_KEY);
console.log("FIREBASE_AUTH_DOMAIN:", process.env.FIREBASE_AUTH_DOMAIN);
console.log("FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
console.log("FIREBASE_STORAGE_BUCKET:", process.env.FIREBASE_STORAGE_BUCKET);
console.log("FIREBASE_MESSAGING_SENDER_ID:", process.env.FIREBASE_MESSAGING_SENDER_ID);
console.log("FIREBASE_APP_ID:", process.env.FIREBASE_APP_ID);

// Initialize Firebase
const currentApps = getApps()
let auth: Auth;
let storage: FirebaseStorage;

if (!currentApps.length) {
    const app = initializeApp(firebaseConfig)
    auth = getAuth(app);
    console.log("auth:", auth)
    storage = getStorage(app);
} else {
    const app = currentApps[0]; // first element
    auth = getAuth(app);
    storage = getStorage(app);
};

export { auth, storage }