import { ClientBreadcrumb } from '../../../components/breadcrumb';
import { NavLink, Outlet } from 'react-router-dom';
import { FaRegAddressBook, FaRegUser, FaList } from 'react-icons/fa';
import { RiCoupon3Line } from 'react-icons/ri';
import { LuCircleDollarSign } from 'react-icons/lu';
import { Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogout } from '@/store/action/client/account/account.action';
import { selectInfo } from '@/store/selector/client/account/account.selector';
import { BiLogOut } from 'react-icons/bi';

const Account = () => {
    // hook
    const dispatch = useDispatch();

    // selector
    const accountInfo = useSelector(selectInfo);

    const handleLogout = () => {
        dispatch(actionLogout());
    };

    return (
        <>
            <ClientBreadcrumb title="Account" items={[{ label: 'Home', to: '/' }]} />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] p-4 lg:p-8 gap-4 items-start">
                <div className="bg-white p-6 border border-gray-300 rounded-lg flex flex-col gap-8 min-w-[250px]">
                    <div className="flex flex-col gap-2 border-b border-gray-400 pb-4 items-center justify-center">
                        <Avatar
                            className="w-28 h-28 border-2 border-gray-400"
                            src={
                                <img
                                    src={accountInfo?.image || ''}
                                    alt="avatar"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null; // tránh lặp vô hạn nếu ảnh mặc định cũng lỗi
                                        e.currentTarget.src = '../../../assets/avatar.webp'; // đường dẫn ảnh mặc định
                                    }}
                                />
                            }
                        />
                        <p className="font-bold text-xl">{accountInfo?.name}</p>
                    </div>
                    <NavLink
                        to={'/account/customer'}
                        className={({ isActive }) =>
                            `w-fit flex items-center gap-2 hover:text-orange-600${
                                isActive ? ' text-orange-600 font-semibold' : ''
                            }`
                        }
                    >
                        <FaRegUser className="text-2xl" />
                        <p>Personal profile</p>
                    </NavLink>
                    <NavLink
                        to={'/account/addresses'}
                        className={({ isActive }) =>
                            `w-fit flex items-center gap-2 hover:text-orange-600${
                                isActive ? ' text-orange-600 font-semibold' : ''
                            }`
                        }
                    >
                        <FaRegAddressBook className="text-2xl" />
                        <p>Addresses</p>
                    </NavLink>
                    <NavLink
                        to={'/account/orders'}
                        className={({ isActive }) =>
                            `w-fit flex items-center gap-2 hover:text-orange-600${
                                isActive ? ' text-orange-600 font-semibold' : ''
                            }`
                        }
                    >
                        <FaList className="text-2xl" />
                        <p>My orders</p>
                    </NavLink>
                    {/* <NavLink
                        to={'/account/vouchers'}
                        className={({ isActive }) =>
                            `w-fit flex items-center gap-2 hover:text-orange-600${
                                isActive ? ' text-orange-600 font-semibold' : ''
                            }`
                        }
                    >
                        <RiCoupon3Line className="text-2xl" />
                        <p>Vouchers</p>
                    </NavLink>
                    <NavLink
                        to={'/account/points'}
                        className={({ isActive }) =>
                            `w-fit flex items-center gap-2 hover:text-orange-600${
                                isActive ? ' text-orange-600 font-semibold' : ''
                            }`
                        }
                    >
                        <LuCircleDollarSign className="text-2xl" />
                        <p>Points</p>
                    </NavLink> */}

                    <div
                        className="w-full flex items-center gap-2 hover:text-orange-600 pt-3 border-t-2 border-gray-300 cursor-pointer font-bold"
                        onClick={handleLogout}
                    >
                        <BiLogOut className="size-6" />
                        <p className="">Logout</p>
                    </div>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Account;
