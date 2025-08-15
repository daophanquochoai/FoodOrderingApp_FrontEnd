import { getCookies } from '@/utils/cookies/cookies';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FallbackError = ({ resetError }: { resetError: () => void }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const user = getCookies('user');

    const goHome = () => {
        resetError(); // Xóa trạng thái lỗi của ErrorBoundary
        if (user == undefined) {
            navigate('/');
        } else {
            const userObj = JSON.parse(user);
            if (userObj?.authorities[0]?.authority == 'ROLE_ADMIN') {
                navigate('/admin');
            } else if (userObj?.authorities[0]?.authority == 'ROLE_SHIPPER') {
                navigate('/admin/order-management-shipper');
            } else if (userObj?.authorities[0]?.authority == 'ROLE_CHEF') {
                navigate('/admin/order-management-chef');
            } else {
                navigate('/');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 text-center px-6 overflow-hidden">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="150"
                height="150"
                viewBox="0 0 64 64"
                className="animate-bounce mb-6"
            >
                <g>
                    <path
                        fill="#f4a300"
                        d="M2 30c0-6.627 7.163-12 16-12h28c8.837 0 16 5.373 16 12H2z"
                    />
                    <path
                        fill="#8b4513"
                        d="M0 34c0-1.105.895-2 2-2h60c1.105 0 2 .895 2 2s-.895 2-2 2H2c-1.105 0-2-.895-2-2z"
                    />
                    <path fill="#ffce54" d="M4 40h56v4H4z" />
                    <path
                        fill="#8b4513"
                        d="M0 48c0-1.105.895-2 2-2h60c1.105 0 2 .895 2 2s-.895 2-2 2H2c-1.105 0-2-.895-2-2z"
                    />
                </g>
            </svg>

            <h1 className="text-3xl font-bold text-orange-600 mb-2">Oops! Something went wrong</h1>

            <p className="text-gray-700 mb-6 max-w-md">
                The website is experiencing some minor issues. In the meantime, you can return to
                the home page or reload!
            </p>

            <div className="flex gap-4">
                <button
                    onClick={() => navigate(location.pathname)}
                    className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition"
                >
                    Retry
                </button>
                <button
                    onClick={goHome}
                    className="border border-orange-500 text-orange-500 px-5 py-2 rounded-full hover:bg-orange-100 transition"
                >
                    Back to home page
                </button>
            </div>
        </div>
    );
};

export default FallbackError;
