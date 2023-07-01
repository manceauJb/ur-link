import { Box, useColorModeValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

const BaseLayout = ({ children }: LayoutProps) => {
  return (
    <Box
      margin="0 auto"
      transition="0.5s ease-out"
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <Header />
      <Box
        as="main"
        pt="80px"
        pb={22}
        minH="100vh"
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default BaseLayout;