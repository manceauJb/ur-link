import { Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Flex as="footer" width="full" justifyContent="center">
            <Text fontSize="sm">
                {new Date().getFullYear()} -{' '}
                <Link href="https://github.com/manceauJb" isExternal rel="noopener noreferrer">
                    @manceauJb
                </Link>
            </Text>
        </Flex>
    );
};

export default Footer;
