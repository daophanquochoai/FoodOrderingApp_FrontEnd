import { ModalState } from '@/type/store/common';
import React, { useState } from 'react';
import ModalBase from './ModalBase';
import { useDispatch, useSelector } from 'react-redux';
import { common } from '@/store/reducer';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    message,
    Row,
    Select,
    Space,
    Spin,
    Table,
    TableColumnsType,
} from 'antd';
import dayjs from 'dayjs';
import {
    selectFilterOption,
    selectHistorySelected,
    selectLoadingComponent,
} from '@/store/selector/admin/history/history.selector';
import { HistoryIngredientsDto } from '@/type/store/admin/history/history.style';
import { addHistoryImport, deleteHistoryImport } from '@/store/action/admin/history/history.action';
import Editor from '../editor/editor';

const ModalImportManagement: React.FC<ModalState> = ({ data, type, variant }) => {
    // hook
    const dispatch = useDispatch();

    // selector
    const selectedHistory = useSelector(selectHistorySelected);
    const filterOption = useSelector(selectFilterOption);
    const loadingComponent = useSelector(selectLoadingComponent);

    // state
    const [editorData, setEditorData] = useState('');

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

    // event handling

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(type));
    };
    //#region view
    if (variant == 'view') {
        const columns: TableColumnsType<HistoryIngredientsDto> = [
            {
                title: 'Ingredient Name',
                key: 'name',
                sorter: (a, b) => a?.ingredients?.name.localeCompare(b?.ingredients?.name),
                render: (item: HistoryIngredientsDto) => <p>{item?.ingredients?.name}</p>,
            },
            {
                title: 'Unit',
                key: 'unit',
                render: (item: HistoryIngredientsDto) => <p>{item?.ingredients?.unit}</p>,
            },
            {
                title: 'Import Price',
                key: 'price_per_unit',
                sorter: (a, b) => a?.pricePerUnit - b?.pricePerUnit,
                render: (price) => <p>{price?.pricePerUnit?.toLocaleString() || 0}đ</p>,
            },
            {
                title: 'Avg Price',
                key: 'avg_price',
                sorter: (a, b) => a?.avgPrice - b?.avgPrice,
                render: (price) => <p>{price?.avgPrice?.toLocaleString() || 0}đ</p>,
            },
            {
                title: 'Quantity',
                key: 'quantity',
                sorter: (a, b) => a?.quantity - b?.quantity,
                render: (item: HistoryIngredientsDto) => <p>{item?.quantity}</p>,
            },
            {
                title: 'Total',
                key: 'total',
                sorter: (a, b) =>
                    a?.quantity * a?.pricePerUnit || 0 - b?.quantity || 0 * b?.pricePerUnit || 0,
                render: (_, record) => (
                    <p>
                        {(record?.quantity || 0 * record?.pricePerUnit || 0)?.toLocaleString() || 0}
                        đ
                    </p>
                ),
            },
            {
                title: 'Expired time',
                key: 'expired_time',
                render: (expired_time: HistoryIngredientsDto) => (
                    <p>{dayjs(expired_time?.expiredTime).format('DD/MM/YYYY')}</p>
                ),
            },
        ];

        const totalPrice =
            selectedHistory?.historyIngredients?.reduce(
                (total, item) => total + item?.pricePerUnit || 0 * item?.quantity || 0,
                0
            ) || 0;

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
                                    <i>Batch Code:</i> <b>{selectedHistory?.bathCode}</b>
                                </p>
                            </Col>
                            <Col span={12}>
                                <p className="text-right">
                                    <i>Import Date: </i>
                                    <b>
                                        {dayjs(selectedHistory?.createdAt).format(
                                            'DD/MM/YYYY HH:MM'
                                        )}
                                    </b>
                                </p>
                            </Col>

                            <Col span={24}>
                                <p>
                                    <i>Note: </i> {selectedHistory?.note}
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
                                    <i>Supplier Code:</i> <b>{selectedHistory?.source?.id}</b>
                                </p>
                            </Col>
                            <Col span={24}>
                                <p>
                                    <i>Supplier Name: </i>
                                    <b>
                                        {selectedHistory?.source?.name} [
                                        {selectedHistory?.source?.taxCode}]
                                    </b>
                                </p>
                            </Col>
                            <Col span={24}>
                                <p>
                                    <i>Address: </i>
                                    <b>{selectedHistory?.source?.address}</b>
                                </p>
                            </Col>
                            <Col span={24}>
                                <p>
                                    <i>Email: </i>
                                    <b>{selectedHistory?.source?.email}</b>
                                </p>
                            </Col>
                            <Col span={24}>
                                <p>
                                    <i>Phone Number: </i>
                                    <b>{selectedHistory?.source?.phoneNumber}</b>
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
                            dataSource={selectedHistory?.historyIngredients}
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
        dispatch(deleteHistoryImport(selectedHistory?.id));
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
                            Are you sure you want to delete import{' '}
                            <b>"{selectedHistory?.bathCode}"</b> ?
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

            const payload = {
                type: 'IMPORT',
                note: editorData,
                bathCode: updatedData?.batchCode,
                source: {
                    id: updatedData?.source_id,
                },
                historyIngredients: updatedData?.ingredients.map((item) => {
                    return {
                        quantity: item?.quantity,
                        usedUnit: 0,
                        pricePerUnit: item?.price_per_unit,
                        unit: item?.unit,
                        expiredTime: item?.expired_time,
                        ingredients: {
                            id: item?.id,
                        },
                    };
                }),
            };
            dispatch(addHistoryImport(payload));
        };

        return (
            <ModalBase type={type}>
                <Spin spinning={loadingComponent}>
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
                                options={filterOption?.source?.map((s) => ({
                                    label: s.name,
                                    value: s.id,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item
                            name="batchCode"
                            label="Batch Code"
                            rules={[
                                { required: true, message: 'Please enter the batch code' },
                                { min: 12, message: 'Batch code must be at least 12 characters' },
                            ]}
                        >
                            <Input placeholder="Enter batch code (min 12 characters)" />
                        </Form.Item>

                        <Form.List name="ingredients" initialValue={[{}]}>
                            {(fields, { add, remove }) => {
                                const ingredientsSelected = form.getFieldValue('ingredients') || [];

                                return (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => {
                                            // Danh sách id đã chọn, bỏ qua chính dòng hiện tại
                                            const selectedIds = ingredientsSelected
                                                .map((item, idx) =>
                                                    idx !== name ? item?.id : null
                                                )
                                                .filter((id) => id !== null);

                                            // Lọc ra các nguyên liệu chưa được chọn
                                            const availableOptions = filterOption.ingredient.filter(
                                                (ing) => !selectedIds.includes(ing.id)
                                            );

                                            return (
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
                                                            {
                                                                required: true,
                                                                message: 'Select Ingredient',
                                                            },
                                                        ]}
                                                    >
                                                        <Select
                                                            style={{ width: 150 }}
                                                            placeholder="Ingredient"
                                                            onChange={(value) => {
                                                                const selected =
                                                                    filterOption.ingredient.find(
                                                                        (ing) => ing.id === value
                                                                    );
                                                                const currentValues =
                                                                    form.getFieldValue(
                                                                        'ingredients'
                                                                    ) || [];

                                                                // Cập nhật lại unit ứng với nguyên liệu
                                                                form.setFieldsValue({
                                                                    ingredients: currentValues.map(
                                                                        (item, idx) =>
                                                                            idx === name
                                                                                ? {
                                                                                      ...item,
                                                                                      unit: selected?.unit,
                                                                                  }
                                                                                : item
                                                                    ),
                                                                });
                                                            }}
                                                            options={availableOptions.map(
                                                                (ing) => ({
                                                                    label: ing.name,
                                                                    value: ing.id,
                                                                })
                                                            )}
                                                        />
                                                    </Form.Item>

                                                    {/* Đơn vị */}
                                                    <Form.Item name={[name, 'unit']}>
                                                        <Input
                                                            style={{ width: 100 }}
                                                            placeholder="Unit"
                                                            disabled
                                                        />
                                                    </Form.Item>

                                                    {/* Số lượng */}
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'quantity']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Enter quantity',
                                                            },
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

                                                    {/* Giá nhập */}
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'price_per_unit']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Enter price',
                                                            },
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

                                                    {/* Hạn sử dụng */}
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
                                            );
                                        })}

                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                block
                                                onClick={() => {
                                                    const selectedIds = (
                                                        form.getFieldValue('ingredients') || []
                                                    ).map((i) => i.id);
                                                    const available =
                                                        filterOption.ingredient.filter(
                                                            (i) => !selectedIds.includes(i.id)
                                                        );
                                                    if (available.length === 0) {
                                                        message.warning(
                                                            'Tất cả nguyên liệu đã được chọn'
                                                        );
                                                        return;
                                                    }
                                                    add();
                                                }}
                                            >
                                                + Ingredient
                                            </Button>
                                        </Form.Item>
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="description"
                                                className="text-sm mb-1 font-medium"
                                            >
                                                Description
                                            </label>
                                            <Editor
                                                editorData={editorData}
                                                setEditorData={(data) => {
                                                    setEditorData(data);
                                                }}
                                            />
                                        </div>
                                    </>
                                );
                            }}
                        </Form.List>

                        <Form.Item>
                            <Button
                                type="primary"
                                onClick={() => form.submit()}
                                block
                                className="mt-[10px]"
                            >
                                {variant == 'edit' ? 'Update Import' : 'Add Import'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </ModalBase>
        );
    }
    //#endregion
};

export default ModalImportManagement;
