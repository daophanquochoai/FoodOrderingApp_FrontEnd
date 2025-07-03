import { useState, useEffect } from "react";

interface UseSrcollEffectOptions {
    threshold?: number;
}

export const useScrollEffect = ({ threshold = 50 }: UseSrcollEffectOptions = {}) => {
    const [isScrolled, setIsScrolled] = useState(false);

    // Hook này sẽ theo dõi sự kiện scroll của window và cập nhật trạng thái `isScrolled`
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            setIsScrolled(scrollTop > threshold);
        };

        window.addEventListener("scroll", handleScroll);

        // Clean khi component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [threshold]);

    return isScrolled;
};