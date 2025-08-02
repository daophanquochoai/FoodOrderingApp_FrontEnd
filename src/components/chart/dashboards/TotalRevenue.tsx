import React, { useState } from 'react';
import { Line } from '@ant-design/plots';
import { Select } from 'antd';

const { Option } = Select;

const TotalRevenue = () => {
    const rawData = [
        { month: 'Jan', year: '2023', revenue: 10000 },
        { month: 'Feb', year: '2023', revenue: 12000 },
        { month: 'Mar', year: '2023', revenue: 13000 },
        { month: 'Jan', year: '2024', revenue: 15000 },
        { month: 'Feb', year: '2024', revenue: 13500 },
        { month: 'Mar', year: '2024', revenue: 14500 },
        { month: 'Apr', year: '2024', revenue: 15700 },
        { month: 'May', year: '2024', revenue: 16300 },
        { month: 'Jun', year: '2024', revenue: 14900 },
        { month: 'Jul', year: '2024', revenue: 17200 },
        { month: 'Aug', year: '2024', revenue: 18000 },
        { month: 'Sep', year: '2024', revenue: 19000 },
        { month: 'Oct', year: '2024', revenue: 17500 },
        { month: 'Nov', year: '2024', revenue: 16000 },
        { month: 'Dec', year: '2024', revenue: 21000 },
    ];

    const [viewMode, setViewMode] = useState<'month' | 'year'>('month');

    // Dữ liệu theo tháng (mặc định)
    const monthData = rawData;

    // Tính tổng revenue theo năm
    const yearData = rawData.reduce((acc, curr) => {
        const existing = acc.find((item) => item.year === curr.year);
        if (existing) {
            existing.revenue += curr.revenue;
        } else {
            acc.push({ year: curr.year, revenue: curr.revenue });
        }
        return acc;
    }, [] as { year: string; revenue: number }[]);

    const data = viewMode === 'month' ? monthData : yearData;

    const config = {
        data,
        xField: viewMode === 'month' ? 'month' : 'year',
        yField: 'revenue',
        seriesField: viewMode === 'month' ? 'year' : undefined,
        colorField: viewMode === 'month' ? 'year' : undefined,
        lineStyle: {
            lineWidth: 4,
        },
        shapeField: 'smooth',
        point: {
            shapeField: 'circle',
            sizeField: 2,
        },
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <p className="font-semibold text-lg pl-3">Total Revenue</p>
                <Select
                    defaultValue="month"
                    style={{ width: 150 }}
                    onChange={(value: 'month' | 'year') => setViewMode(value)}
                >
                    <Option value="month">Month</Option>
                    <Option value="year">Year</Option>
                </Select>
            </div>
            <Line {...config} />
        </div>
    );
};

export default TotalRevenue;
