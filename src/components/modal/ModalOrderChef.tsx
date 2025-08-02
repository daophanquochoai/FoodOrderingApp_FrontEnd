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

type DataIndex = keyof any;
const ORDER_STATUSES = ['PENDING', 'PROCESSING', 'COMPLETE'] as const;

const ModalOrderChef: React.FC<ModalState> = ({ data, type, variant }) => {
    const [form] = Form.useForm();

    const ingredients = data.items.flatMap((item) => item.ingredients);

    const mergedIngredients = Object.values(
        ingredients.reduce((o, item) => {
            if (!o[item.id]) {
                o[item.id] = { ...item };
            } else {
                o[item.id].quantity += item.quantity;
            }
            return o;
        }, {})
    );

    const columns: TableColumnsType<OrderItem> = [
        {
            title: 'Food name',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Image',
            key: 'image',
            dataIndex: 'image',
            align: 'center',
            render: (image) => (
                <div className="flex items-center justify-center">
                    <Image width={80} height={60} className="object-contain" src={image} />
                </div>
            ),
        },
        {
            title: 'Quantity',
            key: 'quantity',
            dataIndex: 'quantity',
            render: (quantity) => <p>{quantity}</p>,
        },
    ];

    const handleOutOfStock = (data) => {
        console.log('Out of stock: ', data);
    };

    const handleClickNextStatusExpect = (status) => {
        console.log(data);
        console.log(status);
    };

    return (
        <ModalBase type={type}>
            <div>
                <h2 className="text-xl font-semibold mb-6 text-center">
                    Order <b>[#{data.id}]</b>
                </h2>
            </div>

            <div className="border-y-2 border-dashed border-gray-200 py-3 bg-slate-50 mb-4">
                {data.status == 'pending' ? (
                    <div className="flex items-center gap-2 ">
                        <p className="font-medium text-gray-700 cursor-pointer">Next status: </p>{' '}
                        <div className=" cursor-pointer">
                            <Popconfirm
                                title={`Confirm to change order status to ${ORDER_STATUSES[1]} ?`}
                                onConfirm={() => handleClickNextStatusExpect(ORDER_STATUSES[1])}
                            >
                                <Button color="primary" variant="solid">
                                    {ORDER_STATUSES[1]}
                                </Button>
                            </Popconfirm>
                        </div>
                    </div>
                ) : data.status == 'processing' ? (
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-700">Next status: </p>{' '}
                        <div className=" cursor-pointer">
                            <Popconfirm
                                title={`Confirm to change order status to ${ORDER_STATUSES[2]}`}
                                onConfirm={() => handleClickNextStatusExpect(ORDER_STATUSES[2])}
                            >
                                <Button color="purple" variant="solid">
                                    {ORDER_STATUSES[2]}
                                </Button>
                            </Popconfirm>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>

            <Row gutter={[20, 20]} className="xl:flex xl:items-stretch ">
                {/* Món ăn */}
                <Col span={24} xl={12}>
                    <div className="p-4 bg-slate-50 rounded-md h-full">
                        <div className="mt-0">
                            <p className="text-blue-600 italic font-medium mb-2 underline">
                                Products information
                            </p>

                            <Table
                                columns={columns}
                                dataSource={data.items}
                                rowKey="key"
                                scroll={data.items.length > 5 ? { y: 300 } : undefined}
                                pagination={false}
                            />
                        </div>
                    </div>
                </Col>

                <Col span={24} xl={12}>
                    <div className="shadow-sm p-4 bg-slate-50 rounded-md h-full">
                        {/* Nguyên liệu */}
                        <div className="mt-0">
                            <p className="text-blue-600 italic font-medium mb-2 underline">
                                Ingredients information
                            </p>
                            <div className="max-h-[300px] overflow-y-auto">
                                {mergedIngredients.map((i: any) => (
                                    <div
                                        key={i.id}
                                        className="flex items-center justify-start gap-2 p-1 border-b border-gray-100 hover:bg-blue-50"
                                    >
                                        <p className="italic text-gray-600 w-[50px]">#{i.id}</p>
                                        <p className="min-w-[220px]">{i.ingredient_name}</p>
                                        <p className="font-medium min-w-[30px]">{i.quantity}</p>
                                        <p className="text-gray-500">(kg)</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Xác nhận nguyên liệu - [Pending] */}
                        {data.status == 'pending' && (
                            <div className="flex justify-end mt-5 flex-col gap-2">
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={(data) => handleOutOfStock(data)}
                                >
                                    <Form.Item
                                        name="note"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input reason!',
                                            },
                                        ]}
                                    >
                                        <TextArea rows={3} placeholder="Note..." />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            block
                                            danger
                                            onClick={() => form.submit()}
                                        >
                                            Out Of Stock
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </ModalBase>
    );
};

export default ModalOrderChef;
