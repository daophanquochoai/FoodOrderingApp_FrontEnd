import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { ConfigProvider } from 'antd';

const ClientLayout: React.FC = () => {
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
            </div>
        </ConfigProvider>
    );
};

export default ClientLayout;
