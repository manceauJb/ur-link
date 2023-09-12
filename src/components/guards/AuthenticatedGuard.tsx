import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthUserContext';

type LayoutProps = {
    children: ReactElement;
};

const AuthenticatedGuard = ({ children }: LayoutProps): ReactElement => {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) router.push('/');
    }, [user, loading]);

    return <>{children}</>;
};

export default AuthenticatedGuard;
