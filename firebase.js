import admin from "firebase-admin";
import config from "./config.js";

// ==========================
// Firebase Configuration
// ==========================

const firebaseConfig = {

    credential: admin.credential.cert({

        projectId: config.firebase.projectId,

        clientEmail: config.firebase.clientEmail,

        privateKey: config.firebase.privateKey

    })

};

// ==========================
// Initialize Firebase
// ==========================

let firebaseApp;

try {

    firebaseApp = admin.initializeApp(firebaseConfig);

    console.log("✅ Firebase Connected");

} catch (err) {

    console.log("❌ Firebase Error");

    console.log(err.message);

}

// ==========================
// Auth
// ==========================

export const auth = admin.auth();

// ==========================
// Verify Google Token
// ==========================

export async function verifyGoogleToken(idToken) {

    try {

        const decoded = await auth.verifyIdToken(idToken);

        return {

            success: true,

            uid: decoded.uid,

            email: decoded.email,

            name: decoded.name,

            picture: decoded.picture

        };

    } catch (err) {

        return {

            success: false,

            message: err.message

        };

    }

}

export default firebaseApp;
