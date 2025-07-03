import React from "react";
import { NavLink } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { useDropdown } from '../../hooks/header/useDropdown';

const DesktopNav: React.FC = () => {
    const { handleDropdownClick, closeDropdown, isOpen, dropdownRef } = useDropdown();

    return (
        <nav ref={dropdownRef} className="hidden lg:flex items-center space-x-6 xl:space-x-10">
            <span 
                className={"hover:text-orange-500 cursor-pointer"}
                onClick={() => window.location.href = '/'}
            >
                HOME
            </span>  

            {/* Pizza Dropdown */}
            <div className="relative">
                <div 
                    className="flex items-center cursor-pointer hover:text-orange-500"
                    onClick={() => handleDropdownClick('pizza')}
                >
                    PIZZA
                    <FaChevronDown className="ml-3 text-xs"/>
                </div>
                {isOpen('pizza') && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                        <div className="py-2">
                            <NavLink 
                                to="/" 
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-orange-500"
                                onClick={closeDropdown}
                            >
                                Margherita Pizza
                            </NavLink>
                            <NavLink 
                                to="/" 
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-orange-500"
                                onClick={closeDropdown}
                            >
                                Pepperoni Pizza
                            </NavLink>
                            <NavLink 
                                to="/" 
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-orange-500"
                                onClick={closeDropdown}
                            >
                                Hawaiian Pizza
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>
        
            <NavLink to={"/"} className={"hover:text-orange-500"}>
                COLLECTIONS
            </NavLink>

            {/* Burger Dropdown */}
            <div className="relative">
                <div 
                    className="flex items-center cursor-pointer hover:text-orange-500"
                    onClick={() => handleDropdownClick('burger')}
                >
                    BURGER
                    <FaChevronDown className="ml-3 text-xs"/>
                </div>
                {isOpen('burger') && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                        <div className="py-2">
                            <NavLink 
                                to="/" 
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-orange-500"
                                onClick={closeDropdown}
                            >
                                Classic Burger
                            </NavLink>
                            <NavLink 
                                to="/" 
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-orange-500"
                                onClick={closeDropdown}
                            >
                                Cheese Burger
                            </NavLink>
                            <NavLink 
                                to="/" 
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-orange-500"
                                onClick={closeDropdown}
                            >
                                Chicken Burger
                            </NavLink>
                        </div>  
                    </div>
                )}
            </div>

            {/* More Dropdown */}
            <div className="relative">
                <div 
                    className="flex items-center cursor-pointer hover:text-orange-500"
                    onClick={() => handleDropdownClick('more')}
                >
                    MORE
                    <FaChevronDown className="ml-3 text-xs"/>
                </div>
                {isOpen('more') && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                        <div className="py-2">
                            <NavLink 
                                to="/" 
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-orange-500"
                                onClick={closeDropdown}
                            >
                                ABOUT
                            </NavLink>
                            <NavLink 
                                to="/" 
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-orange-500"
                                onClick={closeDropdown}
                            >
                                CONTACT
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default DesktopNav;