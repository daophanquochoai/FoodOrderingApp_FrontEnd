import { ModalState } from '@/type/store/common';
import React, { useState } from 'react';
import ModalBase from './ModalBase';
import { Button, Col, Form, Popconfirm, Row, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, selectSelectedOrder } from '@/store/selector/admin/order/order.selector';
import { OrderItem } from '@/type/store/admin/order/order.style';
import { selectAccount } from '@/store/selector/admin/employee/employee.selector';
import { updateOrder } from '@/store/action/admin/order/order.action';

const ORDER_STATUSES = ['SHIPPING', 'RECEIVE'] as const;

const ModalOrderShipper: React.FC<ModalState> = ({ type, variant }) => {
    // hook
    const dispatch = useDispatch();

    // selector
    const selectOrder = useSelector(selectSelectedOrder);
    const account = useSelector(selectAccount);
    const loading = useSelector(selectLoading);

    console.log(account);

    const handleClickNextStatusExpect = (status: string, reason?: string) => {
        if (status === 'CANCEL') {
            dispatch(
                updateOrder({
                    message: reason,
                    status,
                })
            );
        } else if (status == 'SHIPPING') {
            dispatch(
                updateOrder({
                    message: '',
                    shipperId: account?.id,
                    status,
                })
            );
        } else {
            dispatch(
                updateOrder({
                    message: '',
                    status,
                })
            );
        }
    };
    const [showCancelReason, setShowCancelReason] = useState(false);
    const [cancelReason, setCancelReason] = useState('');

    const [form] = Form.useForm();

    return (
        <ModalBase type={type}>
            <Spin spinning={loading}>
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-center">
                        Order <b>[#{selectOrder?.id || 'Unknow'}]</b>
                    </h2>
                </div>

                {selectOrder?.status?.toLowerCase() !== ORDER_STATUSES[1].toLowerCase() && (
                    <div className="border-y-2 border-dashed border-gray-200 py-3 bg-slate-50 mb-4 flex gap-4">
                        {selectOrder?.status?.toLowerCase() == 'complete' ? (
                            <div className="flex items-center gap-2 ">
                                <p className="font-medium text-gray-700 cursor-pointer">
                                    Next status:{' '}
                                </p>{' '}
                                <div className=" cursor-pointer">
                                    <Popconfirm
                                        title={`Confirm to change order status to ${ORDER_STATUSES[0]} ?`}
                                        onConfirm={() =>
                                            handleClickNextStatusExpect(ORDER_STATUSES[0])
                                        }
                                    >
                                        <Button color="primary" variant="solid">
                                            {ORDER_STATUSES[0]}
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <p className="font-medium text-gray-700">Next status: </p>{' '}
                                <div className=" cursor-pointer">
                                    <Popconfirm
                                        title={`Confirm to change order status to ${ORDER_STATUSES[1]}`}
                                        onConfirm={() =>
                                            handleClickNextStatusExpect(ORDER_STATUSES[1])
                                        }
                                    >
                                        <Button color="purple" variant="solid">
                                            {ORDER_STATUSES[1]}
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </div>
                        )}

                        {/* Nút hủy đối với shipping */}
                        {selectOrder?.status?.toLowerCase() == ORDER_STATUSES[0].toLowerCase() &&
                            !showCancelReason && (
                                <div className="pl-4 border-l border-gray-300">
                                    <Button
                                        color="danger"
                                        variant="solid"
                                        onClick={() => setShowCancelReason(true)}
                                    >
                                        CANCEL
                                    </Button>
                                </div>
                            )}
                    </div>
                )}

                {showCancelReason && (
                    <div className="flex justify-end mt-5 flex-col gap-2 p-4 pb-0 bg-slate-50 rounded-md mb-5">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={(data) => handleClickNextStatusExpect('cancel', cancelReason)}
                        >
                            <Form.Item
                                name="reason"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input reason!',
                                    },
                                ]}
                            >
                                <TextArea
                                    rows={3}
                                    placeholder="Note..."
                                    onChange={(e) => setCancelReason(e.target.value)}
                                    value={cancelReason}
                                />
                            </Form.Item>
                            <Form.Item>
                                <div className="flex gap-2 ">
                                    <Button type="primary" danger onClick={() => form.submit()}>
                                        Confirm
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            setShowCancelReason(false);
                                            setCancelReason('');
                                        }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                )}

                <Row gutter={[20, 20]} className="xl:flex xl:items-stretch ">
                    {/* Món ăn */}
                    <Col span={24} xl={12}>
                        <div className="p-4 bg-slate-50 rounded-md h-full">
                            <div className="mt-0">
                                <p className="text-blue-600 italic font-medium mb-2 underline">
                                    Custommer information
                                </p>
                                <div className="max-h-[300px] overflow-y-auto">
                                    <p className="min-w-[100px] p-1 border-b border-gray-100 hover:bg-blue-50">
                                        Name: <b>{selectOrder?.name || 'Unknown'}</b>
                                    </p>
                                    <p className="min-w-[100px] p-1 border-b border-gray-100 hover:bg-blue-50">
                                        Phone number: <b>{selectOrder?.phoneNumber || 'Unknown'}</b>
                                    </p>
                                    <p className="min-w-[100px] p-1 border-b border-gray-100 hover:bg-blue-50">
                                        Address: <b>{selectOrder?.address || 'Unknown'}</b>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col span={24} xl={12}>
                        <div className="shadow-sm p-4 bg-slate-50 rounded-md h-full">
                            {/* Nguyên liệu */}
                            <div className="mt-0">
                                <p className="text-blue-600 italic font-medium mb-2 underline">
                                    Foods information
                                </p>
                                <div className="max-h-[170px] overflow-y-auto">
                                    {selectOrder?.orderItems?.map((i: OrderItem) => (
                                        <div
                                            key={i?.id}
                                            className="flex items-center justify-between mr-2 gap-2 p-1 border-b border-gray-100 hover:bg-blue-50"
                                        >
                                            <p className="">
                                                {i?.foodId?.foodId?.name || 'Unknown'}
                                            </p>
                                            <p className="font-medium">
                                                ${i?.priceAtTime?.toLocaleString() || '__'} x{' '}
                                                {i?.quantity || '__'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="text-right mr-6">
                            <span className="font-medium bg-red-100">
                                Total: ${selectOrder?.totalPrice?.toLocaleString() || '__'}
                            </span>
                        </div>
                    </Col>
                </Row>
            </Spin>
        </ModalBase>
    );
};

export default ModalOrderShipper;
