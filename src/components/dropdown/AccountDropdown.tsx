import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionLogout } from '@/store/action/client/account/account.action';
import { FaRegUser } from 'react-icons/fa';

const AccountDropdown = () => {
    // dispatch
    const dispatch = useDispatch();

    // event handling
    const handleLogout = () => {
        dispatch(actionLogout());
    };

    // items
    const items: MenuProps['items'] = [
        {
            label: (
                <Link to="/admin/account" className="menu-item-link">
                    Admin
                </Link>
            ),
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
                    style={{ width: '120px' }}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            ),
            key: '3',
        },
    ];

    return (
        <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <div className="mr-3 p-2 w-[40px] h-[40px] rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                        <FaRegUser className="size-5" />
                    </div>
                </Space>
            </a>
        </Dropdown>
    );
};

export default AccountDropdown;
