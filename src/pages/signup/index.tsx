import { ReactElement, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    Text,
} from '@chakra-ui/react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuth } from '@/contexts/AuthUserContext';
import LoginLayout from '@/components/layouts/LoginLayout';

type SignUpFormType = {
    email: string;
    passwordOne: string;
    passwordTwo: string;
};

const Signup = () => {
    const router = useRouter();
    const { createUserWithEmailAndPassword, loading, user } = useAuth();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormType>();

    const onSubmit: SubmitHandler<SignUpFormType> = async ({ email, passwordOne }) => {
        // check if passwords match. If they do, create user in Firebase
        // and redirect to your logged in page.
        return createUserWithEmailAndPassword(email, passwordOne)
            .then(() => {
                console.log('Success. The user is created in Firebase');
                router.push('/account/user');
            })
            .catch((error) => {
                setError('root', {
                    message: error.message,
                    type: error.code,
                });
            });
    };

    useEffect(() => {
        if (user) {
            router.push('/account/user');
        }
    }, [loading]);

    return (
        <>
            <Heading alignSelf="center" fontSize={'4xl'}>
                Inscription
            </Heading>
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
                        </FormControl>
                        <FormControl id="passwordOne" isRequired>
                            <FormLabel>Mot de passe</FormLabel>
                            <Input
                                type="password"
                                {...register('passwordOne', { required: true })}
                            />
                        </FormControl>
                        <FormControl id="passwordTwo" isRequired>
                            <FormLabel>Confirmation du mot de passe</FormLabel>
                            <Input
                                type="password"
                                {...register('passwordTwo', { required: true })}
                            />
                        </FormControl>
                        {errors.root && (
                            <Text fontSize="xs" color="red">
                                {errors.root.message}
                            </Text>
                        )}
                        <Stack mt={3} spacing={6}>
                            <Button isLoading={isSubmitting} colorScheme="blue" type="submit">
                                S&apos;inscrire
                            </Button>
                            <Button
                                as={NextLink}
                                href="/login"
                                variant="link"
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
};

export default Signup;

Signup.getLayout = (page: ReactElement) => {
    return <LoginLayout>{page}</LoginLayout>;
};
