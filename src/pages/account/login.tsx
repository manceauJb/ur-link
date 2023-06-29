import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@/contexts/AuthUserContext';
import { SubmitHandler, useForm } from 'react-hook-form';

type LoginFormType = {
    email: string;
    password: string;
}

const Login = () => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError: setFieldError,
        formState: { errors },
    } = useForm<LoginFormType>()

    const { signInWithEmailAndPassword } = useAuth();

    const onSubmit: SubmitHandler<LoginFormType> = ({
        email, password
    }) => {
        // check if passwords match. If they do, create user in Firebase
        // and redirect to your logged in page.
        signInWithEmailAndPassword(email, password)
            .then((authUser) => {
                console.log("Success. The user is login in Firebase")
                router.push("/account/user");
            })
            .catch((error) => {
                setError(error.message);
                // An error occurred. Set error message to be displayed to user
            });
    }

    return (
        <div className="text-center custom-container">
            <form id="login" onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue="test@gmail.com" {...register('email', { required: true })} />
                <input type="password" {...register('password', { required: true })} />

                {error && (
                    <span>
                        {error}
                    </span>
                )}

                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Login;