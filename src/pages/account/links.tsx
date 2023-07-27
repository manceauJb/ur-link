import { ReactElement } from 'react';
import { Flex, IconButton, useDisclosure } from '@chakra-ui/react';

import BaseLayout from '@/components/layouts/BaseLayout';
import useLinks from '@/hooks/useLinks';
import CreationForm from '@/components/links/CreationForm';
import { RiAddCircleLine } from 'react-icons/ri';
import LinkCard from '@/components/links/Card';
import AuthenticatedGuard from '@/components/guards/AuthenticatedGuard';

const UserLinks = () => {
    const { links, loading } = useLinks();
    const { isOpen, onClose, onOpen } = useDisclosure();

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

                        <IconButton
                            hidden={isOpen}
                            aria-label="Create link"
                            icon={<RiAddCircleLine />}
                            onClick={onOpen}
                        />
                        <CreationForm isOpen={isOpen} onClose={onClose} />
                    </>
                )}
            </Flex>
        </>
    );
};

UserLinks.getLayout = (page: ReactElement) => {
    return <BaseLayout>{page}</BaseLayout>;
};
UserLinks.getGuard = (page: ReactElement) => {
    return <AuthenticatedGuard>{page}</AuthenticatedGuard>;
};

export default UserLinks;
