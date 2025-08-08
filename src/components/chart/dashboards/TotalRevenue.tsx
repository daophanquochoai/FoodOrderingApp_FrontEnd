import React, { useState } from 'react';
import { Line } from '@ant-design/plots';
import { Select } from 'antd';

const TotalRevenue = () => {
    const rawData = {
        year: '2024',
        data: [
            { month: '1', year: '2024', revenue: 15000 },
            { month: '2', year: '2024', revenue: 13500 },
            { month: '3', year: '2024', revenue: 14500 },
            { month: '4', year: '2024', revenue: 15700 },
            { month: '5', year: '2024', revenue: 16300 },
            { month: '6', year: '2024', revenue: 14900 },
            { month: '7', year: '2024', revenue: 17200 },
            { month: '8', year: '2024', revenue: 18000 },
            { month: '9', year: '2024', revenue: 19000 },
            { month: '10', year: '2024', revenue: 17500 },
            { month: '11', year: '2024', revenue: 16000 },
            { month: '12', year: '2024', revenue: 21000 },
        ],
    };

    const config = {
        data: rawData?.data || [],
        xField: 'month',
        yField: 'revenue',
        shapeField: 'smooth',
        point: {
            shapeField: 'circle',
            sizeField: 2,
        },
    };

    const options = [
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' },
        { value: '2025', label: '2025' },
    ];

    return (
        <div>
            <div className="flex items-center justify-between">
                <p className="font-semibold text-lg pl-3">Total Revenue</p>
                <Select
                    showSearch
                    placeholder={'Year'}
                    defaultValue={rawData?.year || null}
                    options={options}
                    allowClear
                    style={{ minWidth: '120px' }}
                />
            </div>
            <Line {...config} />
        </div>
    );
};

export default TotalRevenue;
