import { ReactElement, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
    Box, FormControl, FormLabel, Input, Stack, Button, Heading, useColorModeValue, FormErrorMessage,
} from '@chakra-ui/react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuth } from '@/contexts/AuthUserContext';
import LoginLayout from '@/components/layouts/LoginLayout';

type SignUpFormType = {
    email: string;
    passwordOne: string;
    passwordTwo: string;
}

const Signup = () => {
    const router = useRouter();
    const { createUserWithEmailAndPassword, loading, user } = useAuth();

    const {
        register,
        handleSubmit,
        setError: setFieldError,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormType>()

    const onSubmit: SubmitHandler<SignUpFormType> = async ({
        email, passwordOne, passwordTwo,
    }) => {
        // check if passwords match. If they do, create user in Firebase
        // and redirect to your logged in page.
        return createUserWithEmailAndPassword(email, passwordOne)
            .then((authUser) => {
                console.log("Success. The user is created in Firebase")
                router.push("/account/user");
            })
            .catch((error) => {
                console.log(error.message);
                setFieldError('root', error);
                // An error occurred. Set error message to be displayed to user
            });
    };

    useEffect(() => {
        if (user) {
            router.push('/account/user');
        }
    }, [loading]);

    return (
        <>
            <Heading alignSelf="center" fontSize={'4xl'}>Inscription</Heading>
            <Box
                rounded={[null, 'lg']}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}
            >
                <form id="login" onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={4}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                defaultValue="test@gmail.com"
                                {...register('email', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl id="passwordOne" isRequired>
                            <FormLabel>Mot de passe</FormLabel>
                            <Input
                                type="password"
                                {...register('passwordOne', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.passwordOne && errors.passwordOne.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl id="passwordTwo" isRequired>
                            <FormLabel>Confirmation du mot de passe</FormLabel>
                            <Input
                                type="password"
                                {...register('passwordTwo', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.passwordTwo && errors.passwordTwo.message}
                            </FormErrorMessage>
                        </FormControl>
                        {errors.root && (
                            <FormErrorMessage>
                                {errors.root.message}
                            </FormErrorMessage>
                        )}
                        <Stack mt={3} spacing={6}>
                            <Button
                                isLoading={isSubmitting}
                                colorScheme="blue"
                                type="submit"
                            >
                                S&apos;inscrire
                            </Button>
                            <Button
                                as={NextLink}
                                href="/login"
                                variant='link'
                                disabled={isSubmitting}
                            >
                                Se connecter
                            </Button>
                        </Stack>
                    </Stack>
                </form>

            </Box>
        </>
    );
}

export default Signup;

Signup.getLayout = (page: ReactElement) => {
    return (
        <LoginLayout>
            {page}
        </LoginLayout>
    );
}