import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';
import { MenuSider } from '../components/menu';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import AccountDropdown from '@/components/dropdown/AccountDropdown';
const { Sider, Content } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            setCollapsed(true);
        }
    }, []);

    return (
        <div>
            <Layout className="layout-default">
                <header className="flex bg-white border-b border-[#ddd]">
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
                        <div className="flex items-center justify-center">
                            <div
                                className="text-[20px] cursor-pointer mr-5"
                                onClick={() => {
                                    setCollapsed(!collapsed);
                                }}
                            >
                                {collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
                            </div>
                            <div className="">{/* <SearchOutlined /> */}</div>
                        </div>
                        <div className="">
                            <AccountDropdown />
                        </div>
                    </div>
                </header>
                <Layout style={{ minHeight: 'Calc(100vh - 62px)' }}>
                    <Sider
                        className="sider "
                        collapsed={collapsed}
                        theme="light"
                        style={{ borderRight: '1px solid #ddd' }}
                        width={230}
                    >
                        <MenuSider />
                    </Sider>
                    <Content className="p-5">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default AdminLayout;
