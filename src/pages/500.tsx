import React from 'react';
import { Link } from 'react-router-dom';

// Đường dẫn ảnh, thay bằng ảnh thật của bạn
import burgerImg from '../assets/burger.jpg';
import pizzaImg from '../assets/pizza1.jpg';
import friesImg from '../assets/fries.jpg';
import icecreamImg from '../assets/icecream.jpg';
import drinkImg from '../assets/drink.jpg';
import chickenImg from '../assets/chicken.jpg';

const ServerError500: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-neutral-100">
            {/* Header */}
            <header className="bg-white border-b px-6 py-2 flex items-center justify-between">
                <span className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <span className="inline-block w-6 h-6 rounded-full bg-gradient-to-tr from-pink-400 to-orange-400 flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
                            <circle cx="12" cy="12" r="5" stroke="#fff" strokeWidth="2" />
                        </svg>
                    </span>
                    FastFood Central
                </span>
                <nav className="flex gap-5 text-gray-600 text-sm">
                    <a href="#" className="hover:text-orange-500">
                        Menu
                    </a>
                    <a href="#" className="hover:text-orange-500">
                        Order
                    </a>
                    <a href="#" className="hover:text-orange-500">
                        Locations
                    </a>
                    <a href="#" className="hover:text-orange-500">
                        About Us
                    </a>
                </nav>
            </header>
            {/* Main content */}
            <main className="flex flex-1 items-center justify-center px-2 py-8 bg-neutral-100">
                {/* Left: Food images collage */}
                <div className="relative w-1/2 min-h-[480px] bg-orange-50 rounded-2xl flex items-center justify-center overflow-hidden">
                    {/* Các ảnh món ăn xung quanh */}
                    <img
                        src={burgerImg}
                        alt="burger"
                        className="absolute top-8 left-8 w-32 h-32 object-cover rounded-xl shadow-xl z-10 border-2 border-white"
                    />
                    <img
                        src={drinkImg}
                        alt="drink"
                        className="absolute top-8 right-16 w-24 h-24 object-cover rounded-lg shadow-lg z-10 border-2 border-white"
                    />
                    <img
                        src={chickenImg}
                        alt="chicken"
                        className="absolute bottom-16 left-16 w-28 h-28 object-cover rounded-lg shadow-lg z-10 border-2 border-white"
                    />
                    <img
                        src={icecreamImg}
                        alt="icecream"
                        className="absolute bottom-8 left-1/2 w-20 h-20 object-cover rounded-md shadow-md z-10 border-2 border-white -translate-x-1/2"
                    />
                    <img
                        src={friesImg}
                        alt="fries"
                        className="absolute bottom-8 right-16 w-24 h-24 object-cover rounded-lg shadow-lg z-10 border-2 border-white"
                    />
                    <img
                        src={pizzaImg}
                        alt="pizza"
                        className="absolute top-1/2 right-8 w-24 h-24 object-cover rounded-lg shadow-lg z-10 border-2 border-white -translate-y-1/2"
                    />
                </div>
                {/* Right: Error message */}
                <div className="w-1/2 flex flex-col items-center justify-center px-8">
                    <div className="mb-4">
                        <span className="inline-block bg-gradient-to-r from-pink-400 to-orange-400 rounded-full p-2">
                            <svg
                                width="32"
                                height="32"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="text-white"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01"
                                />
                            </svg>
                        </span>
                    </div>
                    <h1 className="text-7xl font-extrabold text-gray-800 mb-2">500</h1>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        Đã xảy ra lỗi nội bộ!
                    </h2>
                    <p className="text-gray-500 mb-7 text-center max-w-md">
                        Có vẻ như chúng tôi đang gặp chút sự cố. Vui lòng thử lại sau hoặc quay lại
                        trang chính.
                    </p>
                    <div className="flex gap-4">
                        <Link
                            to="/"
                            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold shadow hover:bg-orange-600 transition"
                        >
                            <svg
                                width="20"
                                height="20"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <rect
                                    x="6"
                                    y="11"
                                    width="12"
                                    height="8"
                                    rx="2"
                                    stroke="white"
                                    strokeWidth="2"
                                />
                                <path d="M9 11V7a3 3 0 1 1 6 0v4" stroke="white" strokeWidth="2" />
                            </svg>
                            Quay lại trang chính
                        </Link>
                        <a
                            href="mailto:support@fastfoodcentral.com"
                            className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition"
                        >
                            <svg
                                width="20"
                                height="20"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Z"
                                    stroke="#666"
                                    strokeWidth="2"
                                />
                                <path d="M22 6.5 12 13 2 6.5" stroke="#666" strokeWidth="2" />
                            </svg>
                            Liên hệ hỗ trợ
                        </a>
                    </div>
                </div>
            </main>
            {/* Footer */}
            <footer className="bg-white border-t px-6 py-2 flex items-center justify-between text-gray-400 text-xs">
                <span>© 2025 FastFood Central. All rights reserved.</span>
                <span className="flex gap-2">
                    <a href="#" className="hover:text-orange-500">
                        {' '}
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z" />
                        </svg>
                    </a>
                    <a href="#" className="hover:text-orange-500">
                        {' '}
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5Zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5A4.25 4.25 0 0 1 16.25 20.5h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5Zm8.75 2.25a.75.75 0 0 0-.75.75v1.25h-1.25a.75.75 0 0 0 0 1.5h1.25v1.25a.75.75 0 0 0 1.5 0V9.75h1.25a.75.75 0 0 0 0-1.5h-1.25V7a.75.75 0 0 0-.75-.75ZM12 7.25A4.75 4.75 0 1 0 12 16.75a4.75 4.75 0 0 0 0-9.5Zm0 1.5a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z" />
                        </svg>
                    </a>
                </span>
            </footer>
        </div>
    );
};

export default ServerError500;
