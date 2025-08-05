import React from 'react';
import { FilterMobileProps } from '../../../type';
import FormFilterClient from './FormFilterClient';

const FilterMobile: React.FC<FilterMobileProps> = ({ isOpen, onClose, setIsMobile }) => {
    return (
        <div className="">
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
                    onClick={onClose}
                />
            )}
            <div
                className={`
                    fixed top-0 right-0 h-full w-80 bg-white z-[100]
                    transform transition-transform duration-300 ease-in-out lg:hidden
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                <h2 className="mt-10 text-center font-kanit text-xl">Filter Products</h2>
                <div className="">
                    <FormFilterClient />
                </div>
            </div>
        </div>
    );
};

export default FilterMobile;
