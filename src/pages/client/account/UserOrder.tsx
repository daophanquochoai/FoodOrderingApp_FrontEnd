import { Empty, Spin, Tabs, List, Button, Tag, TabsProps, Popconfirm } from "antd";
import React, { useState } from "react";
import { InboxOutlined, HourglassOutlined, ClockCircleOutlined, CheckCircleOutlined, CarOutlined, ShoppingOutlined, StopOutlined, RightOutlined } from "@ant-design/icons";
import { PiDotOutlineFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { statusColorMap, statusTextMap, countTotalQuantity } from "@/utils/validation/order";

interface Order {
    id: string;
    total_price: number;
    payment_id: string;
    discount_applied: number;
    final_price: number;
    status: string;
    created_at: string;
    table_number?: string;
    order_items?: OrderItem[];
}

interface OrderItem {
    id: string;
    product_name: string;
    product_image: string;
    quantity: number;
    price: number;
}

const orderList: Order[] = [
    {
        id: "1",
        total_price: 30,
        payment_id: "1",
        discount_applied: 5,
        final_price: 25,
        status: "pending",
        created_at: "2024-10-01T12:00:00Z",
        order_items: [
            {
                id: "1",
                product_name: "Cheeseburger",
                product_image: "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=",
                quantity: 2,
                price: 12,
            },
            {
                id: "2",
                product_name: "Coca-Cola",
                product_image: "https://grillfood-demo.myshopify.com/cdn/shop/files/2.jpg?v=1746869562&width=713",
                quantity: 1,
                price: 6,
            }
        ],
    },
    {
        id: "2",
        total_price: 20,
        payment_id: "2",
        discount_applied: 2,
        final_price: 18,
        status: "processing",
        created_at: "2024-10-02T12:00:00Z",
        table_number: "5",
    },
    {
        id: "3",
        total_price: 30,
        payment_id: "1",
        discount_applied: 3,
        final_price: 27,
        status: "completed",
        created_at: "2024-10-03T12:00:00Z",
    },
    {
        id: "4",
        total_price: 40,
        payment_id: "2",
        discount_applied: 4,
        final_price: 36,
        status: "shipping",
        created_at: "2024-10-04T12:00:00Z",
    },
    {
        id: "5",
        total_price: 50,
        payment_id: "1",
        discount_applied: 5,
        final_price: 45,
        status: "received",
        created_at: "2024-10-05T12:00:00Z",
    },
    {
        id: "6",
        total_price: 60,
        payment_id: "2",
        discount_applied: 6,
        final_price: 54,
        status: "cancelled",
        created_at: "2024-10-06T12:00:00Z",
    },
];

const UserOrder: React.FC = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [loading, setLoading] = useState(false);

    const handleTabChange = (key: string) => {
        setLoading(true);
        setActiveTab(key);

        setTimeout(() => {
            setLoading(false);
        }, 500);
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
            <List
                itemLayout="horizontal"
                dataSource={orderList}
                renderItem={(order) => (
                    <List.Item 
                        key={order.id}
                        className="border border-gray-300 mb-4"
                    >
                        <Link 
                            to="/account/orders/order-detail" 
                            className="w-full hover:text-black px-4"
                            state={{ order }} 
                        >
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <p> Order: <span className="font-medium">#{order.id}</span></p>
                                    <PiDotOutlineFill className="mx-2 text-gray-400 text-2xl" />
                                    <p> Order Date: <span className="font-medium">{new Date(order.created_at).toLocaleDateString()}</span></p>
                                    {order.status === "pending" && (
                                        <span
                                            onClick={e => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                        >
                                            <Popconfirm
                                                title="Cancel Order"
                                                description="Are you sure you want to cancel this order?"
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={e => {
                                                    e?.preventDefault();
                                                }}
                                            >
                                                <Button
                                                    style={{
                                                        marginLeft: 20,
                                                        backgroundColor: "#ef4444",
                                                        color: "#fff",
                                                        border: "none",
                                                    }}
                                                    onMouseEnter={e => {
                                                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#dc2626";
                                                    }}
                                                    onMouseLeave={e => {
                                                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#ef4444";
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
                                        src={order.order_items?.[0]?.product_image || ""} 
                                        alt={order.order_items?.[0]?.product_name || "Product Image"}
                                        className="w-20 h-20 object-cover mr-2 rounded-md"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-bold">{order.order_items?.[0]?.product_name || "Unknown Product"} x {order.order_items?.[0]?.quantity || 1}</span>
                                        <span className="font-bold">${((order.order_items?.[0]?.price || 0) * (order.order_items?.[0]?.quantity || 1)).toFixed(2)}</span>
                                        {order.order_items && order.order_items.length > 1 && (
                                            <span className="text-xs">
                                                With {(countTotalQuantity(order.order_items) - (order.order_items?.[0]?.quantity || 1))} other products
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right px-3">
                                    <p className="mt-4">Total: <span className="font-bold text-orange-500 text-lg">${order.total_price.toFixed(2)}</span></p>
                                    <p className="text-xs">View Details <RightOutlined /></p>
                                </div>
                            </div>
                        </Link>
                    </List.Item>
                )}
            />
        );
    };

    const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
        <div className="sticky top-20 z-10 bg-white">
            <DefaultTabBar {...props} />
        </div>
    );

    const tabItems = [
        {
            key: "all",
            label: (
                <span className="flex items-center">
                    <InboxOutlined className="mr-2" />
                    All Orders
                </span>
            ),
            children: renderOrderList(orderList),
        },
        {
            key: "pending",
            label: (
                <span className="flex items-center">
                    <HourglassOutlined className="mr-2" />
                    Pending
                </span>
            ),
            children: renderOrderList(orderList.filter(order => order.status === "pending")),
        },
        {
            key: "processing",
            label: (
                <span className="flex items-center">
                    <ClockCircleOutlined className="mr-2" />
                    Processing
                </span>
            ),
            children: renderOrderList(orderList.filter(order => order.status === "processing")),
        },
        {
            key: "completed",
            label: (
                <span className="flex items-center">
                    <CheckCircleOutlined className="mr-2" />
                    Completed
                </span>
            ),
            children: renderOrderList(orderList.filter(order => order.status === "completed")),
        },
        {
            key: "shipping",
            label: (
                <span className="flex items-center">
                    <CarOutlined className="mr-2" />
                    Shipping
                </span>
            ),
            children: renderOrderList(orderList.filter(order => order.status === "shipping")),
        },
        {
            key: "received",
            label: (
                <span className="flex items-center">
                    <ShoppingOutlined className="mr-2" />
                    Received
                </span>
            ),
            children: renderOrderList(orderList.filter(order => order.status === "received")),
        },
        {
            key: "cancelled",
            label: (
                <span className="flex items-center">
                    <StopOutlined className="mr-2" style={{ color: 'red' }} />
                    Cancelled
                </span>
            ),
            children: renderOrderList(orderList.filter(order => order.status === "cancelled")),
        }
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