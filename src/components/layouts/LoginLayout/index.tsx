import type { ReactNode } from 'react';
import { Box, Flex, Stack, useColorModeValue } from '@chakra-ui/react';

type LayoutProps = {
    children: ReactNode;
};

const LoginLayout = ({ children }: LayoutProps) => {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} minW="md" mx="auto" maxW="lg" py={12} px={6}>
                {children}
            </Stack>
        </Flex>
    );
};

export default LoginLayout;