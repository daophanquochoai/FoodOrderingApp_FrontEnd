import React from 'react';

const LoadingPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fffbe6] to-[#ffe0b2] overflow-hidden absolute w-screen top-0 left-0 h-screen">
            <div>
                {/* Logo nhà hàng lắc nhẹ */}
                <div className="food-icon-tech animate-shake">
                    <img
                        src="https://grillfood-demo.myshopify.com/cdn/shop/files/logo.png?v=1746861780&width=294"
                        alt="Logo nhà hàng"
                        className="w-[140px] h-[140px] object-contain block"
                    />
                </div>
            </div>
            <h2 className="wave-text text-[#FF9800] font-bold text-[28px] mb-2 inline-block relative">
                Đang tải...
            </h2>
            <p className="text-[#333] text-lg">Hãy chuẩn bị vị giác cho những món ăn ngon!</p>
            <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        .animate-shake {
          animation: shake 1.2s infinite cubic-bezier(.36,.07,.19,.97);
        }
        .wave-text::after {
          content: '';
          display: block;
          position: absolute;
          left: 0; right: 0; bottom: -4px;
          height: 4px;
          background: linear-gradient(90deg, #FF9800 0%, #ffe0b2 100%);
          border-radius: 2px;
          animation: wave 1.2s infinite linear;
        }
        @keyframes wave {
          0% { left: 0; right: 80%; }
          50% { left: 20%; right: 20%; }
          100% { left: 80%; right: 0; }
        }
      `}</style>
        </div>
    );
};

export default LoadingPage;
