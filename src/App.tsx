import { ErrorBoundary } from '@sentry/react';
import AppRoutes from './router';
import { ModalRenderer } from './components/modal';
import LoadingPage from './pages/LoadingPage';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading } from './store/selector/common/common.selector';
import { CopilotKit } from '@copilotkit/react-core';
import '@copilotkit/react-ui/styles.css';
import { useEffect } from 'react';
import { fetchFirst } from './store/action/common/common.action';
import { useNavigate } from 'react-router-dom';

function App() {
    // selector
    const loadingPage = useSelector(selectLoading);

    //hook
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Truyền API key ví dụ cho CopilotKit
    const apiAIUrl = import.meta.env.VITE_API_AI_URL;

    // load cookie
    useEffect(() => {
        dispatch(fetchFirst((e) => navigateToPath(e)));
    }, [dispatch]);

    // event handling
    const navigateToPath = (path: string) => {
        navigate(path);
    };

    return (
        <CopilotKit runtimeUrl={apiAIUrl} properties={{ id: 'ai-agent' }}>
            <ErrorBoundary fallback={<p className="text-red-500">Đã xảy ra lỗi!</p>}>
                {loadingPage && <LoadingPage />}
                <AppRoutes />
                <ModalRenderer />
            </ErrorBoundary>
        </CopilotKit>
    );
}

export default App;
