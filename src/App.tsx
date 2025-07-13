import { ErrorBoundary } from '@sentry/react';
import AppRoutes from './router';
import { ModalRenderer } from './components/modal';

function App() {
    return (
        <ErrorBoundary fallback={<p className="text-red-500">Đã xảy ra lỗi!</p>}>
            {/* <MyComponent /> */}

            <AppRoutes />
            <ModalRenderer />
        </ErrorBoundary>
    );
}

export default App;
