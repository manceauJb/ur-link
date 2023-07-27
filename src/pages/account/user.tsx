import BaseLayout from '@/components/layouts/BaseLayout';
import DescriptionForm from '@/components/user/DescriptionForm';
import EmailForm from '@/components/user/EmailForm';
import UsernameForm from '@/components/user/UsernameForm';
import { useAuth } from '@/contexts/AuthUserContext';
import useUserParams from '@/hooks/useUserParams';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

const UserAccount = () => {
    const { user, loading } = useAuth();
    const { loading: paramsLoading } = useUserParams();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading]);

    return (
        <>
            <Flex direction="column" align={'center'} justify={'center'} px={5} gap={10}>
                {(loading || paramsLoading) && 'Loading ...'}
                {!loading && !paramsLoading && (
                    <>
                        <UsernameForm />
                        <EmailForm />
                        <DescriptionForm />
                    </>
                )}
            </Flex>
        </>
    );
};

export default UserAccount;

UserAccount.getLayout = (page: ReactElement) => {
    return <BaseLayout>{page}</BaseLayout>;
};
