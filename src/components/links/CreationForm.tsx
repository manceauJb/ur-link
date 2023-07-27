import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useLinks from '@/hooks/useLinks';

type CreationFormProps = {
    onClose(id?: string): void;
};

type CreationFormType = {
    url: string;
    name: string | null;
};

const CreationForm = ({ onClose }: CreationFormProps) => {
    const { createLink } = useLinks();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreationFormType>();

    const onSubmit: SubmitHandler<CreationFormType> = async ({ url, name }) => {
        createLink({ url, name })
            .then((res) => {
                console.log('ok', res);
                onClose(res);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="name" isRequired isInvalid={Boolean(errors.name)}>
                <FormLabel>Nom</FormLabel>
                <Input {...register('name', { required: true })} />
                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="url" isRequired isInvalid={Boolean(errors.url)}>
                <FormLabel>Lien</FormLabel>
                <Input {...register('url', { required: true })} />
                <FormErrorMessage>{errors.url && errors.url.message}</FormErrorMessage>
            </FormControl>

            <Flex mt={4} gap={2}>
                <Button onClick={() => onClose()}>Annuler</Button>
                <Button isLoading={isSubmitting} type="submit" ml="auto" colorScheme="blue">
                    Ajouter
                </Button>
            </Flex>
        </form>
    );
};

export default CreationForm;
