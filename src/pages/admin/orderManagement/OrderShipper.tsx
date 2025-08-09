import FilterBar from '@/components/filter/FilterBar';
import { common, order } from '@/store/reducer';
import { selectFilterOrder, selectOrders } from '@/store/selector/admin/order/order.selector';
import { ModalType } from '@/type/store/common';
import { Badge, Col, Row, Spin, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import dayjs from 'dayjs';
import { use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFirst } from '@/store/action/admin/order/order.action';
import { fetchEmployeeByUsername } from '@/store/action/admin/employee/employee.action';
import { selectAccount } from '@/store/selector/admin/employee/employee.selector';
import { initFilterOrder } from '@/defaultValue/admin/order/order';

const ORDER_STATUSES = ['COMPLETE', 'SHIPPING', 'RECEIVE'] as const;

const OrderShipper = () => {
    // hook
    const dispatch = useDispatch();

    // selector
    const fitlerOrder = useSelector(selectFilterOrder);
    const { data, loading } = useSelector(selectOrders);
    const account = useSelector(selectAccount);

    // useEffect
    useEffect(() => {
        if (account == null) {
            dispatch(fetchEmployeeByUsername());
        } else {
            dispatch(
                order.actions.setFilterOrder({
                    ...fitlerOrder,
                    statusOrders: ['COMPLETE'],
                    sort: 'desc',
                })
            );
            dispatch(fetchFirst());
        }
    }, [account]);

    // state
    const [filters, setFilters] = useState({});
    const [tab, setTab] = useState('COMPLETE');

    const orderFilterFields = [
        { key: 'search', type: 'text', placeholder: 'Input search' },
        { key: 'date', type: 'dateRange', placeholder: 'Ngày mua hàng' },
    ];

    const handleFilterChange = (key, value) => {
        if (key == 'date') {
            if (value == undefined || value == null) {
                dispatch(
                    order.actions.setFilterOrder({
                        ...fitlerOrder,
                        startDate: null,
                        endDate: null,
                    })
                );
            } else {
                dispatch(
                    order.actions.setFilterOrder({
                        ...fitlerOrder,
                        startDate: dayjs(value[0]).format('YYYY-MM-DD'),
                        endDate: dayjs(value[1]).format('YYYY-MM-DD'),
                    })
                );
            }
        } else {
            dispatch(
                order.actions.setFilterOrder({
                    ...fitlerOrder,
                    [key]: value,
                })
            );
        }
        setFilters((pre) => ({ ...pre, [key]: value }));
        dispatch(fetchFirst());
    };

    const handleResetFilter = () => {
        dispatch(
            order.actions.setFilterOrder({
                ...initFilterOrder,
                statusOrders: [tab],
                sort: 'desc',
            })
        );
        setFilters({});
        dispatch(fetchFirst());
    };

    const handleOpenViewOrder = (data) => {
        dispatch(order.actions.setSelectOrder(data));
        dispatch(
            common.actions.showModal({
                type: ModalType.ORDER_SHIPPER,
                variant: 'view',
                data: data,
            })
        );
    };

    const handleChangeTab = (e: string) => {
        setTab(e);
        if (e == 'RECEIVE' || e == 'SHIPPING') {
            dispatch(
                order.actions.setFilterOrder({
                    ...fitlerOrder,
                    statusOrders: [e],
                    sort: 'desc',
                    shipperId: account?.id,
                })
            );
        } else {
            dispatch(
                order.actions.setFilterOrder({
                    ...fitlerOrder,
                    statusOrders: [e],
                    sort: 'desc',
                    shipperId: null,
                })
            );
        }
        dispatch(fetchFirst());
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-3">Orders Management</h1>
            <Spin spinning={loading}>
                <Tabs defaultActiveKey={tab} onChange={(e) => handleChangeTab(ORDER_STATUSES[e])}>
                    {ORDER_STATUSES.map((status, index) => (
                        <TabPane
                            tab={<p className="capitalize">{status.toLowerCase()}</p>}
                            key={index}
                        >
                            {' '}
                            <div className="mb-3">
                                <FilterBar
                                    fields={orderFilterFields}
                                    values={filters}
                                    onChange={handleFilterChange}
                                    onReset={handleResetFilter}
                                    type={ModalType.ORDER_MANAGEMENT}
                                />
                            </div>
                            <div
                                key={index}
                                className="overflow-y-auto max-h-[70vh] lg:max-h-[62vh] pr-3"
                            >
                                <Row gutter={[20, 20]}>
                                    {data &&
                                        data?.length > 0 &&
                                        data?.map(
                                            (order) =>
                                                order?.status?.toLowerCase() ==
                                                    status.toLowerCase() && (
                                                    <Col key={order?.id} xs={24} md={8} xl={6}>
                                                        <div
                                                            className="h-full bg-white rounded-md cursor-pointer"
                                                            onClick={() => {
                                                                handleOpenViewOrder(order);
                                                            }}
                                                        >
                                                            <Badge.Ribbon
                                                                text={
                                                                    <p className="capitalize">
                                                                        {order?.status?.toLowerCase()}
                                                                    </p>
                                                                }
                                                                color={
                                                                    order?.status == 'COMPLETE'
                                                                        ? ''
                                                                        : order?.status ==
                                                                          'SHIPPING'
                                                                        ? 'red'
                                                                        : 'purple'
                                                                }
                                                            >
                                                                <div className="">
                                                                    <div className="py-3 px-4 font-semibold">
                                                                        #{order?.id || 'Unknown'}
                                                                    </div>
                                                                    <div className="border-b border-gray-300"></div>
                                                                    <div className="py-3 px-4">
                                                                        <p>
                                                                            <i>Order time: </i>
                                                                            <b>
                                                                                {dayjs(
                                                                                    order?.createTime
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
                                                                                        {order?.name ||
                                                                                            'Unknown'}
                                                                                    </strong>
                                                                                </p>
                                                                                <p className="text-sm">
                                                                                    <span className="text-gray-800">
                                                                                        Phone:{' '}
                                                                                    </span>
                                                                                    <strong>
                                                                                        {order?.phoneNumber ||
                                                                                            'Unknown'}
                                                                                    </strong>
                                                                                </p>
                                                                                <p className="text-sm">
                                                                                    <span className="text-gray-800">
                                                                                        Address:{' '}
                                                                                    </span>
                                                                                    <strong>
                                                                                        {order?.address ||
                                                                                            'Unknown'}
                                                                                    </strong>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-start justify-start gap-2 mt-1">
                                                                            <i>Foods:</i>
                                                                            <div className="flex flex-col">
                                                                                {order?.orderItems?.map(
                                                                                    (i) => (
                                                                                        <div
                                                                                            key={
                                                                                                i?.id
                                                                                            }
                                                                                        >
                                                                                            <Badge
                                                                                                status={
                                                                                                    order?.status ==
                                                                                                    'RECEIVE'
                                                                                                        ? 'warning'
                                                                                                        : 'processing'
                                                                                                }
                                                                                                text={`${i?.foodId?.foodId?.name} - ${i?.quantity}`}
                                                                                            />
                                                                                        </div>
                                                                                    )
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-start justify-start gap-2 mt-1">
                                                                            <i>Total:</i>
                                                                            <b>
                                                                                {order?.totalPrice?.toLocaleString() ||
                                                                                    'Unknown'}
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
            </Spin>
        </div>
    );
};

export default OrderShipper;
