import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

const BaseLayout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" maxWidth={900} transition="0.5s ease-out">
      <Box margin="8">
        <Header />
        <Box as="main" marginY={22} minH="70vh">
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default BaseLayout;