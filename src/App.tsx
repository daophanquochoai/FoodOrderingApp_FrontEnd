import { ErrorBoundary } from '@sentry/react';
import AppRoutes from './router';
import { ModalRenderer } from './components/modal';
import LoadingPage from './pages/LoadingPage';
import { useSelector } from 'react-redux';
import { selectLoading } from './store/selector/common/common.selector';
import { CopilotKit } from '@copilotkit/react-core';
import "@copilotkit/react-ui/styles.css";

function App() {
    // selector
    const loadingPage = useSelector(selectLoading);

    // Truyền API key ví dụ cho CopilotKit
    const copilotApiKey = "http://localhost:3000/api/chatbot";

    return (
        <CopilotKit 
            runtimeUrl={copilotApiKey}
            properties={{ id: 'ai-agent' }}
        >
            <ErrorBoundary fallback={<p className="text-red-500">Đã xảy ra lỗi!</p>}>
                {loadingPage && <LoadingPage />}
                <AppRoutes />
                <ModalRenderer />
            </ErrorBoundary>
        </CopilotKit>
        
    );
}

export default App;
