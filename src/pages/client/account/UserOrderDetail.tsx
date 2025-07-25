import { useNavigate, useLocation } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { PiDotOutlineFill } from "react-icons/pi";
import { Tag, Button, List, Divider, Popconfirm } from "antd";
import { statusColorMap, statusTextMap, countTotalQuantity } from "@/utils/validation/order";

const customerOrder = {
    full_name: "Nguyễn Ngọc Quý",
    phone: "0123456789",
    customer_address: "456 Lê Lợi, Phường Bến Thành, Thành phố Hồ Chí Minh",
};

const UserOrderDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { order } = location.state || {};

    return (
         <div className="relative">
            <div className="absolute top-0 left-0">
                <button
                    onClick={() => navigate(`/account/orders`)}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-white hover:bg-gray-50 rounded shadow"
                >
                    <IoMdArrowBack /> Back
                </button>
            </div>
            <div className="pt-12">
                <div className="bg-white p-6 border border-gray-300 rounded-lg">
                    <h1 className="text-xl font-bold mb-4">Overview</h1>
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                            <p> Order: <span className="font-medium">#{order.id}</span></p>
                            <PiDotOutlineFill className="mx-2 text-gray-400 text-2xl" />
                            <p> Order Date: <span className="font-medium">{new Date(order.created_at).toLocaleDateString()}</span></p>
                            <PiDotOutlineFill className="mx-2 text-gray-400 text-2xl" />
                            <Tag color={statusColorMap[order.status]}>
                                {statusTextMap[order.status]}
                            </Tag>
                        </div>
                        {order.status === "pending" && (
                            <Popconfirm
                                title="Cancel Order"
                                description="Are you sure you want to cancel this order?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={e => {
                                    e?.preventDefault();
                                    navigate(`/account/orders`);
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
                        )}
                    </div>
                    <List>
                        {order?.order_items?.length > 0 ? (
                            order.order_items.map(item => (
                                <List.Item key={item.id} className="border-b border-gray-200 py-4">
                                    <div className="flex justify-between items-center w-full">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={item.product_image}
                                                alt={item.product_name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div>
                                                <h3 className="text-lg font-semibold">{item.product_name}</h3>
                                                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="text-base">
                                            Quantity: <span className="font-semibold">{item.quantity}</span>
                                        </div>
                                    </div>
                                </List.Item>
                            ))
                        ) : null}
                    </List>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-6 border border-gray-300 rounded-lg">
                        <h1 className="text-xl font-bold mb-4">Customer Information</h1>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-5">
                                <span className="font-medium text-gray-600">Full Name:</span>
                                <span className="ml-2 text-right font-semibold">{customerOrder.full_name || "N/A"}</span>
                            </div>
                            <Divider />
                            <div className="flex items-center justify-between gap-5">
                                <span className="font-medium text-gray-600">Phone:</span>
                                <span className="ml-2 text-right font-semibold">{customerOrder.phone || "N/A"}</span>
                            </div>
                            <Divider />
                            <div className="flex items-center justify-between gap-5">
                                <span className="font-medium text-gray-600">
                                    {order.table_number ? "Table Number:" : "Address:"}
                                </span>
                                <span className="ml-2 text-right font-semibold">
                                    {order.table_number ? order.table_number : (customerOrder.customer_address || "N/A")}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 border border-gray-300 rounded-lg">
                        <h1 className="text-xl font-bold mb-4">Payment Information</h1>
                        <div className="space-y-2">
                            {order?.order_items?.length > 0 && (
                                <>
                                    <div className="flex items-center justify-between gap-5">
                                        <span className="font-medium text-gray-600">Number of products:</span>
                                        <span className="ml-2 text-right font-semibold">{countTotalQuantity(order.order_items)}</span>
                                    </div>
                                    <Divider />
                                </>
                            )}
                            <div className="flex items-center justify-between gap-5">
                                <span className="font-medium text-gray-600">Total Price:</span>
                                <span className="ml-2 text-right font-semibold">${order.total_price.toFixed(2)}</span>
                            </div>
                            <Divider />
                            <div className="flex items-center justify-between gap-5">
                                <span className="font-medium text-gray-600">Discount:</span>
                                <span className="ml-2 text-right text-green-500">
                                    -${order.discount_applied.toFixed(2)}
                                </span>
                            </div>
                            <Divider />
                            <div className="flex items-center justify-between gap-5">
                                <span className="font-medium text-gray-600">Final Price:</span>
                                <span className="ml-2 text-right font-semibold text-orange-600">
                                    ${order.final_price.toFixed(2)}
                                </span>
                            </div>
                            <Divider />
                            <div className="flex items-center justify-between gap-5">
                                <span className="font-medium text-gray-600">Payment Method:</span>
                                <span className="ml-2 text-right font-semibold">
                                    {order.payment_id === "1"
                                        ? "Cash on Delivery (COD)"
                                        : order.payment_id === "2"
                                        ? "Credit/Debit Card"
                                        : "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOrderDetail;