import { FormEventHandler, ReactNode } from 'react';
import { Button, Heading, Text, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';

type FormCardProps = {
    children: ReactNode;
    title: string;
    isLoading: boolean;
    onSubmit: FormEventHandler<HTMLFormElement>;
    submitCaption?: string;
    subtitle?: string;
};

const FormCard = ({
    children,
    title,
    subtitle,
    isLoading,
    submitCaption = 'Enregistrer',
    onSubmit,
}: FormCardProps) => (
    <Card width={'md'}>
        <CardHeader>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                {title}
            </Heading>
            {subtitle && <Text>{subtitle}</Text>}
        </CardHeader>
        <form onSubmit={onSubmit}>
            <CardBody>{children}</CardBody>
            <CardFooter>
                <Button isLoading={isLoading} type="submit" ml="auto">
                    {submitCaption}
                </Button>
            </CardFooter>
        </form>
    </Card>
);

export default FormCard;
