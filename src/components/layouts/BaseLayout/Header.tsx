import { Box, Button, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/contexts/AuthUserContext';
import Link from 'next/link';

const Header = () => {
  const { user } = useAuth();

  return (
    <Flex
      as="header"
      width="full"
      align="center"
      px="2rem"
      py={2}
      pos="fixed"
      top="0"
      boxShadow="sm"
      css={{
        zIndex: 9999,
        backdropFilter: 'saturate(180%) blur(5px)',
        backgroundColor: useColorModeValue(
          'rgba(255, 255, 255, 0.8)',
          'rgba(26, 32, 44, 0.8)'
        ),
      }}
    >
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