import { ErrorBoundary } from '@sentry/react';
import AppRoutes from './router';
import { useState } from 'react';
import { ModalRenderer } from './components/modal';
import { ConfigProvider } from 'antd';
import { ModalState } from './type/modal/modal';

// function MyComponent() {
//   // Gây lỗi thử để test Sentry
//   throw new Error("Lỗi thử nghiệm trong MyComponent!");
//   return <div>Xin chào</div>;
// }

function App() {
    return (
        <ErrorBoundary fallback={<p className="text-red-500">Đã xảy ra lỗi!</p>}>
            {/* <MyComponent /> */}
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#f97316',
                        colorPrimaryHover: '#fb923c',
                        colorPrimaryActive: '#ea580c',
                    },
                }}
            >
                <AppRoutes />
                <ModalRenderer />
            </ConfigProvider>
        </ErrorBoundary>
    );
}

export default App;
