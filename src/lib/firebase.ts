import { initializeApp } from 'firebase/app';
import { getAuth } from '@firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FB_API_KEY,
    authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FB_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FB_APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

function isFirebaseError(error: unknown): error is { code: string } {
    return (typeof error === 'object' && error !== null && 'code' in error);
}

const firebaseErrorRecord: Record<string, string> = {
    'auth/user-not-found': 'No user associated with email.',
    'auth/wrong-password': 'The password is not valid.',
    'auth/weak-password': 'The password must be 6 characters long or more.',
    'auth/email-already-in-use': 'The email address is already in use by another account.',
};
// https://firebase.google.com/docs/reference/js/auth#autherrorcodes
// https://stackoverflow.com/questions/39152004/where-can-i-find-a-list-of-all-error-codes-and-messages-for-firebase-authenticat

export { app, auth, isFirebaseError, firebaseErrorRecord, };