import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        onClose();
        navigate('/');
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}
            <div
                className={`
                fixed top-0 left-0 h-full w-80 bg-white z-50 
                transform transition-transform duration-300 ease-in-out lg:hidden
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <FaTimes className="text-2xl cursor-pointer" onClick={onClose} />
                </div>
                <nav className="p-4 space-y-4 border-b border-gray-700">
                    <span
                        className="block text-lg hover:text-orange-500 transition-colors cursor-pointer"
                        onClick={handleHomeClick}
                    >
                        Home
                    </span>

                    <NavLink
                        to={'/collections'}
                        className="block text-lg hover:text-orange-500 transition-colors"
                        onClick={onClose}
                    >
                        Pizza
                    </NavLink>

                    <NavLink
                        to={'/collections'}
                        className="block text-lg hover:text-orange-500 transition-colors"
                        onClick={onClose}
                    >
                        Collections
                    </NavLink>

                    <NavLink
                        to={'/collections'}
                        className="block text-lg hover:text-orange-500 transition-colors"
                        onClick={onClose}
                    >
                        Burger
                    </NavLink>

                    <NavLink
                        to={'/about'}
                        className="block text-lg hover:text-orange-500 transition-colors"
                        onClick={onClose}
                    >
                        About
                    </NavLink>

                    <NavLink
                        to={'/contact'}
                        className="block text-lg hover:text-orange-500 transition-colors"
                        onClick={onClose}
                    >
                        Contact
                    </NavLink>
                </nav>
            </div>
        </>
    );
};

export default MobileNav;
