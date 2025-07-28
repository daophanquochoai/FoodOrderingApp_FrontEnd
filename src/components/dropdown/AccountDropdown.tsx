import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';

const items: MenuProps['items'] = [
    {
        label: <Link to="/admin/account" className="menu-item-link">Admin</Link>,
        key: '0',
    },
    {
        type: 'divider',
    },
    {
        label: (
        <Button
            type="primary"
            danger
            block
            className="menu-item-logout"
            style={{width: "120px"}}
        >
            Logout
        </Button>
        ),
        key: '3',
    },
];


const AccountDropdown = () => (
    <Dropdown menu={{ items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
        <Space>
            <div
                className="rounded-full overflow-hidden"
                style={{ width: '35px', height: '35px' }}
            >
                <img
                    src="https://banobagi.vn/wp-content/uploads/2025/04/anh-avatar-dep-cho-con-trai-1.jpeg"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
        </Space>
        </a>
    </Dropdown>
);

export default AccountDropdown;