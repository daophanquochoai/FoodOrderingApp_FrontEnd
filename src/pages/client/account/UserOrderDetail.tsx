import { useNavigate, useLocation } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { PiDotOutlineFill, PiDotsThreeCircle } from 'react-icons/pi';
import { Tag, Button, List, Divider, Popconfirm, Steps } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { statusColorMap, statusTextMap, countTotalQuantity } from '@/utils/validation/order';
import { TfiReload } from 'react-icons/tfi';
import { LuClipboardCheck, LuPackageCheck } from 'react-icons/lu';
import { FaShippingFast } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectInfo } from '@/store/selector/client/account/account.selector';
import { selectOrderSelected } from '@/store/selector/client/order_profile/order_profile.selector';

const UserOrderDetail = () => {
    // hook
    const navigate = useNavigate();

    // selector
    const info = useSelector(selectInfo);
    const selectedOrder = useSelector(selectOrderSelected);

    const baseOrderSteps = [
        {
            key: 'PENDING',
            title: 'PENDING',
            icon: <TfiReload />,
            description:
                'Order created on ' +
                new Date(selectedOrder.createTime).toLocaleDateString('vi-VN'),
        },
        {
            key: 'PROCESSING',
            title: 'PROCESSING',
            icon: <PiDotsThreeCircle />,
            description: 'Your order is being processed within 10 minutes.',
        },
        {
            key: 'COMPLETE',
            title: 'COMPLETE',
            icon: <LuClipboardCheck />,
            description: 'Your order is ready to serve.',
        },
        {
            key: 'SHIPPING',
            title: 'SHIPPING',
            icon: <FaShippingFast />,
            description: 'Your order is on the way.',
        },
        {
            key: 'RECEIVE',
            title: 'RECEIVE',
            icon: <LuPackageCheck />,
            description: 'Your order has been delivered to you.',
        },
        {
            key: 'CANCEL',
            title: 'CANCEL',
            icon: <StopOutlined style={{ color: 'red' }} />,
            description: 'Order has been cancelled.',
        },
    ];

    let orderSteps: typeof baseOrderSteps = [];

    if (selectedOrder?.status === 'CANCEL') {
        orderSteps = [
            baseOrderSteps.find((step) => step.key === 'PENDING'),
            baseOrderSteps.find((step) => step.key === 'CANCEL'),
        ].filter(Boolean) as typeof baseOrderSteps;
    } else if (selectedOrder?.tableNumber) {
        orderSteps = baseOrderSteps.filter(
            (step) => step.key !== 'SHIPPING' && step.key !== 'CANCEL'
        );
    } else {
        orderSteps = baseOrderSteps.filter((step) => step.key !== 'CANCEL');
    }

    const currentStep = orderSteps.findIndex((step) => step.key === selectedOrder?.status);

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
                            <p>
                                {' '}
                                Order: <span className="font-medium">#{selectedOrder?.id}</span>
                            </p>
                            <PiDotOutlineFill className="mx-2 text-gray-400 text-2xl" />
                            <p>
                                {' '}
                                Order Date:{' '}
                                <span className="font-medium">
                                    {new Date(selectedOrder?.createTime).toLocaleDateString()}
                                </span>
                            </p>
                            <PiDotOutlineFill className="mx-2 text-gray-400 text-2xl" />
                            <Tag color={statusColorMap[selectedOrder?.status]}>
                                {statusTextMap[selectedOrder?.status]}
                            </Tag>
                        </div>
                        {selectedOrder?.status === 'PENDING' && (
                            <Popconfirm
                                title="Cancel Order"
                                description="Are you sure you want to cancel this order?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={(e) => {
                                    e?.preventDefault();
                                    navigate(`/account/orders`);
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
                        )}
                    </div>
                    <List>
                        {selectedOrder?.orderItems?.length > 0
                            ? selectedOrder?.orderItems?.map((item) => (
                                  <List.Item
                                      key={item.id}
                                      className="border-b border-gray-200 py-4"
                                  >
                                      <div className="flex justify-between items-center w-full">
                                          <div className="flex items-center gap-4">
                                              <img
                                                  src={item?.foodId?.foodId?.image}
                                                  alt={item?.foodId?.foodId?.name}
                                                  className="w-16 h-16 object-cover rounded"
                                              />
                                              <div>
                                                  <h3 className="text-lg font-semibold">
                                                      {item?.foodId?.foodId?.name}
                                                  </h3>
                                                  <p className="font-semibold">
                                                      $
                                                      {(item?.priceAtTime * item?.quantity).toFixed(
                                                          2
                                                      )}
                                                  </p>
                                              </div>
                                          </div>
                                          <div className="text-base">
                                              Quantity:{' '}
                                              <span className="font-semibold">
                                                  {item?.quantity}
                                              </span>
                                          </div>
                                      </div>
                                  </List.Item>
                              ))
                            : null}
                    </List>
                </div>
                <div className="bg-white p-6 border border-gray-300 rounded-lg mt-4">
                    <Steps
                        size="small"
                        current={currentStep}
                        labelPlacement="vertical"
                        items={orderSteps.map((step, idx) => ({
                            title: (
                                <span
                                    className={
                                        idx <= currentStep
                                            ? 'text-lg font-bold text-orange-500'
                                            : 'text-base font-medium text-gray-400'
                                    }
                                >
                                    {step.title}
                                </span>
                            ),
                            icon: step.icon,
                            description:
                                idx <= currentStep && step.description ? (
                                    <span className="text-xs text-gray-500">
                                        {step.description}
                                    </span>
                                ) : null,
                        }))}
                        responsive
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-6 border border-gray-300 rounded-lg">
                        <h1 className="text-xl font-bold mb-4">Customer Information</h1>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-5">
                                <span className="font-medium text-gray-600">Full Name:</span>
                                <span className="ml-2 text-right font-semibold">
                                    {info?.name || 'N/A'}
                                </span>
                            </div>
                            <Divider />
                            <div className="flex items-center justify-between gap-5">
                                <span className="font-medium text-gray-600">Phone:</span>
                                <span className="ml-2 text-right font-semibold">
                                    {info?.phoneNumber || 'N/A'}
                                </span>
                            </div>
                            <Divider />
                            <div className="flex items-center justify-between gap-5">
                                <span className="font-medium text-gray-600">
                                    {selectedOrder?.tableNumber ? 'Table Number:' : 'Address:'}
                                </span>
                                <span className="ml-2 text-right font-semibold">
                                    {selectedOrder?.tableNumber
                                        ? selectedOrder?.tableNumber
                                        : selectedOrder?.address || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 border border-gray-300 rounded-lg">
                        <h1 className="text-xl font-bold mb-4">Payment Information</h1>
                        <div className="space-y-2">
                            {selectedOrder?.orderItems?.length > 0 && (
                                <>
                                    <div className="flex items-center justify-between gap-5">
                                        <span className="font-medium text-gray-600">
                                            Number of products:
                                        </span>
                                        <span className="ml-2 text-right font-semibold">
                                            {countTotalQuantity(selectedOrder?.orderItems)}
                                        </span>
                                    </div>
                                    <Divider />
                                </>
                            )}
                            {/* <div className="flex items-center justify-between gap-5">
                                <span className="font-medium text-gray-600">Total Price:</span>
                                <span className="ml-2 text-right font-semibold">
                                    ${selectedOrder?.totalPrice?.toFixed(2) || 0}
                                </span>
                            </div> */}
                            <Divider />
                            <div className="flex items-center justify-between gap-5">
                                <span className="font-medium text-gray-600">Discount:</span>
                                <span className="ml-2 text-right text-green-500">
                                    {selectedOrder?.discountApplied?.code || 0}
                                </span>
                            </div>
                            <Divider />
                            <div className="flex items-center justify-between gap-5">
                                <span className="font-medium text-gray-600">Final Price:</span>
                                <span className="ml-2 text-right font-semibold text-orange-600">
                                    ${selectedOrder?.totalPrice?.toFixed(2) || 0}
                                </span>
                            </div>
                            <Divider />
                            <div className="flex items-center justify-between gap-5">
                                <span className="font-medium text-gray-600">Payment Method:</span>
                                <span className="ml-2 text-right font-semibold">
                                    {selectedOrder?.paymentId?.methodName}
                                </span>
                            </div>
                            {selectedOrder?.message && (
                                <div className="flex items-center justify-between gap-5">
                                    <span className="font-medium text-gray-600">
                                        Reason Cancel :
                                    </span>
                                    <span className="ml-2 text-right font-semibold">
                                        {selectedOrder?.message}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOrderDetail;
