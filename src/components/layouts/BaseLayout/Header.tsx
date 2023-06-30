import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <Heading as='h1' size='xl' noOfLines={1}>
        UR-Link
      </Heading>
      <Flex marginLeft="auto" gap={3}>
        <Button>
          Login
        </Button>
        <ThemeToggle />
      </Flex>
    </Flex>
  );
};

export default Header;