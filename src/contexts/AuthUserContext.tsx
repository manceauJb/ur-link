import { createContext, useContext, Context, ReactNode } from 'react'
import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import { UserCredential } from 'firebase/auth';


export type UserInfo = {
  uid: string;
  email: string | null;
  username: string | null;
};

export interface AuthUserContextType {
  user: UserInfo | null;
  loading: boolean;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
  createUserWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
  updateUserEmail: (email: string) => Promise<void>;
  updateUserUsername: (username: string | null) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthUserContext = createContext<AuthUserContextType>({} as AuthUserContextType);

export const AuthUserProvider = ({ children }: { children: ReactNode }) => {
  const auth = useFirebaseAuth();

  return (
    <AuthUserContext.Provider value={auth}>
      {children}
    </AuthUserContext.Provider>
  );
}

export const useAuth = () => useContext(AuthUserContext);