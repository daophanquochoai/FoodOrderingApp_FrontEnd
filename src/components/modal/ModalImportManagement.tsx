import { ModalState, ModalType } from '@/type/store/common';
import React, { useEffect, useState } from 'react';
import ModalBase from './ModalBase';
import { useDispatch } from 'react-redux';
import { common } from '@/store/reducer';
import {
    Button,
    Col,
    DatePicker,
    DatePickerProps,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
    Table,
    TableColumnsType,
    Tabs,
} from 'antd';
import dayjs from 'dayjs';
import { unitData } from '../unitIngredient/UnitIngredient';

const ModalImportManagement: React.FC<ModalState> = ({ data, type, variant }) => {
    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const getModalTitle = (): string => {
        switch (variant) {
            case 'edit':
                return 'Edit Import';
            case 'delete':
                return 'Delete Import';
            case 'view':
                return 'Detail Import';
            default:
                return 'Add New Import';
        }
    };

    const title = getModalTitle();

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(type));
    };

    const handleSubmitForm = (data) => {
        console.log('-------data form-----', data);
        if (variant == 'add') onClose();
    };

    //#region view
    if (variant == 'view') {
        console.log(data);

        const columns: TableColumnsType = [
            {
                title: 'Ingredient Name',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'Unit',
                dataIndex: 'unit',
                key: 'unit',
            },
            {
                title: 'Import Price',
                dataIndex: 'price_per_unit',
                key: 'price_per_unit',
                sorter: (a, b) => a.price_per_unit - b.price_per_unit,
                render: (price) => <p>{price.toLocaleString()}đ</p>,
            },
            {
                title: 'Avg Price',
                dataIndex: 'avg_price',
                key: 'avg_price',
                sorter: (a, b) => a.avg_price - b.avg_price,
                render: (price) => <p>{price.toLocaleString()}đ</p>,
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity',
                sorter: (a, b) => a.quantity - b.quantity,
            },
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
                sorter: (a, b) => a.quantity * a.price_per_unit - b.quantity * b.price_per_unit,
                render: (_, record) => (
                    <p>{(record.quantity * record.price_per_unit).toLocaleString()}đ</p>
                ),
            },
            {
                title: 'Expired time',
                dataIndex: 'expired_time',
                key: 'expired_time',
                render: (expired_time) => <p>{dayjs(expired_time).format('DD/MM/YYYY')}</p>,
            },
        ];

        const totalPrice = data.ingredients.reduce(
            (total, item) => total + item.price_per_unit * item.quantity,
            0
        );

        return (
            <ModalBase type={type}>
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
                </div>
                <div>
                    <div>
                        <p className="text-blue-600 italic font-medium mb-2 underline">
                            Import information
                        </p>
                        <Row gutter={[0, 5]}>
                            <Col span={12}>
                                <p>
                                    <i>Batch Code:</i> <b>{data.batch_code}</b>
                                </p>
                            </Col>
                            <Col span={12}>
                                <p className="text-right">
                                    <i>Import Date: </i>
                                    <b>{dayjs(data.create_at).format('DD/MM/YYYY HH:MM')}</b>
                                </p>
                            </Col>

                            <Col span={24}>
                                <p>
                                    <i>Note: </i> {data.note}
                                </p>
                            </Col>
                        </Row>
                    </div>

                    <div className="mt-5">
                        <p className="text-blue-600 italic font-medium mb-2 underline">
                            Supplier information
                        </p>
                        <Row gutter={[0, 5]}>
                            <Col span={24}>
                                <p>
                                    <i>Supplier Code:</i> <b>{data.source.id}</b>
                                </p>
                            </Col>
                            <Col span={24}>
                                <p>
                                    <i>Supplier Name: </i>
                                    <b>
                                        {data.source.name} [{data.source.taxCode}]
                                    </b>
                                </p>
                            </Col>
                            <Col span={24}>
                                <p>
                                    <i>Address: </i>
                                    <b>{data.source.address}</b>
                                </p>
                            </Col>
                            <Col span={24}>
                                <p>
                                    <i>Email: </i>
                                    <b>{data.source.email}</b>
                                </p>
                            </Col>
                            <Col span={24}>
                                <p>
                                    <i>Phone Number: </i>
                                    <b>{data.source.phoneNumber}</b>
                                </p>
                            </Col>
                        </Row>
                    </div>

                    <div className="mt-5">
                        <p className="text-blue-600 italic font-medium mb-2 underline">
                            Ingredients information
                        </p>
                        <Table
                            columns={columns}
                            dataSource={data.ingredients}
                            rowKey="key"
                            scroll={{ x: 'max-content' }}
                            pagination={false}
                        />
                        <p className="mt-3 text-sm font-semibold text-right mr-3">
                            Total: {totalPrice.toLocaleString()}đ
                        </p>
                    </div>
                </div>
            </ModalBase>
        );
    }
    //#endregion

    //#region delete
    const handleDeleted = () => {
        console.log('---------delete record---------', data);
    };

    if (variant == 'delete') {
        return (
            <ModalBase type={type}>
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-center">Delete Import</h2>
                </div>
                <div className="">
                    <p className="text-center text-red-600">
                        <>
                            Are you sure you want to delete import <b>"{data.batch_code}"</b> ?
                        </>
                    </p>
                    <div className="flex justify-end space-x-3 mt-6">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" danger onClick={handleDeleted}>
                            Delete
                        </Button>
                    </div>
                </div>
            </ModalBase>
        );
    }
    //#endregion

    //#region new + edit
    if (variant === 'edit' || variant === 'add') {
        const suppliers = [
            {
                id: 1,
                name: 'Công ty TNHH Nguyên Liệu Xanh',
                address: '123 Lê Lợi, Quận 1, TP.HCM',
                phoneNumber: '0909123456',
                email: 'contact@nguyenlieuxanh.vn',
                link: 'https://nguyenlieuxanh.vn',
                taxCode: '0301234567',
                create_at: '2025-07-01T10:00:00',
                late_update_time: '2025-08-01T09:00:00',
                is_active: true,
            },
            {
                id: 2,
                name: 'HTX Nông Sản Miền Tây',
                address: 'Ấp 3, Chợ Lách, Bến Tre',
                phoneNumber: '0911123456',
                email: 'htx@nongsanmientay.vn',
                link: 'https://nongsanmientay.vn',
                taxCode: '1400234567',
                create_at: '2025-07-05T08:30:00',
                late_update_time: '2025-08-01T08:00:00',
                is_active: true,
            },
        ];

        const ingredients = [
            {
                id: 1,
                name: 'Thịt bò',
                unit: 'kg',
                low_threshold: 10,
                create_at: '2025-06-01T09:00:00',
                late_update_time: '2025-08-01T07:00:00',
                is_active: true,
            },
            {
                id: 2,
                name: 'Rau xà lách',
                unit: 'kg',
                low_threshold: 5,
                create_at: '2025-06-05T10:15:00',
                late_update_time: '2025-08-01T07:10:00',
                is_active: true,
            },
            {
                id: 3,
                name: 'Bột mì',
                unit: 'kg',
                low_threshold: 20,
                create_at: '2025-06-10T14:00:00',
                late_update_time: '2025-08-01T07:30:00',
                is_active: true,
            },
            {
                id: 4,
                name: 'Đường trắng',
                unit: 'kg',
                low_threshold: 15,
                create_at: '2025-06-15T11:45:00',
                late_update_time: '2025-08-01T07:45:00',
                is_active: true,
            },
        ];

        const handleSubmitForm = (data) => {
            if (!data.ingredients || data.ingredients.length === 0) {
                console.log('Invalid import form');
                return;
            }

            const updatedData = {
                ...data,
                ingredients: data.ingredients.map((item) => ({
                    ...item,
                    expired_time: item.expired_time ? item.expired_time.format('YYYY-MM-DD') : null,
                })),
            };

            console.log('Dữ liệu sau khi chuẩn hóa ngày:', updatedData);

            if (variant === 'add') onClose();
        };

        console.log(data);

        return (
            <ModalBase type={type}>
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
                </div>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(data) => handleSubmitForm(data)}
                    initialValues={{
                        source_id: data?.source.id,
                        ingredients: data?.ingredients?.map((item) => ({
                            ...item,
                            expired_time: item.expired_time ? dayjs(item.expired_time) : null,
                        })),
                    }}
                >
                    <Form.Item name="source_id" label="Supplier" rules={[{ required: true }]}>
                        <Select
                            showSearch
                            placeholder="Supplier name"
                            optionFilterProp="label"
                            options={suppliers.map((s) => ({
                                label: s.name,
                                value: s.id,
                            }))}
                        />
                    </Form.Item>

                    <Form.List name="ingredients" initialValue={[{}]}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }, index) => (
                                    <Space
                                        key={key}
                                        style={{ display: 'flex', marginBottom: 8 }}
                                        align="baseline"
                                    >
                                        {/* Chọn nguyên liệu */}
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'id']}
                                            rules={[
                                                { required: true, message: 'Select Ingredient' },
                                            ]}
                                        >
                                            <Select
                                                style={{ width: 120 }}
                                                placeholder="Ingredient"
                                                options={ingredients.map((ing) => ({
                                                    label: ing.name,
                                                    value: ing.id,
                                                }))}
                                            />
                                        </Form.Item>

                                        {/* Đơn vị:  */}
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'unit']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Unit cannot be left blank',
                                                },
                                            ]}
                                        >
                                            <Select
                                                style={{ minWidth: 80 }}
                                                placeholder="Unit"
                                                // onChange={(value) => handleChangeUnit(value, index)}
                                                options={unitData.map((unit) => ({
                                                    label: unit.name,
                                                    value: unit.ratio, // giá trị là tỉ số đơn vị so với kg
                                                }))}
                                            />
                                        </Form.Item>

                                        {/* Số lượng */}
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'quantity']}
                                            rules={[
                                                { required: true, message: 'Enter quantity' },
                                                {
                                                    type: 'number',
                                                    min: 0.01,
                                                    message: 'Must be greater than 0',
                                                },
                                            ]}
                                        >
                                            <InputNumber
                                                style={{ minWidth: 60 }}
                                                placeholder="Quantity"
                                            />
                                        </Form.Item>

                                        {/* Gái nhập */}
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'price_per_unit']}
                                            rules={[
                                                { required: true, message: 'Enter price' },
                                                {
                                                    type: 'number',
                                                    min: 0.01,
                                                    message: 'Must be greater than 0',
                                                },
                                            ]}
                                        >
                                            <InputNumber
                                                style={{ minWidth: 80 }}
                                                placeholder="Price"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, 'expired_time']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Enter expiration date',
                                                },
                                                {
                                                    validator: (_, value) => {
                                                        if (
                                                            !value ||
                                                            (dayjs.isDayjs(value) &&
                                                                value.isValid())
                                                        ) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(
                                                            new Error('Invalid date')
                                                        );
                                                    },
                                                },
                                            ]}
                                        >
                                            <DatePicker />
                                        </Form.Item>

                                        <Button danger onClick={() => remove(name)}>
                                            X
                                        </Button>
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block>
                                        + Ingredient
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item>
                        <Button type="primary" onClick={() => form.submit()} block>
                            {variant == 'edit' ? 'Update Import' : 'Add Import'}
                        </Button>
                    </Form.Item>
                </Form>
            </ModalBase>
        );
    }
    //#endregion
};

export default ModalImportManagement;
