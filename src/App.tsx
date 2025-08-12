import { ErrorBoundary } from '@sentry/react';
import AppRoutes from './router';
import { ModalRenderer } from './components/modal';
import LoadingPage from './pages/LoadingPage';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading } from './store/selector/common/common.selector';
import '@copilotkit/react-ui/styles.css';
import { useEffect } from 'react';
import { fetchFirst } from './store/action/common/common.action';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookies } from './utils/cookies/cookies';
import { chefAuth, comonPath, shipAuth } from './defaultValue/admin/auth/auth';


function App() {

    // selector
    const loadingPage = useSelector(selectLoading);

    //hook
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        try {
            console.log(1);
            const user = getCookies('user');
            if (user == undefined) {
                if (location?.pathname.includes('/admin')) {
                    console.log(2);
                    navigate('/404');
                }
            } else if ( comonPath.includes(location?.pathname)){
                console.log(3);
                return
            }
            else {
                const userObj = JSON.parse(user);
                if (userObj?.authorities[0]?.authority == 'ROLE_ADMIN') {
                    if (!location?.pathname?.includes('/admin')) {
                        console.log(4);
                        navigate('/404');
                    }
                } else if (userObj?.authorities[0]?.authority == 'ROLE_SHIPPER') {
                    if (!shipAuth.includes(location?.pathname)) {
                        console.log(5);
                        navigate('/404');
                    }
                } else if (userObj?.authorities[0]?.authority == 'ROLE_CHEF') {
                    if (!chefAuth.includes(location?.pathname)) {
                        console.log(6);
                        navigate('/404');
                    }
                }
            }
        } catch (e) {
            console.log(7);
            navigate('/500');
        }
    });

    // load cookie
    useEffect(() => {   
        dispatch(fetchFirst((e) => navigateToPath(e)));
    }, [dispatch]);

    // event handling
    const navigateToPath = (path: string) => {
        navigate(path);
    };

    return (
        <ErrorBoundary fallback={<p className="text-red-500">Đã xảy ra lỗi!</p>}>
            {loadingPage && <LoadingPage />}
            <AppRoutes />
            <ModalRenderer />
        </ErrorBoundary>
    );
}

export default App;
