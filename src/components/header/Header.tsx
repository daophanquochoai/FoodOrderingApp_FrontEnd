import React, { useEffect, useState } from 'react';
import { useScrollEffect } from '../../hooks/header/useScrollEffect';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsBasket } from 'react-icons/bs';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDropdown } from '../../hooks/header/useDropdown';
import { IoSearchOutline } from 'react-icons/io5';
import { IoPersonOutline } from 'react-icons/io5';
import CartDrawer from '../cart/CartDrawer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '@/store/selector/auth/auth.selector';
import { fetchFirst } from '@/store/action/client/cart/cart.action';
import { selectCart } from '@/store/selector/client/cart/cart.selector';

const Header: React.FC = () => {
    //selector
    const auth = useSelector(selectAuth);
    const cart = useSelector(selectCart);

    //hook
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // event
    const isScrolled = useScrollEffect({ threshold: 50 });
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isOpenCartDraw, setIsOpenCartDraw] = useState(false);
    const { handleDropdownClick, closeDropdown, isOpen, dropdownRef } = useDropdown();
    const locationHome = useLocation();

    useEffect(() => {
        const checkWidth = () => {
            setIsMobile(window.innerWidth < 1030);
        };

        checkWidth();
        window.addEventListener('resize', checkWidth);

        return () => {
            window.removeEventListener('resize', checkWidth);
        };
    }, [isMobile]);

    useEffect(() => {
        if (auth.token && auth.user) {
            dispatch(fetchFirst());
        }
    }, [auth]);

    const handleClickUserIcon = () => {
        if (auth?.user && auth?.token) {
            navigate('/account/customer');
        } else {
            handleDropdownClick('user');
        }
    };

    return (
        <>
            {/* Nếu cuộn xuống 50px thì background từ trong suốt thành màu đen */}
            <header
                className={`text-white font-bold sticky top-0 left-0 right-0 z-[20] transition-all duration-300
                ${
                    isMobile
                        ? 'bg-black shadow-lg'
                        : isScrolled
                        ? 'bg-black shadow-lg'
                        : locationHome.pathname === '/'
                        ? 'bg-transparent'
                        : 'bg-black'
                }
            `}
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="lg:hidden">
                            <GiHamburgerMenu
                                className="text-2xl m-5 cursor-pointer hover:text-orange-500"
                                onClick={() => setIsMobileMenuOpen(true)}
                            />
                        </div>
                        <div className="w-[120px] xl:h-[54px] xl:m-4 lg:h-[45px] lg:m-5">
                            <img
                                src="https://grillfood-demo.myshopify.com/cdn/shop/files/logo.png?v=1746861780&width=294"
                                alt="Logo"
                                className="w-full h-full object-contain cursor-pointer"
                                onClick={() => navigate('/')}
                            />
                        </div>
                    </div>
                    <DesktopNav />
                    <div ref={dropdownRef} className=" p-7 flex items-center space-x-8 text-2xl">
                        <IoSearchOutline className="hover:text-orange-500 lg:size-6 size-5 hover:cursor-pointer" />

                        {auth?.user && auth?.token && (
                            <div className="relative">
                                <BsBasket
                                    className="hover:text-orange-500 hover:cursor-pointer lg:size-6 size-5"
                                    onClick={() => setIsOpenCartDraw(true)}
                                />
                                {cart?.cartItems && (
                                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full lg:h-5 lg:w-5 h-4 w-4 flex justify-center">
                                        {cart?.cartItems?.length > 99
                                            ? '99+'
                                            : cart?.cartItems?.length}
                                    </span>
                                )}
                            </div>
                        )}

                        <IoPersonOutline
                            className="hover:text-orange-500 hover:cursor-pointer lg:size-6 size-5"
                            onClick={handleClickUserIcon}
                        />
                        {isOpen('user') && (
                            <div className="absolute top-full right-5 w-36 bg-white text-black shadow-lg border border-gray-200 z-50 px-4 py-3">
                                <ul>
                                    <li onClick={closeDropdown}>
                                        <Link
                                            to={'/account/login'}
                                            className="hover:text-orange-500 text-base"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                    <li onClick={closeDropdown}>
                                        <Link
                                            to={'/account/register'}
                                            className="hover:text-orange-500 text-base"
                                        >
                                            Register
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <CartDrawer isOpen={isOpenCartDraw} onClose={() => setIsOpenCartDraw(false)} />

            <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
};

export default Header;
