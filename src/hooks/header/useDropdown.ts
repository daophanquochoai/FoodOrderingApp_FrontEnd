import { useState, useEffect, useRef } from 'react';

export const useDropdown = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    
    // Nhấn vào mục nào thì hiện dropdown tương ứng, nhấn lại thì đóng dropdown đó
    const handleDropdownClick = (menu: string) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    // Đóng dropdown hiện tại
    const closeDropdown = () => {
        setOpenDropdown(null);
    };

    // Kiểm tra xem dropdown có đang mở hay không
    const isOpen = (menu: string) => {
        return openDropdown === menu;
    };

    // Xử lý sự kiện click bên ngoài để đó  ng dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return {
        openDropdown,
        handleDropdownClick,
        closeDropdown,
        isOpen,
        dropdownRef
    };
};