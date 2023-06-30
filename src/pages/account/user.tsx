import { useAuth } from "@/contexts/AuthUserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";


const UserAccount = () => {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading]);

    return (
        <>
            Uid: {user?.uid}
            Email: {user?.email}
            <button onClick={logout}>
                logout
            </button>
        </>
    )
}

export default UserAccount;