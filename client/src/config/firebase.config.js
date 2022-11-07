import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'


// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_ID,
//     appId: process.env.REACT_APP_FIREBASE_APPI_ID,
// };

const firebaseConfig = {
    apiKey: "AIzaSyDhn3espdi7lpVQMU1pWX6hw-rsqoVH6mk",
    authDomain: "amusic-b533a.firebaseapp.com",
    projectId: "amusic-b533a",
    storageBucket: "amusic-b533a.appspot.com",
    messagingSenderId: "815736161842",
    appId: "1:815736161842:web:4213838bb1b3e4fa149e2b",
    measurementId: "G-4FDKDYRNKC"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const storage = getStorage(app);

export { app, storage }
