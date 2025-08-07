import { Button, Space } from 'antd';
import React, { useState } from 'react';
import FilterField from './FilterField';
import { IoCloseOutline } from 'react-icons/io5';
import { CiFilter } from 'react-icons/ci';

const FilterBar = ({ fields = [], values = {}, onChange, onReset, type, onApply }) => {
    const [openFilter, setOpenFilter] = useState(false);

    const handleFilter = () => {
        if (onApply) {
            onApply(values);
        } else {
            console.log(type);
            console.log(values);
        }
        setOpenFilter(false);
    };

    return (
        <div>
            {/* ẩn hiện nút lọc */}
            <div className={`${openFilter ? 'hidden' : ''} `}>
                <Button onClick={() => setOpenFilter(true)}>
                    <CiFilter /> Filter
                </Button>
            </div>

            {/* ẩn hiện form filter */}
            <div
                className={`bg-white p-2 pt-4 pb-3 rounded-md relative transition-all duration-500 ease-linear ${
                    openFilter ? '' : 'hidden'
                }`}
            >
                <div
                    onClick={() => setOpenFilter(false)}
                    className="absolute w-[25px] h-[25px] rounded-full flex items-center justify-center bg-white border border-gray-50 hover:bg-gray-50 hover:border-gray-200 -top-[10px] -right-[10px] cursor-pointer"
                >
                    <IoCloseOutline className="size-4 text-gray-600 hover:text-gray-800" />
                </div>

                <Space wrap>
                    {fields.map((field) => (
                        <FilterField
                            key={field.key}
                            value={values[field.key]}
                            field={field}
                            onChange={onChange}
                        />
                    ))}

                    <div className="bg-gray-300 w-[1px] h-[25px] mx-2"></div>

                    <Button type="primary" onClick={handleFilter}>
                        Apply
                    </Button>
                    <Button onClick={onReset}>Reset</Button>
                </Space>
            </div>
        </div>
    );
};

export default FilterBar;
