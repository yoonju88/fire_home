// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp, getApps } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

// Initialize Firebase
const currentApps = getApps()
let auth: Auth;
let storage: FirebaseStorage;

if (!currentApps.length) {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const storage = getStorage(app)
} else {
    const app = currentApps[0]; // first element
    const auth = getAuth(app)
    const storage = getStorage(app)
}

export { auth, storage }