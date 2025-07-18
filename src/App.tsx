import { ErrorBoundary } from '@sentry/react';
import AppRoutes from './router';
import { ModalRenderer } from './components/modal';
import LoadingPage from './pages/LoadingPage';
import { useSelector } from 'react-redux';
import { selectLoading } from './store/selector/common/common.selector';

function App() {
    // selector
    const loadingPage = useSelector(selectLoading);

    return (
        <ErrorBoundary fallback={<p className="text-red-500">Đã xảy ra lỗi!</p>}>
            {loadingPage && <LoadingPage />}
            <AppRoutes />
            <ModalRenderer />
        </ErrorBoundary>
    );
}

export default App;
