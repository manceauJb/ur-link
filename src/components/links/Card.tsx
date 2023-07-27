import { useRef } from 'react';
import {
    Heading,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    IconButton,
    Text,
    Link,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
} from '@chakra-ui/react';
import useLinks, { Link as LinkType } from '@/hooks/useLinks';
import { RiDeleteBin5Line, RiEdit2Line } from 'react-icons/ri';

type CardProps = LinkType;

const LinkCard = ({ url, name, id }: CardProps) => {
    const { deleteLink } = useLinks();

    const cancelRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Card size="sm" maxWidth={'md'} width="100%">
                <CardHeader>
                    <Heading size="md"> {name}</Heading>
                </CardHeader>
                <CardBody>
                    <Text>
                        Lien:{' '}
                        <Link isExternal rel="noopener noreferrer" href={url}>
                            {url}
                        </Link>
                    </Text>
                </CardBody>
                <CardFooter justify="flex-end" gap={2}>
                    <IconButton
                        aria-label="edit link"
                        icon={<RiEdit2Line />}
                        // onClick={toggleFormView}
                    />
                    <IconButton
                        aria-label="delete link"
                        icon={<RiDeleteBin5Line />}
                        onClick={() => onOpen()}
                    />
                </CardFooter>
            </Card>

            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Suppression du lien &quot;{name}&quot;
                        </AlertDialogHeader>
                        <AlertDialogBody>Cette action est irréversible.</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Annuler
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={() => {
                                    deleteLink(id);
                                    onClose();
                                }}
                                ml={3}
                            >
                                Supprimer
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default LinkCard;
