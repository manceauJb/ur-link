import { useState, useEffect } from 'react';
import {
    onSnapshot,
    collection,
    DocumentData,
    doc,
    DocumentSnapshot,
    updateDoc,
} from 'firebase/firestore';
import { auth, firestore } from '@/utils/firebase';
import { useAuth } from '@/contexts/AuthUserContext';

export default function useUserParams() {
    const { user } = useAuth();

    const [description, setDescription] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const userStateChanged = async (snapshot: DocumentSnapshot<DocumentData>) => {
        const data = snapshot.data();

        setDescription(data?.description || null);
        setLoading(false);
    };

    const updateDescription = (description: string | null) => {
        const user = auth.currentUser;
        if (!auth.currentUser || !user) throw new Error('User invalid');

        return updateDoc(doc(firestore, 'users', auth.currentUser.uid), { description });
    };

    // listen for firestore state change
    useEffect(() => {
        if (!auth.currentUser || !user) return;

        const documentRef = doc(collection(firestore, 'users'), auth.currentUser.uid);
        const unsubscribe = onSnapshot(documentRef, userStateChanged);
        return () => unsubscribe();
    }, [user]);

    return {
        loading,
        description,
        updateDescription,
    };
}
