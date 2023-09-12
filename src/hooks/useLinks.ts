import { useState, useEffect } from 'react';
import {
    onSnapshot,
    collection,
    QuerySnapshot,
    DocumentData,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
} from 'firebase/firestore';
import { auth, firestore } from '@/utils/firebase';
import { useAuth } from '@/contexts/AuthUserContext';

export type Link = {
    id: string;
    url: string;
    name: string | null;
};

export default function useLinks() {
    const { user } = useAuth();

    const [links, setLinks] = useState<Link[] | null>(null);
    const [loading, setLoading] = useState(true);

    const linksStateChanged = async (links: QuerySnapshot<DocumentData>) => {
        // const res = await query;
        const results = links.docs.map(
            (link) =>
                ({
                    id: link.id,
                    ...link.data(),
                } as Link),
        );
        setLinks(results);
        setLoading(false);
    };

    const createLink = async (link: Partial<Link>): Promise<string> => {
        if (!auth.currentUser) throw new Error('permission error');

        const docRef = await addDoc(
            collection(firestore, 'users', auth.currentUser.uid, 'links'),
            link,
        );
        return docRef.id;
    };

    const updateLink = async (id: string, link: Link): Promise<boolean> => {
        if (!auth.currentUser) throw new Error('permission error');
        await updateDoc(doc(firestore, 'users', auth.currentUser.uid, 'links', id), link);
        return true;
    };

    const deleteLink = async (id: string): Promise<boolean> => {
        if (!auth.currentUser) throw new Error('permission error');
        await deleteDoc(doc(firestore, 'users', auth.currentUser.uid, 'links', id));
        return true;
    };

    // listen for firestore state change
    useEffect(() => {
        if (!auth.currentUser || !user) return;

        const collectionRef = collection(firestore, 'users', auth.currentUser.uid, 'links');
        const unsubscribe = onSnapshot(collectionRef, linksStateChanged);
        return () => unsubscribe();
    }, [user]);

    return {
        loading,
        links,
        createLink,
        deleteLink,
        updateLink,
    };
}
