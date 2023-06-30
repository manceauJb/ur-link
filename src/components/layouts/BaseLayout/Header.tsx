import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/contexts/AuthUserContext';
import Link from 'next/link';

const Header = () => {
  const { user } = useAuth();

  return (
    <Flex as="header" width="full" align="center">
      <Heading as='h1' size='xl' noOfLines={1}>
        UR-Link
      </Heading>
      <Flex marginLeft="auto" gap={3}>
        {user ? (
          <Button
            as={Link}
            href="/account/user"
          >
            Profil
          </Button>
        ) : (
          <Button
            as={Link}
            href="/login"
          >
            Connexion
          </Button>
        )}
        <ThemeToggle />
      </Flex>
    </Flex>
  );
};

export default Header;