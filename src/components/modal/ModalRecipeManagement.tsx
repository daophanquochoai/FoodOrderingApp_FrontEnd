import { ModalState, ModalType } from '@/type/store/common';
import React, { useEffect, useState } from 'react';
import ModalBase from './ModalBase';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { empAccountSchema } from '@/validation/account.validation';
import { common } from '@/store/reducer';
import {
    Button,
    Col,
    Form,
    GetProp,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
    Spin,
    Tabs,
    Upload,
    UploadProps,
    message,
} from 'antd';
import { FormInput } from '../form';
import FormSelectAnt from '../form/FormSelectAnt';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { unitData } from '../unitIngredient/UnitIngredient';
import TabPane from 'antd/es/tabs/TabPane';

const ModalRecipeManagement: React.FC<ModalState> = ({ data, type, variant }) => {
    console.log(data);

    const dispatch = useDispatch();

    const getModalTitle = (): string => {
        switch (variant) {
            case 'edit':
                return 'Edit Recipe';
            case 'delete':
                return 'Delete Recipe';
            default:
                return 'Add New Recipe';
        }
    };

    const title = getModalTitle();

    const { foods, ingredients, foodsIngredient, sizes, record } = data;

    const [selectedFoodId, setSelectedFoodId] = useState(null); // lưu id food, để --> size
    const [sizeOptions, setSizeOptions] = useState([]); // size của món ăn đã được lựa chọn
    const [unitOptions, setUnitOptions] = useState([]); // lưu các unit tương đồng của nguyên liệu: kg, mg, g,....

    // ----dùng form của antD----
    const [form] = Form.useForm();

    // ----xử lý khi thay đổi món thì cần thay đổi size hiện có----
    const handleFoodChange = (foodId) => {
        setSelectedFoodId(foodId);
        const selectedFood = foods.find((f) => f.id === foodId);

        setSizeOptions(selectedFood?.sizes || []);

        form.setFieldsValue({ size: undefined }); // reset size khi đổi món
    };

    // ----xử lý khi thay đổi hoặc thêm nguyên liệu mới --> lọc ra những đơn vị kiểu giống nhau: kg, g, mg,...---
    const handleIngredientChange = (ingredientId, fieldIndex) => {
        const selected = ingredients.find((i) => i.id === ingredientId); // lấy ra nguyên liệu
        const currentIngredients = form.getFieldValue('ingredients') || []; // tìm tới row

        const unitFromIngredient = unitData.find((u) => u.base == selected.unit); // từ đơn vị gốc của nguyên liệu
        const units = unitData.filter((u) => u.base == unitFromIngredient.base); // Suy ra nhóm nguyên liệu tương đương

        setUnitOptions(units);

        form.setFieldsValue({ ingredients: currentIngredients });
    };

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(type));
    };

    const handleSubmitForm = (data) => {
        console.log('-------data form-----', data);
        if (variant == 'add') onClose();
    };

    //#region add new
    if (variant == 'add') {
        return (
            <ModalBase type={type}>
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
                </div>
                <Form form={form} layout="vertical" onFinish={(data) => handleSubmitForm(data)}>
                    {/* Chọn món ăn */}
                    <Form.Item name="food_id" label="Tên món ăn" rules={[{ required: true }]}>
                        <Select
                            placeholder="Chọn món ăn"
                            onChange={handleFoodChange}
                            options={foods.map((food) => ({
                                label: food.name,
                                value: food.id,
                            }))}
                        />
                    </Form.Item>

                    {/* Chọn size phụ thuộc món ăn */}
                    <Form.Item name="sizeId" label="Size" rules={[{ required: true }]}>
                        <Select
                            placeholder="Chọn size"
                            disabled={!selectedFoodId}
                            options={sizeOptions.map((s) => ({ label: s.name, value: s.id }))}
                        />
                    </Form.Item>

                    {/* Danh sách nguyên liệu */}
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
                                            name={[name, 'ingredients_id']}
                                            rules={[
                                                { required: true, message: 'Chọn nguyên liệu' },
                                            ]}
                                        >
                                            <Select
                                                style={{ width: 160 }}
                                                placeholder="Nguyên liệu"
                                                onChange={(value) =>
                                                    handleIngredientChange(value, index)
                                                }
                                                disabled={!selectedFoodId}
                                                options={ingredients.map((ing) => ({
                                                    label: ing.name,
                                                    value: ing.id,
                                                }))}
                                            />
                                        </Form.Item>

                                        {/* Số lượng */}
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'quantity_per_unit']}
                                            rules={[
                                                { required: true, message: 'Nhập số lượng' },
                                                {
                                                    type: 'number',
                                                    min: 0.01,
                                                    message: 'Phải lớn hơn 0',
                                                },
                                            ]}
                                        >
                                            <InputNumber
                                                placeholder="Số lượng"
                                                disabled={!selectedFoodId}
                                            />
                                        </Form.Item>

                                        {/* Đơn vị:  */}
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'unit']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Đơn vị không được bỏ tróng',
                                                },
                                            ]}
                                        >
                                            <Select
                                                style={{ width: 160 }}
                                                placeholder="Đơn vị"
                                                // onChange={(value) => handleChangeUnit(value, index)}
                                                disabled={!selectedFoodId}
                                                options={unitOptions.map((unit) => ({
                                                    label: unit.name,
                                                    value: unit.name,
                                                    // value: unit.id,
                                                }))}
                                            />
                                        </Form.Item>

                                        <Button
                                            danger
                                            onClick={() => remove(name)}
                                            disabled={!selectedFoodId}
                                        >
                                            X
                                        </Button>
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        disabled={!selectedFoodId}
                                    >
                                        + Thêm nguyên liệu
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                        <Button type="primary" onClick={() => form.submit()} block>
                            Add Recipe
                        </Button>
                    </Form.Item>
                </Form>
            </ModalBase>
        );
    }
    //#endregion

    //#region delete
    const handleDeleted = () => {
        console.log('---------delete record---------', record);
    };

    if (variant == 'delete') {
        return (
            <ModalBase type={type}>
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-center">Delete recipe</h2>
                </div>
                <div className="">
                    <p className="text-center text-red-600">
                        <>
                            Are you sure you want to delete all recipe of <b>"{record.name}"</b> ?
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

    //#region edit
    if (variant === 'edit' || variant === 'view') {
        const currentFood = record;

        useEffect(() => {
            if (variant === 'edit' && record?.sizes?.length > 0) {
                // Gọi cho từng ingredient của từng size để thiết lập unitOptions ban đầu
                record.sizes.forEach((size) => {
                    size.ingredients.forEach((ingredient, index) => {
                        const selected = ingredients.find(
                            (i) => i.id === ingredient.ingredients_id
                        );
                        if (selected) {
                            const unitFromIngredient = unitData.find(
                                (u) => u.base == selected.unit
                            );
                            if (unitFromIngredient) {
                                const units = unitData.filter(
                                    (u) => u.base == unitFromIngredient.base
                                );
                                // chỉ set unitOptions nếu đúng size đang active?
                                // Hoặc merge hết vào 1 mảng nếu dùng chung cho tất cả tab
                                setUnitOptions((prev) => {
                                    const map = new Map();
                                    [...prev, ...units].forEach((u) => map.set(u.name, u));
                                    return Array.from(map.values()); // loại trùng
                                });
                            }
                        }
                    });
                });
            }
        }, [variant, record, ingredients]);

        return (
            <ModalBase type={type}>
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
                </div>

                <Tabs defaultActiveKey="0">
                    {currentFood?.sizes.map(
                        (size, index) => (
                            <TabPane tab={size.name} key={index.toString()}>
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={(data) => handleSubmitForm(data)}
                                    initialValues={{
                                        foodId: currentFood.id,
                                        sizeId: size.id,
                                        ingredients: size.ingredients,
                                    }}
                                >
                                    <Form.Item label="Tên món ăn" name="foodId">
                                        <Select
                                            disabled
                                            className="custom-readonly-select"
                                            options={foodsIngredient.map((f) => ({
                                                label: f.name,
                                                value: f.id,
                                            }))}
                                        />
                                    </Form.Item>

                                    <Form.Item label="Size" name="sizeId">
                                        <Select
                                            disabled
                                            className="custom-readonly-select"
                                            options={[
                                                {
                                                    label: size.name,
                                                    value: size.id,
                                                },
                                            ]}
                                        />
                                    </Form.Item>

                                    {/* Nguyên liệu */}
                                    <Form.List name="ingredients">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(
                                                    ({ key, name, ...restField }, index) => (
                                                        <Space
                                                            key={key}
                                                            style={{
                                                                display: 'flex',
                                                                marginBottom: 8,
                                                            }}
                                                            align="baseline"
                                                        >
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'ingredients_id']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Chọn nguyên liệu',
                                                                    },
                                                                ]}
                                                            >
                                                                <Select
                                                                    placeholder="Nguyên liệu"
                                                                    style={{ width: 160 }}
                                                                    disabled={
                                                                        variant == 'view'
                                                                            ? true
                                                                            : false
                                                                    }
                                                                    options={ingredients.map(
                                                                        (i) => ({
                                                                            label: i.name,
                                                                            value: i.id,
                                                                        })
                                                                    )}
                                                                    onChange={(value) =>
                                                                        handleIngredientChange(
                                                                            value,
                                                                            index
                                                                        )
                                                                    }
                                                                    className="custom-readonly-select"
                                                                />
                                                            </Form.Item>

                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'quantity_per_unit']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Nhập số lượng',
                                                                    },
                                                                ]}
                                                            >
                                                                <InputNumber
                                                                    placeholder="Số lượng"
                                                                    readOnly={
                                                                        variant == 'view'
                                                                            ? true
                                                                            : false
                                                                    }
                                                                />
                                                            </Form.Item>

                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'unit']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Chọn đơn vị',
                                                                    },
                                                                ]}
                                                            >
                                                                <Select
                                                                    placeholder="Đơn vị"
                                                                    style={{ width: 160 }}
                                                                    className="custom-readonly-select"
                                                                    disabled={
                                                                        variant == 'view'
                                                                            ? true
                                                                            : false
                                                                    }
                                                                    options={unitOptions.map(
                                                                        (u) => ({
                                                                            label: u.name,
                                                                            value: u.name,
                                                                        })
                                                                    )}
                                                                />
                                                            </Form.Item>

                                                            {variant == 'edit' && (
                                                                <Button
                                                                    danger
                                                                    onClick={() => remove(name)}
                                                                >
                                                                    X
                                                                </Button>
                                                            )}
                                                        </Space>
                                                    )
                                                )}

                                                {variant == 'edit' && (
                                                    <Form.Item>
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => add()}
                                                            block
                                                        >
                                                            + Thêm nguyên liệu
                                                        </Button>
                                                    </Form.Item>
                                                )}
                                            </>
                                        )}
                                    </Form.List>

                                    {variant == 'edit' && (
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" block>
                                                Cập nhật công thức
                                            </Button>
                                        </Form.Item>
                                    )}
                                </Form>
                            </TabPane>
                        )
                        // console.log(size)
                    )}
                </Tabs>
            </ModalBase>
        );
    }
    //#endregion
};

export default ModalRecipeManagement;
