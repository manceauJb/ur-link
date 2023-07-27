import useUserParams from '@/hooks/useUserParams';
import { FormControl, FormErrorMessage, FormLabel, Textarea, useToast } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormCard from '../FormCard';

type DescriptionFormType = {
    description: string | null;
};

const DescriptionForm = () => {
    const toast = useToast();
    const { description, updateDescription } = useUserParams();

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<DescriptionFormType>({
        defaultValues: { description },
    });

    const onSubmit: SubmitHandler<DescriptionFormType> = async ({ description }) =>
        updateDescription(description)
            .then(() => {
                toast({
                    title: 'Description modifiée avec succès',
                    status: 'success',
                });
                reset({ description });
            })
            .catch((error) => {
                setError('description', {
                    message: error.message,
                    type: error.code,
                });
            });

    return (
        <FormCard
            disabled={!isDirty}
            title="Description"
            isLoading={isSubmitting}
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormControl id="description" isInvalid={Boolean(errors.description)}>
                <FormLabel>Description</FormLabel>
                <Textarea {...register('description')} />
                <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>
        </FormCard>
    );
};

export default DescriptionForm;
