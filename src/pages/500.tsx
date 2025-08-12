import React from 'react';

// Đường dẫn ảnh, thay bằng ảnh thật của bạn
import burgerImg from '../assets/burger.jpg';
import pizzaImg from '../assets/pizza1.jpg';
import friesImg from '../assets/fries.jpg';
import icecreamImg from '../assets/icecream.jpg';
import drinkImg from '../assets/drink.jpg';
import chickenImg from '../assets/chicken.jpg';
import { useNavigate } from 'react-router-dom';

const ServerError500: React.FC = () => {

    // hook
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center bg-neutral-100 px-4">
            {/* Main content */}
            <main className="flex items-center justify-center">
                {/* Left: Food images collage */}
                <div className="relative w-1/2 min-h-[480px] bg-orange-50 rounded-2xl flex items-center justify-center overflow-hidden">
                    {/* Vùng trung tâm lớn để sắp ảnh dạng vòng tròn */}
                    <div className="relative w-96 h-96">
                        {/* burger - top left */}
                        <img
                            src={burgerImg}
                            alt="burger"
                            className="absolute w-36 h-36 object-cover rounded-xl shadow-xl z-10 border-4 border-white
                 top-0 left-0 transform -rotate-12"
                        />
                        {/* drink - top right */}
                        <img
                            src={drinkImg}
                            alt="drink"
                            className="absolute w-28 h-28 object-cover rounded-xl shadow-xl z-10 border-4 border-white
                 top-4 right-0 transform rotate-12"
                        />
                        {/* chicken - bottom left */}
                        <img
                            src={chickenImg}
                            alt="chicken"
                            className="absolute w-32 h-32 object-cover rounded-xl shadow-xl z-10 border-4 border-white
                 bottom-4 left-4 transform rotate-6"
                        />
                        {/* ice cream - chính giữa */}
                        <img
                            src={icecreamImg}
                            alt="icecream"
                            className="absolute w-40 h-40 object-cover rounded-full shadow-2xl z-30 border-4 border-white
                 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-110"
                        />
                        {/* fries - bottom right */}
                        <img
                            src={friesImg}
                            alt="fries"
                            className="absolute w-32 h-32 object-cover rounded-xl shadow-xl z-10 border-4 border-white
                 bottom-0 right-0 transform -rotate-3"
                        />
                        {/* pizza - mid right */}
                        <img
                            src={pizzaImg}
                            alt="pizza"
                            className="absolute w-28 h-28 object-cover rounded-xl shadow-xl z-10 border-4 border-white
                 top-1/2 right-0 transform -translate-y-1/2 rotate-[8deg]"
                        />
                    </div>
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
                        <div
                            onClick={()=> navigate(-1)}
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
                        </div>
                        <a
                            href="mailto:thaivcvl2002@gmail.com"
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
        </div>
    );
};

export default ServerError500;
