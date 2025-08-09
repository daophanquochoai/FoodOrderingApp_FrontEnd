import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import { Empty, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setYearSelected, fetchMonthlyRevenue } from '@/store/action/admin/dashboard/dashboard.action';
import { selectOrderYears, selectMonthlyRevenue, selectYearSelected } from '@/store/selector/admin/dashboard/dashboard.selector';

const TotalRevenue = () => {
    const dispatch = useDispatch();
    const orderYears = useSelector(selectOrderYears);
    const monthlyRevenue = useSelector(selectMonthlyRevenue);
    const yearSelected = useSelector(selectYearSelected);

    const chartData = monthlyRevenue?.map(item => ({
        month: item.month.toString(),
        year: yearSelected?.toString(),
        revenue: item.revenue || 0,
    })) || [];  

    // useEffect(() => {
    //     if (yearSelected) {
    //         dispatch(fetchMonthlyRevenue({ year: yearSelected }));
    //     }
    // }, [yearSelected]);

    // const rawData = {
    //     year: '2024',
    //     data: [
    //         { month: '1', year: '2024', revenue: 15000 },
    //         { month: '2', year: '2024', revenue: 13500 },
    //         { month: '3', year: '2024', revenue: 14500 },
    //         { month: '4', year: '2024', revenue: 15700 },
    //         { month: '5', year: '2024', revenue: 16300 },
    //         { month: '6', year: '2024', revenue: 14900 },
    //         { month: '7', year: '2024', revenue: 17200 },
    //         { month: '8', year: '2024', revenue: 18000 },
    //         { month: '9', year: '2024', revenue: 19000 },
    //         { month: '10', year: '2024', revenue: 17500 },
    //         { month: '11', year: '2024', revenue: 16000 },
    //         { month: '12', year: '2024', revenue: 21000 },
    //     ],
    // };

    const config = {
        data: chartData,
        xField: 'month',
        yField: 'revenue',
        shapeField: 'smooth',
        point: {
            shapeField: 'circle',
            sizeField: 2,
        },
        tooltip: {
            formatter: (datum) => {
                return {
                    name: `Tháng ${datum.month}`,
                    value: new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        maximumFractionDigits: 0
                    }).format(datum.revenue)
                };
            }
        },
        yAxis: {
            label: {
                formatter: (value) => {
                    // Định dạng số thành dạng gọn như 10K, 20M
                    if (value >= 1000000000) {
                        return `${(value / 1000000000).toFixed(1)}B`;
                    } else if (value >= 1000000) {
                        return `${(value / 1000000).toFixed(1)}M`;
                    } else if (value >= 1000) {
                        return `${(value / 1000).toFixed(1)}K`;
                    }
                    return value;
                }
            }
        }
    };

    const yearOptions = orderYears?.map(year => ({
        value: year.year.toString(),
        label: year.year.toString()
    })) || [];

    const handleYearChange = (year) => {
        dispatch(setYearSelected(Number(year)));
        dispatch(fetchMonthlyRevenue({ year: Number(year) }));
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <p className="font-semibold text-lg pl-3">Total Revenue</p>
                {yearOptions.length > 0 && (
                    <Select
                        showSearch
                        placeholder={'Year'}
                        value={yearSelected?.toString()}
                        options={yearOptions}
                        onChange={handleYearChange}
                        style={{ minWidth: '120px' }}
                    />
                )}
            </div>
            {chartData.length > 0 ? (
                <Line {...config} />
            ) : (
                <Empty description="Không có dữ liệu doanh thu" className="py-8" />
            )}
        </div>
    );
};

export default TotalRevenue;
