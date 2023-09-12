import { FormEventHandler, ReactNode } from 'react';
import { Button, Heading, Text, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';

type FormCardProps = {
    children: ReactNode;
    title: string;
    disabled?: boolean;
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
    disabled,
    submitCaption = 'Enregistrer',
    onSubmit,
}: FormCardProps) => (
    <Card maxWidth={['md', 'lg']} width="100%">
        <CardHeader>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                {title}
            </Heading>
            {subtitle && <Text>{subtitle}</Text>}
        </CardHeader>
        <form onSubmit={onSubmit}>
            <CardBody>{children}</CardBody>
            <CardFooter>
                <Button isDisabled={disabled} isLoading={isLoading} type="submit" ml="auto">
                    {submitCaption}
                </Button>
            </CardFooter>
        </form>
    </Card>
);

export default FormCard;
