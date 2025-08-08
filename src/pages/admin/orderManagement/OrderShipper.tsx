import FilterBar from '@/components/filter/FilterBar';
import { initFilterOrder } from '@/defaultValue/admin/order/order';
import { fetchFirst } from '@/store/action/admin/order/order.action';
import { common, order } from '@/store/reducer';
import { selectFilterOrder } from '@/store/selector/admin/order/order.selector';
import { ModalType } from '@/type/store/common';
import { Badge, Col, Row, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

let orders = [
    {
        id: 1001,
        buyer: {
            id: 1,
            name: 'Nguyễn Văn A',
            phone: '0909123456',
            email: 'vana@example.com',
            address: 'TP Hồ Chí Minh',
        },
        items: [
            {
                id: 101,
                name: 'Bánh mì thịt',
                quantity: 1,
                price_at_time: 50000,
                cost: 30000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
            },
            {
                id: 111,
                name: 'Bánh mì chả',
                quantity: 1,
                price_at_time: 50000,
                cost: 30000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
            },
            {
                id: 102,
                name: 'Nước cam',
                quantity: 1,
                price_at_time: 35000,
                cost: 20000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
            },
        ],
        shippingFee: 15000,
        total: 135000,
        payment: {
            method: 'Visa',
            status: 'paid',
        },
        status: 'complete',
        createdAt: '2025-07-23T14:00:00Z',
    },
    {
        id: 1002,
        buyer: {
            id: 2,
            name: 'Trần Thị B',
            phone: '0911123456',
            email: 'tranb@example.com',
            address: 'TP Hồ Chí Minh',
        },
        items: [
            {
                id: 103,
                name: 'Cơm gà chiên',
                quantity: 1,
                price_at_time: 65000,
                cost: 60000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
            },
        ],
        shippingFee: 15000,
        total: 80000,
        payment: {
            method: 'Cash',
            status: 'pending',
        },
        status: 'complete',
        createdAt: '2025-07-22T10:30:00Z',
    },
    {
        id: 1002,
        buyer: {
            id: 2,
            name: 'Trần Thị B',
            phone: '0911123456',
            email: 'tranb@example.com',
            address: 'TP Hồ Chí Minh',
        },
        items: [
            {
                id: 103,
                name: 'Cơm gà chiên',
                quantity: 1,
                price_at_time: 65000,
                cost: 60000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
            },
        ],
        shippingFee: 15000,
        total: 80000,
        payment: {
            method: 'Cash',
            status: 'pending',
        },
        status: 'complete',
        createdAt: '2025-07-22T10:30:00Z',
    },
    {
        id: 1002,
        buyer: {
            id: 2,
            name: 'Trần Thị B',
            phone: '0911123456',
            email: 'tranb@example.com',
            address: 'TP Hồ Chí Minh',
        },
        items: [
            {
                id: 103,
                name: 'Cơm gà chiên',
                quantity: 1,
                price_at_time: 65000,
                cost: 60000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
            },
        ],
        shippingFee: 15000,
        total: 80000,
        payment: {
            method: 'Cash',
            status: 'pending',
        },
        status: 'complete',
        createdAt: '2025-07-22T10:30:00Z',
    },
    {
        id: 1002,
        buyer: {
            id: 2,
            name: 'Trần Thị B',
            phone: '0911123456',
            email: 'tranb@example.com',
            address: 'TP Hồ Chí Minh',
        },
        items: [
            {
                id: 103,
                name: 'Cơm gà chiên',
                quantity: 1,
                price_at_time: 65000,
                cost: 60000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
            },
        ],
        shippingFee: 15000,
        total: 80000,
        payment: {
            method: 'Cash',
            status: 'pending',
        },
        status: 'complete',
        createdAt: '2025-07-22T10:30:00Z',
    },
    {
        id: 1002,
        buyer: {
            id: 2,
            name: 'Trần Thị B',
            phone: '0911123456',
            email: 'tranb@example.com',
            address: 'TP Hồ Chí Minh',
        },
        items: [
            {
                id: 103,
                name: 'Cơm gà chiên',
                quantity: 1,
                price_at_time: 65000,
                cost: 60000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
            },
        ],
        shippingFee: 15000,
        total: 80000,
        payment: {
            method: 'Cash',
            status: 'pending',
        },
        status: 'complete',
        createdAt: '2025-07-22T10:30:00Z',
    },
    {
        id: 1003,
        buyer: {
            id: 3,
            name: 'Lê Quốc C',
            phone: '0988765432',
            email: 'quocc@example.com',
            address: 'TP Hồ Chí Minh',
        },
        items: [
            {
                id: 104,
                name: 'Phở bò tái',
                quantity: 2,
                price_at_time: 60000,
                cost: 65000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
            },
            {
                id: 105,
                name: 'Trà sữa trân châu',
                quantity: 2,
                price_at_time: 40000,
                cost: 45000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
            },
        ],
        shippingFee: 0,
        total: 200000,
        payment: {
            method: 'Visa',
            status: 'paid',
        },
        status: 'shipping',
        createdAt: '2025-07-21T09:00:00Z',
    },
    {
        id: 1004,
        buyer: {
            id: 4,
            name: 'Phạm Minh D',
            phone: '0977123988',
            email: 'minhd@example.com',
            address: 'TP Hồ Chí Minh',
        },
        items: [
            {
                id: 106,
                name: 'Bún bò Huế',
                quantity: 1,
                price_at_time: 70000,
                cost: 40000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
            },
            {
                id: 107,
                name: 'Nước suối',
                quantity: 2,
                price_at_time: 10000,
                cost: 7000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
            },
        ],
        shippingFee: 15000,
        total: 95000,
        payment: {
            method: 'Visa',
            status: 'paid',
        },
        status: 'receive',
        createdAt: '2025-07-24T11:45:00Z',
    },
];

const ORDER_STATUSES = ['COMPLETE', 'SHIPPING', 'RECEIVE'] as const;

const OrderShipper = () => {
    const dispatch = useDispatch();

    const filter = useSelector(selectFilterOrder)

    const orderFilterFields = [
        { key: 'search', type: 'text', placeholder: 'Search code' },
        { key: 'startDate', type: 'date', placeholder: 'Order time' },
        {
            key: 'statusOrders',
            type: 'multiSelect',
            placeholder: 'Status',
            options: [
                { label: 'pending', value: 'PENDING' },
                { label: 'processing', value: 'PROCESSING' },
                { label: 'completed', value: 'COMPLETE' },
                { label: 'shipping', value: 'SHIPPING' },
                { label: 'received', value: 'RECEIVE' },
                { label: 'cancel', value: 'CANCEL' },
            ],
        },
    ];

    const handleFilterChange = (key, value) => {
        // console.log(key, value);
        dispatch(
            order.actions.setFilterOrder({
                ...filter,
                [key]: value
            })
        );
    };

    const handleApplyFilter = (filterValues) => {
        // console.log(filterValues);
        dispatch(fetchFirst());
    };

    const handleResetFilter = () => {
        dispatch(
            order.actions.setFilterOrder(initFilterOrder)
        );
        dispatch(fetchFirst());
    };

    const handleOpenViewOrder = (data) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.ORDER_SHIPPER,
                variant: 'view',
                data: data,
            })
        );
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-3">Orders Management</h1>

            <Tabs defaultActiveKey="0">
                {ORDER_STATUSES.map((status, index) => (
                    <TabPane tab={<p className="capitalize">{status.toLowerCase()}</p>} key={index}>
                        {' '}
                        {/* filter */}
                        <div className="mb-3">
                            <FilterBar
                                fields={orderFilterFields}
                                values={filter}
                                onChange={handleFilterChange}
                                onReset={handleResetFilter}
                                onApply={handleApplyFilter}
                                type={ModalType.ORDER_MANAGEMENT}
                            />
                        </div>
                        <div
                            key={index}
                            className="overflow-y-auto max-h-[70vh] lg:max-h-[62vh] pr-3"
                        >
                            <Row gutter={[20, 20]}>
                                {orders &&
                                    orders.length > 0 &&
                                    orders.map(
                                        (order) =>
                                            order.status.toLowerCase() == status.toLowerCase() && (
                                                <Col key={order.id} xs={24} md={8} xl={6}>
                                                    <div
                                                        className="h-full bg-white rounded-md cursor-pointer"
                                                        onClick={() => {
                                                            handleOpenViewOrder(order);
                                                        }}
                                                    >
                                                        <Badge.Ribbon
                                                            text={
                                                                <p className="capitalize">
                                                                    {order.status.toLowerCase()}
                                                                </p>
                                                            }
                                                            color={
                                                                order.status == 'complete'
                                                                    ? ''
                                                                    : order.status == 'shipping'
                                                                    ? 'red'
                                                                    : 'purple'
                                                            }
                                                        >
                                                            <div className="">
                                                                <div className="py-3 px-4 font-semibold">
                                                                    #{order.id}
                                                                </div>
                                                                <div className="border-b border-gray-300"></div>
                                                                <div className="py-3 px-4">
                                                                    <p>
                                                                        <i>Order time: </i>
                                                                        <b>
                                                                            {dayjs(
                                                                                order.createdAt
                                                                            ).format(
                                                                                'DD/MM/YYYY HH:MM'
                                                                            )}
                                                                        </b>
                                                                    </p>
                                                                    <div className="py-1 mt-1 border-y border-dashed border-gray-300">
                                                                        <i className="bg-yellow-200 text-yellow-800">
                                                                            Custommer:
                                                                        </i>
                                                                        <div className="flex flex-col gap-1">
                                                                            <p className="text-sm">
                                                                                <span className="text-gray-800">
                                                                                    Name:{' '}
                                                                                </span>
                                                                                <strong>
                                                                                    {
                                                                                        order.buyer
                                                                                            .name
                                                                                    }
                                                                                </strong>
                                                                            </p>
                                                                            <p className="text-sm">
                                                                                <span className="text-gray-800">
                                                                                    Phone:{' '}
                                                                                </span>
                                                                                <strong>
                                                                                    {
                                                                                        order.buyer
                                                                                            .phone
                                                                                    }
                                                                                </strong>
                                                                            </p>
                                                                            <p className="text-sm">
                                                                                <span className="text-gray-800">
                                                                                    Address:{' '}
                                                                                </span>
                                                                                <strong>
                                                                                    {
                                                                                        order.buyer
                                                                                            .address
                                                                                    }
                                                                                </strong>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-start justify-start gap-2 mt-1">
                                                                        <i>Foods:</i>
                                                                        <div className="flex flex-col">
                                                                            {order.items.map(
                                                                                (i) => (
                                                                                    <div key={i.id}>
                                                                                        <Badge
                                                                                            status={
                                                                                                order.status ==
                                                                                                'receive'
                                                                                                    ? 'warning'
                                                                                                    : 'processing'
                                                                                            }
                                                                                            text={`${i.name} - ${i.quantity}`}
                                                                                        />
                                                                                    </div>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-start justify-start gap-2 mt-1">
                                                                        <i>Total:</i>
                                                                        <b>
                                                                            {order.total.toLocaleString()}
                                                                            đ
                                                                        </b>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Badge.Ribbon>
                                                    </div>
                                                </Col>
                                            )
                                    )}
                            </Row>
                        </div>
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
};

export default OrderShipper;
