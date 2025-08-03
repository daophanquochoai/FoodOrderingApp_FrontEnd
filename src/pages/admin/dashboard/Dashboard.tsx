import { CardSummary } from '@/components/card';
import { Col, Row } from 'antd';
import React from 'react';
import { AiOutlineDollar } from 'react-icons/ai';
import { MdShoppingCart } from 'react-icons/md';
import { RiBookletLine } from 'react-icons/ri';
import { RiAccountCircleLine } from 'react-icons/ri';
import { MdOutlineFastfood } from 'react-icons/md';
import TotalRevenue from '@/components/chart/dashboards/TotalRevenue';
import { FaStoreAlt } from 'react-icons/fa';
import RevenueFood from '@/components/chart/dashboards/RevenueFood';

const Dashboard = () => {
    return (
        <div>
            <Row gutter={[20, 20]}>
                <Col lg={6} sm={12} span={24}>
                    <CardSummary
                        icon={AiOutlineDollar}
                        color="blue"
                        number={23523}
                        text="Profit"
                        type="profit"
                    />
                </Col>
                <Col lg={6} sm={12} span={24}>
                    <CardSummary icon={MdOutlineFastfood} color="green" number={120} text="Foods" />
                </Col>
                <Col lg={6} sm={12} span={24}>
                    <CardSummary icon={RiBookletLine} color="yellow" number={3685} text="Orders" />
                </Col>
                <Col lg={6} sm={12} span={24}>
                    <CardSummary icon={FaStoreAlt} color="purple" number={6} text="Suppiers" />
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
        </div>
    );
};

export default Dashboard;
