import { FormControl, FormErrorMessage, FormLabel, Input, useToast } from '@chakra-ui/react';
import { useAuth } from '@/contexts/AuthUserContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormCard from '../FormCard';

type EmailFormType = {
    email: string | null;
};

const EmailForm = () => {
    const toast = useToast();
    const { user, updateUserEmail } = useAuth();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isDirty },
        reset,
    } = useForm<EmailFormType>({
        defaultValues: {
            email: user?.email,
        },
    });

    const onSubmit: SubmitHandler<EmailFormType> = async ({ email }) =>
        updateUserEmail(email as string)
            .then(() => {
                toast({
                    title: 'Adresse e-mail modifiée avec succès',
                    status: 'success',
                });
                reset({ email });
            })
            .catch((error) => {
                setError('email', {
                    message: error.message,
                    type: error.code,
                });
            });

    return (
        <FormCard
            disabled={!isDirty}
            title="Email"
            subtitle="Adresse e-mail utilisée pour la connexion."
            isLoading={isSubmitting}
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormControl id="email" isRequired isInvalid={Boolean(errors.email)}>
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    defaultValue="test@gmail.com"
                    {...register('email', { required: true })}
                />
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>
        </FormCard>
    );
};

export default EmailForm;
