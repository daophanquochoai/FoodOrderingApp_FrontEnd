import { ModalState } from '@/type/store/common';
import React, { useEffect, useRef, useState } from 'react';
import ModalBase from './ModalBase';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Image, Popconfirm, Row, Spin, Table, TableColumnsType } from 'antd';
import { selectSelectedOrder } from '@/store/selector/admin/order/order.selector';
import { OrderItem } from '@/type/store/admin/order/order.style';
import TextArea from 'antd/es/input/TextArea';
import {
    selectIngredientUse,
    selectLoadingComponent,
} from '@/store/selector/admin/ingredients/ingredient_use.selector';
import { fetchFirst, updateOrder } from '@/store/action/admin/ingredients/ingredient_use.action';
import { IngredientsUse } from '@/type/store/admin/ingredients/ingredients_use.style';

const ORDER_STATUSES = ['PENDING', 'PROCESSING', 'COMPLETE'] as const;

const ModalOrderChef: React.FC<ModalState> = ({ type, variant }) => {
    // form
    const [form] = Form.useForm();

    // hook
    const dispatch = useDispatch();

    // selector
    const selectedOrder = useSelector(selectSelectedOrder);
    const ingredientUse = useSelector(selectIngredientUse);
    const loadingComponent = useSelector(selectLoadingComponent);

    useEffect(() => {
        if (selectedOrder?.id) {
            dispatch(fetchFirst(selectedOrder?.id));
        }
    }, [selectedOrder]);

    // define column
    const columns: TableColumnsType<OrderItem> = [
        {
            title: 'Food name',
            key: 'name',
            render: (item: OrderItem) => <p>{item?.foodId?.foodId?.name}</p>,
        },
        {
            title: 'Image',
            key: 'image',
            align: 'center',
            render: (image: OrderItem) => (
                <div className="flex items-center justify-center">
                    <Image
                        width={80}
                        height={60}
                        className="object-contain"
                        src={image?.foodId?.foodId?.image}
                    />
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

    // event handling
    const handleOutOfStock = (data) => {
        dispatch(
            updateOrder({
                message: 'Out of stock',
                status: 'CANCEL',
            })
        );
    };

    const handleClickNextStatusExpect = (status) => {
        console.log(status);
        dispatch(
            updateOrder({
                message: '',
                status,
            })
        );
    };

    return (
        <ModalBase type={type}>
            <Spin spinning={loadingComponent}>
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-center">
                        Order <b>[#{selectedOrder?.id}]</b>
                    </h2>
                </div>

                <div className="border-y-2 border-dashed border-gray-200 py-3 bg-slate-50 mb-4">
                    {selectedOrder?.status == 'PENDING' ? (
                        <div className="flex items-center gap-2 ">
                            <p className="font-medium text-gray-700 cursor-pointer">
                                Next status:{' '}
                            </p>{' '}
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
                    ) : selectedOrder?.status == 'PROCESSING' ? (
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
                                    dataSource={selectedOrder?.orderItems}
                                    rowKey="key"
                                    scroll={
                                        selectedOrder?.orderItems?.length || 0 > 5
                                            ? { y: 300 }
                                            : undefined
                                    }
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
                                    {ingredientUse?.map((i: IngredientsUse) => (
                                        <div
                                            key={i?.id}
                                            className="flex items-center justify-start gap-2 p-1 border-b border-gray-100 hover:bg-blue-50"
                                        >
                                            <p className="italic text-gray-600 w-[50px]">#{i.id}</p>
                                            <p className="min-w-[220px]">{i?.ingredients?.name}</p>
                                            <p className="font-medium min-w-[30px]">
                                                {i?.quantity}
                                            </p>
                                            <p className="text-gray-500">({i?.unit})</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Xác nhận nguyên liệu - [Pending] */}
                            {selectedOrder?.status == 'PENDING' && (
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
            </Spin>
        </ModalBase>
    );
};

export default ModalOrderChef;
