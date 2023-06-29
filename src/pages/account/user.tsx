import { useAuth } from "@/contexts/AuthUserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";


const UserAccount = () => {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/account/login');
        }
    }, [user, loading]);

    return (
        <>
            Uid: {user?.uid}
            Email: {user?.email}
            <button onClick={signOut}>
                signOut
            </button>
        </>
    )
}

export default UserAccount;
