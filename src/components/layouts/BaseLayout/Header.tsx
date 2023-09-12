import Link from 'next/link';
import {
    Button,
    Flex,
    Heading,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Stack,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/contexts/AuthUserContext';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Header = () => {
    const { user, logout } = useAuth();
    const { isOpen, onToggle, onClose } = useDisclosure();

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
                    'rgba(26, 32, 44, 0.8)',
                ),
            }}
        >
            <Link href="/">
                <Heading as="h1" size="xl" noOfLines={1}>
                    UR-Link
                </Heading>
            </Link>
            <Flex marginLeft="auto" gap={3}>
                {!user && (
                    <Button as={Link} href="/login">
                        Connexion
                    </Button>
                )}
                <ThemeToggle />
                {user && (
                    <Popover isOpen={isOpen} onClose={onClose} placement="bottom">
                        <PopoverTrigger>
                            <IconButton
                                onClick={onToggle}
                                aria-label="User options"
                                icon={<BsThreeDotsVertical />}
                                variant="solid"
                                w="fit-content"
                            />
                        </PopoverTrigger>
                        <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
                            <PopoverArrow />
                            <PopoverBody onClick={() => onClose()}>
                                <Stack>
                                    <Button
                                        as={Link}
                                        href="/account/user"
                                        variant="ghost"
                                        size="sm"
                                    >
                                        Profil
                                    </Button>
                                    <Button
                                        as={Link}
                                        href="/account/links"
                                        variant="ghost"
                                        size="sm"
                                    >
                                        Liens
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={logout}
                                        variant="ghost"
                                        colorScheme="red"
                                    >
                                        Logout
                                    </Button>
                                </Stack>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                )}
            </Flex>
        </Flex>
    );
};

export default Header;
