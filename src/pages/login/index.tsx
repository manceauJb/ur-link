import { ReactElement, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
    Box, FormControl, FormLabel, Input, Stack, Link, Button, Heading, useColorModeValue, FormErrorMessage,
} from '@chakra-ui/react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuth } from '@/contexts/AuthUserContext';
import LoginLayout from '@/components/layouts/LoginLayout';

type LoginFormType = {
    email: string;
    password: string;
}

const Login = () => {
    const router = useRouter();
    const { signInWithEmailAndPassword, user, loading } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormType>()


    const onSubmit: SubmitHandler<LoginFormType> = async ({
        email, password
    }) => {
        // check if passwords match. If they do, create user in Firebase
        // and redirect to your logged in page.
        return signInWithEmailAndPassword(email, password)
            .then((authUser) => {
                console.log("Success. The user is login in Firebase")
                router.push("/account/user");
            })
            .catch((error) => {
                console.log(error.message);
                // An error occurred. Set error message to be displayed to user
            });
    }

    useEffect(() => {
        if (user) {
            router.push('/account/user');
        }
    }, [loading]);

    return (
        <>
            <Heading alignSelf="center" fontSize={'4xl'}>Connexion</Heading>
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
                        <FormControl id="password" isRequired>
                            <FormLabel>Mot de passe</FormLabel>
                            <Input
                                type="password"
                                {...register('password', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Link as={NextLink} color={'blue.400'} href="/">Mot de passe, oublié ?</Link>
                        <Stack mt={3} spacing={6}>
                            <Button
                                isLoading={isSubmitting}
                                colorScheme="blue"
                                type="submit"
                            >
                                Se connecter
                            </Button>
                            <Button
                                as={NextLink}
                                href="/signup"
                                variant='link'
                                disabled={isSubmitting}
                            >
                                Inscription
                            </Button>
                        </Stack>
                    </Stack>
                </form>

            </Box>
        </>
    );
}

export default Login;

Login.getLayout = (page: ReactElement) => {
    return (
        <LoginLayout>
            {page}
        </LoginLayout>
    );
}