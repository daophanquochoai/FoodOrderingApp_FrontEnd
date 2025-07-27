import React, { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { ConfigProvider } from 'antd';

const CopilotKit = lazy(() =>
    import('@copilotkit/react-core').then(module => ({ default: module.CopilotKit }))
);

const AIAgent = lazy(() => import('../components/ai/AIAgent'));

const ClientLayout: React.FC = () => {

    // API URL cho Chat Bot
    const apiAIUrl = import.meta.env.VITE_API_AI_URL;
    
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#f97316',
                    colorPrimaryHover: '#fb923c',
                    colorPrimaryActive: '#ea580c',
                },
            }}
        >
            <div className="min-h-screen bg-gray-500">
                <Header />
                <main className="relative">
                    <Outlet />
                </main>
                <Footer />
                <Suspense fallback={<div>Đang tải AI...</div>}>
                    <CopilotKit runtimeUrl={apiAIUrl} properties={{ id: 'ai-agent' }}>
                        <AIAgent />
                    </CopilotKit>
                </Suspense>
            </div>
        </ConfigProvider>
    );
};

export default ClientLayout;
