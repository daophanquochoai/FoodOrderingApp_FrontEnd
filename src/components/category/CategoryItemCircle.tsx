import React from 'react';

const CategoryItemCircle = (c) => {
    return (
        <div
            onClick={() => console.log(c)}
            className="cursor-pointer group flex flex-col items-center"
        >
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden shadow-md border-2 border-transparent group-hover:border-blue-500 transition duration-300">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
            </div>
            <p className="mt-2 text-center text-sm font-medium text-gray-800 group-hover:text-blue-600 transition">
                {c.name}
            </p>
        </div>
    );
};

export default CategoryItemCircle;
