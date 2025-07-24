import React from 'react';
import { AiOutlineBarChart, AiOutlineDashboard } from 'react-icons/ai';
import { IoStorefrontOutline } from 'react-icons/io5';
import { VscSourceControl } from 'react-icons/vsc';
import { BiFoodMenu } from 'react-icons/bi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { MdOutlineCategory, MdOutlineManageAccounts } from 'react-icons/md';
import { CiDiscount1 } from 'react-icons/ci';
import { LuNotebookPen } from 'react-icons/lu';
import { CgSmartHomeRefrigerator } from 'react-icons/cg';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { GiChart } from 'react-icons/gi';

const MenuSider = () => {
    const baseAdmin: string = '/admin';

    const items = [
        {
            key: 'system',
            label: 'System Management',
            icon: <AiOutlineDashboard />,
            children: [
                {
                    key: '/',
                    label: <Link to={`${baseAdmin}`}>Dashboard</Link>,
                },
                {
                    key: '/account-management',
                    label: <Link to={`${baseAdmin}`}>Account Management</Link>,
                    icon: <MdOutlineManageAccounts />,
                },
            ],
        },
        {
            key: 'store',
            label: 'Store Management',
            icon: <IoStorefrontOutline />,
            children: [
                {
                    key: '2',
                    label: 'Store Info',
                },
                {
                    key: '/order-management',
                    label: <Link to={`${baseAdmin}`}>Order Management</Link>,
                    icon: <LuNotebookPen />,
                },
                {
                    key: '/voucher-management',
                    label: <Link to={`${baseAdmin}/voucher-management`}>Voucher Management</Link>,
                    icon: <CiDiscount1 />,
                },
            ],
        },
        {
            key: 'product',
            label: 'Product Management',
            icon: <IoFastFoodOutline />,
            children: [
                {
                    key: '/category-management',
                    label: <Link to={`${baseAdmin}/category-management`}>Category Management</Link>,
                    icon: <MdOutlineCategory />,
                },
                {
                    key: '/product-management',
                    label: <Link to={`${baseAdmin}/product-management`}>Product Management</Link>,
                    icon: <IoFastFoodOutline />,
                },
                {
                    key: '/recipe-management',
                    label: <Link to={`${baseAdmin}`}>Recipe Management</Link>,
                    icon: <BiFoodMenu />,
                },
                {
                    key: '/ingredient-management',
                    label: (
                        <Link to={`${baseAdmin}/ingredient-management`}>Ingredient Management</Link>
                    ),
                    icon: <CgSmartHomeRefrigerator />,
                },
                {
                    key: '/source-management',
                    label: <Link to={`${baseAdmin}`}>Source Management</Link>,
                    icon: <VscSourceControl />,
                },
            ],
        },
        {
            key: 'statistics',
            label: 'Statistics',
            icon: <AiOutlineBarChart />,
            children: [
                {
                    key: '/profit-statistics',
                    label: <Link to={`${baseAdmin}`}>Profit Statistics</Link>,
                    icon: <GiChart />,
                },
                {
                    key: '/product-statistics',
                    label: <Link to={`${baseAdmin}`}>Product Statistics</Link>,
                    icon: <AiOutlineBarChart />,
                },
            ],
        },
    ];
    return (
        <div>
            <Menu mode="inline" defaultSelectedKeys={['/']} defaultOpenKeys={['1']} items={items} />
        </div>
    );
};

export default MenuSider;
