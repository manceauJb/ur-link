import { useState, useEffect } from 'react';
import {
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateEmail,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '@/utils/firebase';
import { UserInfo } from '@/contexts/AuthUserContext';

const formatAuthUser = (user: User): UserInfo => ({
    uid: user.uid,
    email: user.email,
    username: user.displayName,
});

export default function useFirebaseAuth() {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);

    const authStateChanged = async (authState: User | null) => {
        if (!authState) {
            setUser(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        const formattedUser = formatAuthUser(authState);
        setUser(formattedUser);
        setLoading(false);
    };

    const clear = () => {
        setUser(null);
        setLoading(false);
    };

    const signInWithEmail = (email: string, password: string) =>
        signInWithEmailAndPassword(auth, email, password);

    const createUserWithEmail = (email: string, password: string) =>
        createUserWithEmailAndPassword(auth, email, password);

    const updateUserEmail = (email: string) => {
        const user = auth.currentUser;
        if (!user) throw new Error('User invalid');
        return updateEmail(user, email);
    };

    const updateUserUsername = async (username: string | null) => {
        const user = auth.currentUser;
        if (!user) throw new Error('User invalid');

        const currentUsername = user.displayName;

        if (username) {
            await updateDoc(doc(firestore, `users`, user.uid), { username });
            await setDoc(doc(firestore, `usernames`, username), { uid: user.uid });
        }

        // Delete old ref
        if (currentUsername && currentUsername !== username) {
            await deleteDoc(doc(firestore, `usernames`, currentUsername));
            if (!username) await setDoc(doc(firestore, `users`, user.uid), { username: null });
        }

        return updateProfile(user, { displayName: username });
    };

    // listen for Firebase state change
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        user,
        loading,
        signInWithEmailAndPassword: signInWithEmail,
        createUserWithEmailAndPassword: createUserWithEmail,
        updateUserEmail,
        updateUserUsername,
        logout: () => signOut(auth).then(clear),
    };
}
