import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseAdminConfig = {
    credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
};

export const app = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];
export const auth: Auth = getAuth(app);
export const firestore = getFirestore(app);
