// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { 
getAuth 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
const firebaseConfig = {

apiKey: "AIzaSyAZ_XL6S9Z9BYPwiqnC_OGDMQrq4VODMoo",

authDomain: "ezee-vision-erp.firebaseapp.com",

projectId: "ezee-vision-erp",

storageBucket: "ezee-vision-erp.firebasestorage. app",

messagingSenderId: "87600683468",

appId: "1:87600683468:web:a4ae92fc6a8a0e4c88e569"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
