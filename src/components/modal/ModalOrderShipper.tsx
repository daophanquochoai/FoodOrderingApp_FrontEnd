import { ModalState } from '@/type/store/common';
import React, { useRef, useState } from 'react';
import ModalBase from './ModalBase';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Col,
    Descriptions,
    DescriptionsProps,
    Form,
    Image,
    Input,
    InputRef,
    message,
    Popconfirm,
    Row,
    Select,
    Space,
    Table,
    TableColumnsType,
    TableColumnType,
    Tag,
} from 'antd';
import dayjs from 'dayjs';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { selectSelectedOrder } from '@/store/selector/admin/order/order.selector';
import { OrderItem } from '@/type/store/admin/order/order.style';
import TextArea from 'antd/es/input/TextArea';

const ORDER_STATUSES = ['SHIPPING', 'RECEIVE'] as const;

const ModalOrderShipper: React.FC<ModalState> = ({ data, type, variant }) => {
    const handleClickNextStatusExpect = (status: string, reason?: string) => {
        console.log('Next status:', status);
        if (status === 'cancel') {
            console.log('Cancel reason:', reason);
        }
    };
    const [showCancelReason, setShowCancelReason] = useState(false);
    const [cancelReason, setCancelReason] = useState('');

    const [form] = Form.useForm();

    return (
        <ModalBase type={type}>
            <div>
                <h2 className="text-xl font-semibold mb-6 text-center">
                    Order <b>[#{data.id}]</b>
                </h2>
            </div>

            {data.status.toLowerCase() !== ORDER_STATUSES[1].toLowerCase() && (
                <div className="border-y-2 border-dashed border-gray-200 py-3 bg-slate-50 mb-4 flex gap-4">
                    {data.status.toLowerCase() == 'complete' ? (
                        <div className="flex items-center gap-2 ">
                            <p className="font-medium text-gray-700 cursor-pointer">
                                Next status:{' '}
                            </p>{' '}
                            <div className=" cursor-pointer">
                                <Popconfirm
                                    title={`Confirm to change order status to ${ORDER_STATUSES[0]} ?`}
                                    onConfirm={() => handleClickNextStatusExpect(ORDER_STATUSES[0])}
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
                                    onConfirm={() => handleClickNextStatusExpect(ORDER_STATUSES[1])}
                                >
                                    <Button color="purple" variant="solid">
                                        {ORDER_STATUSES[1]}
                                    </Button>
                                </Popconfirm>
                            </div>
                        </div>
                    )}

                    {/* Nút hủy đối với shipping */}
                    {data.status.toLowerCase() == ORDER_STATUSES[0].toLowerCase() &&
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
                                    Name: <b>{data.buyer.name}</b>
                                </p>
                                <p className="min-w-[100px] p-1 border-b border-gray-100 hover:bg-blue-50">
                                    Phone number: <b>{data.buyer.phone}</b>
                                </p>
                                <p className="min-w-[100px] p-1 border-b border-gray-100 hover:bg-blue-50">
                                    Address: <b>{data.buyer.address}</b>
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
                                {data.items.map((i: any) => (
                                    <div
                                        key={i.id}
                                        className="flex items-center justify-between mr-2 gap-2 p-1 border-b border-gray-100 hover:bg-blue-50"
                                    >
                                        <p className="">{i.name}</p>
                                        <p className="font-medium">
                                            {i.price_at_time.toLocaleString()}đ x {i.quantity}
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
                            Total: {data.total.toLocaleString()}đ
                        </span>
                    </div>
                </Col>
            </Row>
        </ModalBase>
    );
};

export default ModalOrderShipper;
