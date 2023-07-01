import { useAuth } from '@/contexts/AuthUserContext';
import {
    FormControl,
    FormErrorMessage,
    Input,
    InputGroup,
    InputLeftAddon,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormCard from '../FormCard';

type UsernameFormType = {
    username: string | null;
}

const UsernameForm = () => {
    const { user, updateUserUsername } = useAuth();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<UsernameFormType>({
        defaultValues: {
            username: user?.username,
        }
    })

    const onSubmit: SubmitHandler<UsernameFormType> = async ({ username }) => updateUserUsername(username)
        .then((user) => {
            console.log('ok');
        })
        .catch((error) => {
            setError('username', {
                message: error.message,
                type: error.code,
            });
        });

    return (
        <FormCard
            title="Username"
            subtitle="This is your URL namespace."
            isLoading={isSubmitting}
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormControl id="username" isInvalid={Boolean(errors.username)}>
                <InputGroup>
                    <InputLeftAddon>
                        ur-link/
                    </InputLeftAddon>
                    <Input
                        type="username"
                        placeholder="username"
                        {...register('username')}
                    />
                </InputGroup>
                <FormErrorMessage>
                    {errors.username?.message}
                </FormErrorMessage>
            </FormControl>
        </FormCard>
    );
}

export default UsernameForm;
