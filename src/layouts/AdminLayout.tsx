import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';
import { MenuSider } from '../components/menu';
import { Outlet } from 'react-router-dom';
import AccountDropdown from '@/components/dropdown/AccountDropdown';
const { Sider, Content } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setCollapsed(true);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div>
            <Layout className="min-h-screen flex flex-col">
                <header className="flex bg-white border-b border-[#ddd] sticky top-0 z-40">
                    <div
                        className="flex items-center justify-center border-r border-[#ddd] transition-all duration-200 ease-in-out"
                        style={{ width: collapsed ? '80px' : '230px', height: '60px' }}
                    >
                        <img
                            src={
                                collapsed
                                    ? 'https://enlink.themenate.net/assets/images/logo/logo-fold.png'
                                    : 'https://enlink.themenate.net/assets/images/logo/logo.png'
                            }
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="p-2 flex flex-1 items-center justify-between">
                        <div className="flex items-center justify-center gap-4">
                            <div
                                className="text-[20px] cursor-pointer mr-5"
                                onClick={() => {
                                    setCollapsed(!collapsed);
                                }}
                            >
                                {collapsed ? (
                                    <AiOutlineMenuUnfold className="size-5" />
                                ) : (
                                    <AiOutlineMenuFold className="size-5" />
                                )}
                            </div>
                        </div>
                        <div className="">
                            <AccountDropdown />
                        </div>
                    </div>
                </header>
                <Layout
                    className="flex flex-row flex-1"
                    style={{
                        overflow: 'auto',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#c0c0c0 transparent',
                    }}
                >
                    <Sider
                        className={`sider`}
                        collapsed={collapsed}
                        theme="light"
                        style={{
                            borderRight: '1px solid #ddd',
                            position: 'fixed',
                            top: '60px',
                            left: '0',
                            zIndex: '30',
                            height: 'calc(100vh - 60px)',
                            overflowY: 'auto',
                        }}
                        width={230}
                    >
                        <MenuSider />
                    </Sider>
                    <Content
                        className="p-5 transition-all duration-200 ease-in-out"
                        style={{
                            marginLeft: !isMobile ? (collapsed ? '80px' : '230px') : '80px',
                            minHeight: 'calc(100vh - 60px)',
                            overflowY: 'auto',
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#c0c0c0 transparent',
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>

                {/* overlay*/}
                {isMobile && !collapsed && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-20"
                        onClick={() => setCollapsed(true)}
                        style={{ top: '60px' }}
                    />
                )}
            </Layout>
        </div>
    );
};

export default AdminLayout;
