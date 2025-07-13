import React from 'react';
import category_1 from '../../assets/pizza1.webp';

import { useNavigate } from 'react-router-dom';
import { Category } from '../../type';

const CategoryItem: React.FC<Category> = (category) => {
    const { image, name, id, small } = category;
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
        // h-[280px] sm:h-[320px] md:h-[380px] lg:h-[390px]
        <div
            className={`group flex flex-col justify-center items-center cursor-pointer h-full ${
                small ? '' : ''
            }`}
            onClick={handleClickDetail}
        >
            <div className={`${small ? 'h-[65%]' : 'h-[55%]'} p-3 overflow-hidden`}>
                <img
                    src={image}
                    alt="category_image"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-[750ms]"
                />
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
                <h3
                    className={`font-kanit  ${
                        small
                            ? 'text-[18px] group-hover:text-orange-primary font-base'
                            : 'text-[18px] font-medium'
                    } line-clamp-1`}
                >
                    {name}
                </h3>
                {small ? null : (
                    <p
                        className={`group-hover:visible underline-text-orange ${
                            small ? 'text-[16px]' : 'text-[16px]'
                        } transition-all duration-200 ease-in`}
                    >
                        Order Now
                    </p>
                )}
            </div>
        </div>
    );
};

export default CategoryItem;
