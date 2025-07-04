import React, { useEffect, useState } from "react";
import { useScrollEffect } from "../../hooks/header/useScrollEffect";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch, FaRegUser } from "react-icons/fa";
import { BsBasket } from "react-icons/bs";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const isScrolled = useScrollEffect({ threshold: 50 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cartItemCount = 5;

  const locationHome = useLocation();

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, [isMobile]);

  return (
    <>
      {/* Nếu cuộn xuống 50px thì background từ trong suốt thành màu đen */}
      <header
        className={`text-white font-bold fixed top-0 left-0 right-0 z-50 transition-all duration-300
                ${
                  isMobile
                    ? "bg-black shadow-lg"
                    : isScrolled
                    ? "bg-black shadow-lg"
                    : locationHome.pathname === "/"
                    ? "bg-transparent"
                    : "bg-black"
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
            <div className="w-[147px] h-[54px] m-7">
              <img
                src="https://grillfood-demo.myshopify.com/cdn/shop/files/logo.png?v=1746861780&width=294"
                alt="Logo"
                className="w-full h-auto object-contain cursor-pointer"
                onClick={() => (window.location.href = "/")}
              />
            </div>
          </div>
          <DesktopNav />
          <div className="p-7 flex items-center space-x-8 text-2xl">
            <FaSearch className="hover:text-orange-500 hover:cursor-pointer" />
            <FaRegUser className="hover:text-orange-500 hover:cursor-pointer" />
            <div className="relative">
              <BsBasket className="hover:text-orange-500 hover:cursor-pointer" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex justify-center">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;
