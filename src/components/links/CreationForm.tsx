import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Text,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useLinks from '@/hooks/useLinks';
import { useRef } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { isValidUrl } from '@/utils/validation';

type CreationFormProps = {
    isOpen: boolean;
    onClose(id?: string): void;
};

type CreationFormType = {
    url: string;
    name: string | null;
};

const CreationForm = ({ isOpen, onClose }: CreationFormProps) => {
    const cancelRef = useRef(null);
    const { createLink } = useLinks();

    const {
        register,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreationFormType>();

    const onSubmit: SubmitHandler<CreationFormType> = async ({ url, name }) => {
        createLink({ url, name })
            .then((res) => {
                onClose(res);
            })
            .catch((error) => {
                setError('root', {
                    message: error.message,
                    type: error.code,
                });
            });
    };

    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Lien
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <FormControl id="name" isRequired isInvalid={Boolean(errors.name)}>
                                <FormLabel>Nom</FormLabel>
                                <Input {...register('name', { required: true })} />
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl id="url" isRequired isInvalid={Boolean(errors.url)} mt={2}>
                                <FormLabel>Lien</FormLabel>
                                <Input
                                    {...register('url', {
                                        required: true,
                                        validate: (val) =>
                                            isValidUrl(val) || 'Veuillez saisir un lien valide.',
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.url && errors.url.message}
                                </FormErrorMessage>
                            </FormControl>

                            {errors.root && (
                                <Text fontSize="xs" color="red">
                                    {errors.root.message}
                                </Text>
                            )}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => onClose()}>
                                Annuler
                            </Button>
                            <Button
                                leftIcon={<RiAddLine />}
                                isLoading={isSubmitting}
                                type="submit"
                                colorScheme="blue"
                                ml={3}
                            >
                                Ajouter
                            </Button>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default CreationForm;
