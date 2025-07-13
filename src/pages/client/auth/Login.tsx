import React, { useState } from 'react';
import ClientBreadcrumb from '../../../components/breadcrumb/ClientBreadcrumb';
import FloatingInput from '../../../components/input/FloatingInput';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../../store/selector/auth/auth.selector';

const Login = () => {

    // selector 
    const auth = useSelector(selectAuth);

    console.log(auth)

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email.trim()) {
            setError('Please enter your email.');
            return;
        }

        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email.');
            return;
        }

        if (!formData.password.trim()) {
            setError('Please enter your password.');
            return;
        }

        setError('');

    };

    return (
        <div>
            <ClientBreadcrumb title="Account" items={[{ label: 'Home', to: '/' }]} />

            <div className="my-12">
                <form
                    onSubmit={handleSignIn}
                    className="max-w-xl mx-auto p-8 pt-10 bg-white rounded-sm shadow-sm space-y-5"
                >
                    <h2 className="text-xl md:text-3xl font-kanit font-semibold tracking-wide text-center">
                        Log in to your account
                    </h2>

                    <FloatingInput
                        id="email"
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <FloatingInput
                        id="password"
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <div className="ml-1">
                        <Link to={'/account/forgot-password'}>
                            <span className="underline-text">Forgot your password?</span>
                        </Link>
                    </div>

                    {error && <p className="text-sm text-red-500 pl-1">{error}</p>}

                    <button className="btn-primary" type="submit">
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
