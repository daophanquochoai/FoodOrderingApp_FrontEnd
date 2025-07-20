import React, { useEffect, useState } from 'react';
import ClientBreadcrumb from '../../../components/breadcrumb/ClientBreadcrumb';
import FloatingInput from '../../../components/input/FloatingInput';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '@/store/action/auth/auth.action';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '@/validation/auth.validation';
import { Spin } from 'antd';
import { selectAuth } from '@/store/selector/auth/auth.selector';

const Login = () => {
    // hook
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //selector
    const auth = useSelector(selectAuth);

    //state
    const [loading, setLoading] = useState(false);

    // yup
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: {
            userName: 'dpquochoai@gmail.com',
            password: 'StrongP@ssw0rd',
        },
    });
    // event handling
    const onSubmit = (data) => {
        setLoading(true);
        dispatch(loginAction({ username: data.userName, password: data.password }));
        setLoading(false);
    };

    return (
        <div>
            <ClientBreadcrumb title="Account" items={[{ label: 'Home', to: '/' }]} />

            <div className="my-12">
                <Spin spinning={loading}>
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
                </Spin>
            </div>
        </div>
    );
};

export default Login;
