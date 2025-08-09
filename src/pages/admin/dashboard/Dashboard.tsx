import { CardSummary } from '@/components/card';
import { Col, Row, Spin } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { AiOutlineDollar } from 'react-icons/ai';
import { MdShoppingCart } from 'react-icons/md';
import { RiBookletLine } from 'react-icons/ri';
import { RiAccountCircleLine } from 'react-icons/ri';
import { MdOutlineFastfood } from 'react-icons/md';
import TotalRevenue from '@/components/chart/dashboards/TotalRevenue';
import { FaStoreAlt } from 'react-icons/fa';
import RevenueFood from '@/components/chart/dashboards/RevenueFood';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardTotal, fetchOrderYears, fetchMonthlyRevenue } from '@/store/action/admin/dashboard/dashboard.action';
import { selectDashboardTotal, selectLoading, selectYearSelected } from '@/store/selector/admin/dashboard/dashboard.selector';

const Dashboard = () => {
    const dispatch = useDispatch();
    const dashboardTotal = useSelector(selectDashboardTotal);
    const loading = useSelector(selectLoading);
    const yearSelected = useSelector(selectYearSelected);

    useEffect(() => {
        dispatch(fetchDashboardTotal());
        dispatch(fetchOrderYears());
    }, []);

    useEffect(() => {
        if (yearSelected) {
            dispatch(fetchMonthlyRevenue({ year: yearSelected }));
        }
    }, [yearSelected]);

    return (
        <Spin spinning={loading}>
            <Row gutter={[20, 20]}>
                <Col lg={6} sm={12} span={24}>
                    <CardSummary
                        icon={AiOutlineDollar}
                        color="blue"
                        number={dashboardTotal?.totalRevenue || 0}
                        text="Profit"
                        type="profit"
                    />
                </Col>
                <Col lg={6} sm={12} span={24}>
                    <CardSummary icon={MdOutlineFastfood} color="green" number={dashboardTotal?.totalFoods || 0} text="Foods" />
                </Col>
                <Col lg={6} sm={12} span={24}>
                    <CardSummary icon={RiBookletLine} color="yellow" number={dashboardTotal?.totalOrders || 0} text="Orders" />
                </Col>
                <Col lg={6} sm={12} span={24}>
                    <CardSummary icon={FaStoreAlt} color="purple" number={dashboardTotal?.totalSupplier || 0} text="Suppliers" />
                </Col>
            </Row>

            <Row gutter={[20, 20]}>
                <Col lg={16} span={24}>
                    <div className="bg-white p-3 rounded-md my-5">
                        <TotalRevenue />
                    </div>
                </Col>
                <Col lg={8} span={24}>
                    <div className="bg-white p-3 rounded-md my-5">
                        <RevenueFood />
                    </div>
                </Col>
            </Row>
        </Spin>
    );
};

export default Dashboard;
