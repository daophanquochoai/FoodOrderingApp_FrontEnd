import React from 'react';
import burger from '../../assets/burger.jpg';
import { useNavigate } from 'react-router-dom';
import { Category } from '@/type/store/client/collection/collection.style';
import { FaChevronRight } from 'react-icons/fa6';

const CategoryItem: React.FC<Category> = (category) => {
    const { image, name, id } = category;
    const small = '';
    const navigate = useNavigate();

    const handleClickDetail = () => {
        const newParams = new URLSearchParams();
        newParams.set('detail', String(id));
        navigate({
            pathname: '/collections',
            search: `?${newParams.toString()}`,
        });
    };

    return (
        <div
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer overflow-hidden border border-gray-100 hover:border-orange-200 h-full flex flex-col"
            onClick={handleClickDetail}
        >
            {/* image container */}
            <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                    src={image || burger}
                    alt={name}
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = burger;
                    }}
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* category indicator */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <div className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                        <FaChevronRight className="size-2" />
                    </div>
                </div>
            </div>

            {/* content */}
            <div className="p-3 bg-white">
                <h3 className="font-semibold text-gray-800 text-sm leading-tight text-center group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                    {name}
                </h3>

                {/* subtle */}
                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300 ease-out mx-auto mt-2"></div>
            </div>

            {/* hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
    );
};

export default CategoryItem;
