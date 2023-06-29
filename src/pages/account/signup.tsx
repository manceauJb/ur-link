import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@/contexts/AuthUserContext';
import { SubmitHandler, useForm } from 'react-hook-form';

type SignUpFormType = {
    email: string;
    passwordOne: string;
    passwordTwo: string;
}

const SignUp = () => {
    const [error, setError] = useState<string|null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError: setFieldError,
        formState: { errors },
    } = useForm<SignUpFormType>()

    const { createUserWithEmailAndPassword } = useAuth();

    const onSubmit: SubmitHandler<SignUpFormType> = ({
        email, passwordOne, passwordTwo,
    }) => {
        // check if passwords match. If they do, create user in Firebase
        // and redirect to your logged in page.
        if (passwordOne === passwordTwo) {
            createUserWithEmailAndPassword(email, passwordOne)
                .then((authUser) => {
                    console.log("Success. The user is created in Firebase")
                    router.push("/account/user");
                })
                .catch((error) => {
                    setError(error.message);
                    // An error occurred. Set error message to be displayed to user
                });
        }
    };

    return (
        <div className="text-center custom-container">
            <form id="signup" onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue="test@gmail.com" {...register('email', { required: true })} />
                <input type="password" {...register('passwordOne', { required: true })} />
                <input type="password" {...register('passwordTwo'), { required: true }} />

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
    )
}

export default SignUp;