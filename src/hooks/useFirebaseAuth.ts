import { useState, useEffect } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import { UserInfo } from "@/contexts/AuthUserContext";

const formatAuthUser = (user: User): UserInfo => ({
  uid: user.uid,
  email: user.email,
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
    var formattedUser = formatAuthUser(authState);
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
    logout: () => signOut(auth).then(clear),
  };
}
