import React, { useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import { Button } from 'antd';
import FilterMobile from './categoryProduct/FilterMobile';
import FormFilterClient from './categoryProduct/FormFilterClient';

export default function FilterBar() {
    const [isMobile, setIsMobile] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    return (
        <div className="mb-4">
            <div className="lg:hidden">
                <Button onClick={() => setIsMobile(true)}>
                    <CiFilter /> Filter
                </Button>

                <FilterMobile
                    setIsMobile={setIsMobile}
                    isOpen={isMobile}
                    onClose={() => setIsMobile(false)}
                />
            </div>

            <Button
                onClick={() => setShowFilter(true)}
                className={`hidden ${!showFilter ? 'lg:flex' : 'lg:hidden'}`}
            >
                <CiFilter /> Filter
            </Button>

            <div className={`${showFilter ? 'lg:block' : 'hidden'} pt-4`}>
                <FormFilterClient setShowFilter={setShowFilter} />
            </div>
        </div>
    );
}
