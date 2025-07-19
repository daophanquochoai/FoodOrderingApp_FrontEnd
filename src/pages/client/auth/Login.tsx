import React from 'react';
import ClientBreadcrumb from '../../../components/breadcrumb/ClientBreadcrumb';
import FloatingInput from '../../../components/input/FloatingInput';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '@/store/action/auth/auth.action';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '@/validation/auth.validation';

const Login = () => {
    // hook
    const dispatch = useDispatch();

    // yup
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: {
            userName: '',
            password: '',
        },
    });

    // event handling
    const onSubmit = (data) => {
        dispatch(loginAction({ username: data.userName, password: data.password }));
    };

    return (
        <div>
            <ClientBreadcrumb title="Account" items={[{ label: 'Home', to: '/' }]} />

            <div className="my-12">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="max-w-xl mx-auto p-8 pt-10 bg-white rounded-sm shadow-sm space-y-5"
                >
                    <h2 className="text-xl md:text-3xl font-kanit font-semibold tracking-wide text-center">
                        Log in to your account
                    </h2>

                    <FloatingInput
                        id="userName"
                        label="User Name"
                        type="text"
                        {...register('userName')}
                        error={!!errors.userName}
                        helperText={errors.userName?.message}
                    />

                    <FloatingInput
                        id="password"
                        label="Password"
                        type="password"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <div className="ml-1">
                        <Link to={'/account/forgot-password'}>
                            <span className="underline-text">Forgot your password?</span>
                        </Link>
                    </div>

                    <button className="btn-primary" type="submit" disabled={isSubmitting}>
                        Sign in
                    </button>

                    <div className="text-center">
                        <Link to={'/account/register'}>
                            <span className="underline-text text-base">
                                No account yet? Create an account
                            </span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
