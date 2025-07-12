import React, { useState } from 'react';
import { FormFilter } from '../category';
import { CiFilter } from 'react-icons/ci';
import { Button } from 'antd';
import FilterMobile from './categoryProduct/FilterMobile';

export default function FilterBar() {
    const [isMobile, setIsMobile] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    return (
        <div className="mb-4">
            <div className="lg:hidden">
                <Button onClick={() => setIsMobile(true)}>
                    <CiFilter /> Filter
                </Button>

                <FilterMobile isOpen={isMobile} onClose={() => setIsMobile(false)} />
            </div>

            <Button onClick={() => setShowFilter((prev) => !prev)} className="hidden lg:flex">
                <CiFilter /> Filter
            </Button>

            <div className={`${showFilter ? 'lg:block' : 'hidden'} pt-4`}>
                <FormFilter />
            </div>
        </div>
    );
}
