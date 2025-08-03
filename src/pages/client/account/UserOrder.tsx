import { Empty, Spin, Tabs, List, Button, Tag, TabsProps, Popconfirm, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    InboxOutlined,
    HourglassOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    CarOutlined,
    ShoppingOutlined,
    StopOutlined,
    RightOutlined,
} from '@ant-design/icons';
import { PiDotOutlineFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { statusColorMap, statusTextMap, countTotalQuantity } from '@/utils/validation/order';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeTab,
    fetchFirst,
    updateOrder,
} from '@/store/action/client/order_profile/order_profile.action';
import {
    selectData,
    selectFilter,
    selectLoading,
    selectTotalPage,
} from '@/store/selector/client/order_profile/order_profile.selector';
import { Order } from '@/type/store/admin/order/order.style';
import { order, order_profile } from '@/store/reducer';

const UserOrder: React.FC = () => {
    // hook
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // selector
    const orderData = useSelector(selectData);
    const loading = useSelector(selectLoading);
    const total = useSelector(selectTotalPage);
    const filter = useSelector(selectFilter);

    //useEffect
    useEffect(() => {
        dispatch(fetchFirst());
    }, []);

    const [activeTab, setActiveTab] = useState('all');

    // event handling
    const handleTabChange = (key: string) => {
        setActiveTab(key);
        dispatch(changeTab(key));
    };

    const handleNavigateToDetail = (order: any) => {
        dispatch(order_profile.actions.setSelectedOrder(order));
        navigate('order-detail');
    };

    const renderOrderList = (orderList: Order[]) => {
        if (loading) {
            return (
                <div className="flex justify-center items-center py-10">
                    <Spin size="large" />
                </div>
            );
        }

        if (!orderList || orderList.length === 0) {
            return (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No orders found"
                    className="py-10"
                />
            );
        }

        return (
            <>
                <List
                    itemLayout="horizontal"
                    dataSource={orderList}
                    renderItem={(order) => (
                        <List.Item key={order.id} className="border border-gray-300 mb-4">
                            <div
                                className="w-full hover:text-black px-4"
                                onClick={() => handleNavigateToDetail(order)}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p>
                                            {' '}
                                            Order: <span className="font-medium">#{order.id}</span>
                                        </p>
                                        <PiDotOutlineFill className="mx-2 text-gray-400 text-2xl" />
                                        <p>
                                            {' '}
                                            Order Date:{' '}
                                            <span className="font-medium">
                                                {new Date(
                                                    order?.createTime
                                                )?.toLocaleDateString() || ''}
                                            </span>
                                        </p>
                                        {order.status === 'PENDING' && (
                                            <span
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <Popconfirm
                                                    title="Cancel Order"
                                                    description="Are you sure you want to cancel this order?"
                                                    okText="Yes"
                                                    cancelText="No"
                                                    onConfirm={(e) => {
                                                        e?.preventDefault();
                                                        dispatch(updateOrder(order?.id));
                                                    }}
                                                >
                                                    <Button
                                                        style={{
                                                            marginLeft: 20,
                                                            backgroundColor: '#ef4444',
                                                            color: '#fff',
                                                            border: 'none',
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            (
                                                                e.currentTarget as HTMLButtonElement
                                                            ).style.backgroundColor = '#dc2626';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            (
                                                                e.currentTarget as HTMLButtonElement
                                                            ).style.backgroundColor = '#ef4444';
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Popconfirm>
                                            </span>
                                        )}
                                    </div>
                                    <Tag color={statusColorMap[order.status]}>
                                        {statusTextMap[order.status]}
                                    </Tag>
                                </div>
                                <div className="grid gird-cols-1 lg:grid-cols-[3fr_1fr]">
                                    <div className="flex items-center gap-5">
                                        <img
                                            src={
                                                order?.orderItems?.[0]?.foodId?.foodId?.image || ''
                                            }
                                            alt={
                                                order?.orderItems?.[0]?.foodId?.foodId?.name ||
                                                'Product Image'
                                            }
                                            className="w-20 h-20 object-cover mr-2 rounded-md"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-bold">
                                                {order?.orderItems?.[0]?.foodId?.foodId?.name ||
                                                    'Unknown Product'}{' '}
                                                x {order?.orderItems?.[0]?.quantity || 1}
                                            </span>
                                            <span className="font-bold">
                                                $
                                                {(
                                                    (order?.orderItems?.[0]?.priceAtTime || 0) *
                                                    (order?.orderItems?.[0]?.quantity || 1)
                                                ).toFixed(2)}
                                            </span>
                                            {order?.orderItems && order?.orderItems?.length > 1 && (
                                                <span className="text-xs">
                                                    With{' '}
                                                    {countTotalQuantity(order?.orderItems) -
                                                        (order?.orderItems?.[0]?.quantity ||
                                                            1)}{' '}
                                                    other products
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right px-3">
                                        <p className="mt-4">
                                            Total:{' '}
                                            <span className="font-bold text-orange-500 text-lg">
                                                ${order?.totalPrice?.toFixed(2) || '0'}
                                            </span>
                                        </p>
                                        <p className="text-xs">
                                            View Details <RightOutlined />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
                <div className="flex justify-center mt-[10px]">
                    <Pagination current={filter.pageNo} pageSize={10} total={total} />
                </div>
            </>
        );
    };

    const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
        <div className="sticky top-20 z-10 bg-white">
            <DefaultTabBar {...props} />
        </div>
    );

    const tabItems = [
        {
            key: 'all',
            label: (
                <span className="flex items-center">
                    <InboxOutlined className="mr-2" />
                    All Orders
                </span>
            ),
            children: renderOrderList(orderData),
        },
        {
            key: 'PENDING',
            label: (
                <span className="flex items-center">
                    <HourglassOutlined className="mr-2" />
                    Pending
                </span>
            ),
            children: renderOrderList(orderData),
        },
        {
            key: 'PROCESSING',
            label: (
                <span className="flex items-center">
                    <ClockCircleOutlined className="mr-2" />
                    Processing
                </span>
            ),
            children: renderOrderList(orderData),
        },
        {
            key: 'COMPLETE',
            label: (
                <span className="flex items-center">
                    <CheckCircleOutlined className="mr-2" />
                    Completed
                </span>
            ),
            children: renderOrderList(orderData),
        },
        {
            key: 'SHIPPING',
            label: (
                <span className="flex items-center">
                    <CarOutlined className="mr-2" />
                    Shipping
                </span>
            ),
            children: renderOrderList(orderData),
        },
        {
            key: 'RECEIVE',
            label: (
                <span className="flex items-center">
                    <ShoppingOutlined className="mr-2" />
                    Received
                </span>
            ),
            children: renderOrderList(orderData),
        },
        {
            key: 'CANCEL',
            label: (
                <span className="flex items-center">
                    <StopOutlined className="mr-2" style={{ color: 'red' }} />
                    Cancelled
                </span>
            ),
            children: renderOrderList(orderData),
        },
    ];

    return (
        <div className="bg-white p-6 border border-gray-300 rounded-lg min-h-[500px]">
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">My orders</h1>

                <Tabs
                    activeKey={activeTab}
                    onChange={handleTabChange}
                    size="large"
                    renderTabBar={renderTabBar}
                    items={tabItems}
                />
            </div>
        </div>
    );
};

export default UserOrder;
