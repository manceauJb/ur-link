import {
    Heading,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    IconButton,
    Text,
    Link,
} from '@chakra-ui/react';
import useLinks, { Link as LinkType } from '@/hooks/useLinks';
import { RiDeleteBin5Line, RiEdit2Line } from 'react-icons/ri';

type CardProps = LinkType;

const LinkCard = ({ url, name, id }: CardProps) => {
    const { deleteLink } = useLinks();

    return (
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
                    onClick={() => deleteLink(id)} // TODO ConfirmDialog
                />
            </CardFooter>
        </Card>
    );
};

export default LinkCard;
