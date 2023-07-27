import { useAuth } from '@/contexts/AuthUserContext';
import {
    FormControl,
    FormErrorMessage,
    Input,
    InputGroup,
    InputLeftAddon,
    useToast,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormCard from '../FormCard';

type UsernameFormType = {
    username: string | null;
};

const UsernameForm = () => {
    const toast = useToast();
    const { user, updateUserUsername } = useAuth();

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<UsernameFormType>({
        defaultValues: {
            username: user?.username,
        },
    });

    const onSubmit: SubmitHandler<UsernameFormType> = async ({ username }) =>
        updateUserUsername(username)
            .then(() => {
                toast({
                    title: 'Username modifié avec succès',
                    status: 'success',
                });
                reset({ username });
            })
            .catch((error) => {
                setError('username', {
                    message: error.message,
                    type: error.code,
                });
            });

    return (
        <FormCard
            disabled={!isDirty}
            title="Username"
            subtitle="This is your URL namespace."
            isLoading={isSubmitting}
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormControl id="username" isInvalid={Boolean(errors.username)}>
                <InputGroup>
                    <InputLeftAddon>ur-link/</InputLeftAddon>
                    <Input type="username" placeholder="username" {...register('username')} />
                </InputGroup>
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
        </FormCard>
    );
};

export default UsernameForm;
