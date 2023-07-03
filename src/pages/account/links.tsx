import { ReactElement } from 'react';
import { Flex, Text } from '@chakra-ui/react';

import BaseLayout from '@/components/layouts/BaseLayout';
import useLinks from '@/hooks/useLinks';

const UserAccount = () => {
    const { links, loading } = useLinks();

    return (
        <>
            <Flex direction="column" align={'center'} justify={'center'} px={5} gap={10}>
                {loading && 'Loading ...'}
                {!loading && (
                    <>
                        {!links && 'Aucun lien'}
                        {links?.map((link, index) => (
                            <Text key={`link_name_${index}`}>{link.name}</Text>
                        ))}
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
