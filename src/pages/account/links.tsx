import { ReactElement, useState } from 'react';
import { Flex, IconButton } from '@chakra-ui/react';

import BaseLayout from '@/components/layouts/BaseLayout';
import useLinks from '@/hooks/useLinks';
import CreationForm from '@/components/links/CreationForm';
import { RiAddCircleLine } from 'react-icons/ri';
import LinkCard from '@/components/links/Card';

const UserAccount = () => {
    const { links, loading } = useLinks();

    const [creationForm, setCreationForm] = useState<boolean>(false);
    const toggleCreationForm = () => setCreationForm((v) => !v);

    return (
        <>
            <Flex direction="column" align={'center'} justify={'center'} px={5} gap={10}>
                {loading && 'Loading ...'}
                {!loading && (
                    <>
                        {!links && 'Aucun lien'}
                        {links?.map((link, index) => (
                            <LinkCard key={`link_name_${index}`} {...link} />
                        ))}
                        {creationForm && <CreationForm onClose={toggleCreationForm} />}
                        {!creationForm && (
                            <IconButton
                                aria-label="add link"
                                icon={<RiAddCircleLine />}
                                onClick={toggleCreationForm}
                            />
                        )}
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
