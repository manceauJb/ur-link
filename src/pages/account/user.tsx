import { ReactElement } from 'react';
import AuthenticatedGuard from '@/components/guards/AuthenticatedGuard';
import BaseLayout from '@/components/layouts/BaseLayout';
import DescriptionForm from '@/components/user/DescriptionForm';
import EmailForm from '@/components/user/EmailForm';
import UsernameForm from '@/components/user/UsernameForm';
import { useAuth } from '@/contexts/AuthUserContext';
import useUserParams from '@/hooks/useUserParams';
import { Flex } from '@chakra-ui/react';

const UserAccount = () => {
    const { loading } = useAuth();
    const { loading: paramsLoading } = useUserParams();

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

UserAccount.getLayout = (page: ReactElement) => {
    return <BaseLayout>{page}</BaseLayout>;
};
UserAccount.getGuard = (page: ReactElement) => {
    return <AuthenticatedGuard>{page}</AuthenticatedGuard>;
};

export default UserAccount;
