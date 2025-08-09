import { Link, useNavigate } from 'react-router-dom';
import ClientBreadcrumb from '../components/breadcrumb/ClientBreadcrumb';
import { getCookies } from '@/utils/cookies/cookies';

const NotFound = () => {
    // hook
    const navigate = useNavigate();

    const handleBack = () => {
        const user = getCookies('user');
        if (user == undefined) {
            navigate('/login');
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
        <>
            <ClientBreadcrumb title="404 Not Found" items={[{ label: 'Home', to: '/' }]} />
            <div className="h-[400px] flex flex-col items-center justify-center">
                <p className="font-bold text-8xl lg:text-9xl">404</p>
                <p className="font-bold mt-2 text-3xl lg:text-4xl">Page not found</p>
                <button onClick={() => handleBack()} className="mt-8 lg:mt-10">
                    <div className="text-white bg-orange-500 font-bold p-4 rounded-full">Back</div>
                </button>
            </div>
        </>
    );
};

export default NotFound;
