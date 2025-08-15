import { ModalState } from '@/type/store/common';
import React, { useEffect, useState } from 'react';
import ModalBase from './ModalBase';
import { useDispatch, useSelector } from 'react-redux';
import { common, recipe } from '@/store/reducer';
import { Button, Form, Input, InputNumber, Select, Space, Spin, Tabs } from 'antd';
import { unitData } from '../unitIngredient/UnitIngredient';
import TabPane from 'antd/es/tabs/TabPane';
import {
    selectFilterOption,
    selectIngredient,
    selectLoadingComponent,
    seletSelectedFood,
} from '@/store/selector/admin/recipe/recipe.selector';
import {
    createRecipe,
    fetchFilterOption,
    fetchIngredinetsByFoodSize,
    updateRecipe,
} from '@/store/action/admin/recipe/recipe.action';

const ModalRecipeManagement: React.FC<ModalState> = ({ data, type, variant }) => {
    // hook
    const dispatch = useDispatch();
    const ingredientsList = useSelector(selectIngredient);
    const filterOption = useSelector(selectFilterOption);
    const selectFood = useSelector(seletSelectedFood);
    const loading = useSelector(selectLoadingComponent);

    // useEffect
    useEffect(() => {
        dispatch(fetchFilterOption());
    }, []);

    useEffect(() => {
        setIngredientsOption(ingredientsList);
    }, [ingredientsList]);

    // get title
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

    // state
    const [ingredientsOption, setIngredientsOption] = useState([]);
    const [selectedFoodId, setSelectedFoodId] = useState(null);
    const [selectedSizeId, setSelectedSizeId] = useState(null);
    const [sizeOptions, setSizeOptions] = useState([]);
    const [tab, setTab] = useState('0');
    const [form] = Form.useForm();

    // event handling
    const handleFoodChange = (foodId) => {
        setSelectedFoodId(foodId);
        const sizeList = filterOption?.food?.find((f) => f?.id === foodId)?.foodSizes;

        setSizeOptions(sizeList || []);

        form.setFieldsValue({ size: undefined });
        dispatch(recipe.actions.setIngredients(null));
    };

    const handleChangeSize = (foodsizeId) => {
        dispatch(fetchIngredinetsByFoodSize(foodsizeId));
    };

    const handleIngredientChange = (ingredientId, fieldIndex) => {
        const selected = filterOption?.ingredients?.find((i) => i.id === ingredientId);

        const currentIngredients = form.getFieldValue('ingredients') || [];

        // Derive allowed unit options from selected ingredient's base unit (case-insensitive)
        if (selected?.unit) {
            const normalizedBase = String(selected.unit).toLowerCase();
            let units = unitData.filter((u) => String(u.base).toLowerCase() === normalizedBase);

            // Fallback: if no matching base in unitData, at least include the ingredient's unit
            if (units.length === 0) {
                units = [
                    {
                        id: -1,
                        name: String(selected.unit),
                        type: 'custom',
                        base: normalizedBase,
                        ratio: 1,
                    },
                ];
            }

            // Choose default unit value that exists in options
            const defaultUnitValue =
                units.find((u) => String(u.name).toLowerCase() === normalizedBase)?.name ||
                String(selected.unit);

            // Auto-fill the unit field for the current ingredient row
            if (Array.isArray(currentIngredients)) {
                const updated = currentIngredients.map((item, idx) =>
                    idx === fieldIndex ? { ...item, unit: defaultUnitValue } : item
                );
                form.setFieldsValue({ ingredients: updated });
            }
        }
    };

    const handleSubmitForm = (data) => {
        dispatch(createRecipe(data));
    };

    const handleUpdateForm = (data) => {
        data = {
            ...data,
            sizeId: selectedSizeId?.value,
        };
        dispatch(updateRecipe(data));
    };

    //#region add new
    if (variant == 'add') {
        return (
            <ModalBase type={type}>
                <Spin spinning={loading}>
                    <div>
                        <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
                    </div>
                    <Form form={form} layout="vertical" onFinish={(data) => handleSubmitForm(data)}>
                        {/* Chọn món ăn */}
                        <Form.Item name="food_id" label="Food name" rules={[{ required: true }]}>
                            <Select
                                showSearch
                                placeholder="Select food"
                                onChange={handleFoodChange}
                                options={filterOption?.food?.map((food) => ({
                                    label: food?.name,
                                    value: food?.id,
                                }))}
                            />
                        </Form.Item>

                        {/* Chọn size phụ thuộc món ăn */}
                        <Form.Item name="size" label="Size" rules={[{ required: true }]}>
                            <Select
                                placeholder="Select size"
                                disabled={!selectedFoodId}
                                onChange={handleChangeSize}
                                options={sizeOptions?.map((s) => ({
                                    label: s?.sizeId?.name,
                                    value: s?.id,
                                }))}
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
                                                    {
                                                        required: true,
                                                        message: 'Select ingredient',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    style={{ width: 160 }}
                                                    showSearch
                                                    optionFilterProp="label"
                                                    placeholder="Ingredient"
                                                    onChange={(value) =>
                                                        handleIngredientChange(value, index)
                                                    }
                                                    disabled={!selectedFoodId}
                                                    options={filterOption?.ingredients?.map(
                                                        (ing) => ({
                                                            label: ing.name,
                                                            value: ing.id,
                                                            disabled: (
                                                                form.getFieldValue('ingredients') ||
                                                                []
                                                            ).some(
                                                                (item) =>
                                                                    item?.ingredients_id === ing.id
                                                            ),
                                                        })
                                                    )}
                                                />
                                            </Form.Item>

                                            {/* Số lượng */}
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'quantity_per_unit']}
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
                                                    placeholder="Quantity"
                                                    disabled={!selectedFoodId}
                                                />
                                            </Form.Item>

                                            {/* Đơn vị (hiển thị dưới dạng input, luôn disabled) */}
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'unit']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Unit cannot be empty',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    style={{ width: 160 }}
                                                    placeholder="Unit"
                                                    disabled
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
                                            + Add ingredient
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
                </Spin>
            </ModalBase>
        );
    }
    //#endregion

    //#region edit
    if (variant === 'edit' || variant === 'view') {
        useEffect(() => {
            if (selectFood?.foodSizes?.length > 0) {
                setSelectedSizeId({
                    label: selectFood?.foodSizes?.filter(i => i.isActive)[0]?.sizeId?.name,
                    value: selectFood?.foodSizes?.filter(i => i.isActive)[0]?.id,
                });
               
                form.setFieldsValue({
                    foodId: selectFood?.name,
                    sizeId: selectFood?.foodSizes?.filter(i => i.isActive)[0]?.sizeId?.name,
                });
                dispatch(fetchIngredinetsByFoodSize(selectFood?.foodSizes?.filter(i => i.isActive)[0]?.id));

            }
        }, [variant, selectFood, form]);

        // useEffect
        useEffect(() => {
            form.setFieldsValue({
                ingredients: ingredientsOption.map((i) => ({
                    ingredients_id: {
                        label: i?.ingredients?.name,
                        value: i?.ingredients?.id,
                    },
                    quantity_per_unit: i?.quantityPerUnit,
                    unit: i?.ingredients?.unit,
                })),
            });
        }, [ingredientsOption]);

        // event handling
        const handleChangeTab = (e) => {
            setTab(e);
            if (selectFood?.foodSizes?.length > 0) {
                setSelectedSizeId({
                    label: selectFood?.foodSizes?.filter((i) => i?.isActive == true)[e]?.sizeId
                        ?.name,
                    value: selectFood?.foodSizes?.filter((i) => i?.isActive == true)[e]?.id,
                });
                dispatch(
                    fetchIngredinetsByFoodSize(
                        selectFood?.foodSizes?.filter((i) => i?.isActive == true)[e]?.id
                    )
                );
                form.setFieldsValue({
                    foodId: selectFood?.name,
                    sizeId: selectFood?.foodSizes?.filter((i) => i?.isActive == true)[e]?.sizeId
                        ?.name,
                });
            }
            dispatch(
                fetchIngredinetsByFoodSize(
                    selectFood?.foodSizes?.filter((i) => i?.isActive == true)[e]?.id
                )
            );
        };

        return (
            <ModalBase type={type}>
                <Spin spinning={loading}>
                    <div>
                        <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
                    </div>

                    <Tabs defaultActiveKey={tab} onChange={(e) => handleChangeTab(e)}>
                        {selectFood?.foodSizes
                            ?.filter((i) => i?.isActive == true)
                            ?.map(
                                (size, index) => (
                                    <TabPane tab={size?.sizeId?.name} key={index.toString()}>
                                        <Form
                                            form={form}
                                            layout="vertical"
                                            onFinish={(data) => handleUpdateForm(data)}
                                        >
                                            <Form.Item label="Food name" name="foodId">
                                                <Input
                                                    disabled
                                                    className="custom-readonly-select"
                                                />
                                            </Form.Item>

                                            <Form.Item label="Size" name="sizeId">
                                                <Input
                                                    disabled
                                                    className="custom-readonly-select"
                                                />
                                            </Form.Item>

                                            {/* Nguyên liệu */}
                                            <Form.List name="ingredients">
                                                {(fields, { add, remove }) => (
                                                    <>
                                                        {fields.map(
                                                            (
                                                                { key, name, ...restField },
                                                                index
                                                            ) => (
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
                                                                        name={[
                                                                            name,
                                                                            'ingredients_id',
                                                                        ]}
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message:
                                                                                    'Select ingredient',
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Select
                                                                            placeholder="Ingredient"
                                                                            showSearch
                                                                            optionFilterProp="label"
                                                                            style={{ width: 160 }}
                                                                            disabled={
                                                                                variant == 'view'
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            options={filterOption?.ingredients?.map(
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
                                                                        name={[
                                                                            name,
                                                                            'quantity_per_unit',
                                                                        ]}
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message:
                                                                                    'Enter quantity',
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <InputNumber
                                                                            placeholder="Quantity"
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
                                                                                message:
                                                                                    'Unit cannot be empty',
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Input
                                                                            placeholder="Unit"
                                                                            style={{ width: 160 }}
                                                                            disabled
                                                                        />
                                                                    </Form.Item>

                                                                    {variant == 'edit' && (
                                                                        <Button
                                                                            danger
                                                                            onClick={() =>
                                                                                remove(name)
                                                                            }
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
                                                                    + Add ingredient
                                                                </Button>
                                                            </Form.Item>
                                                        )}
                                                    </>
                                                )}
                                            </Form.List>

                                            {variant == 'edit' && (
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit" block>
                                                        Update recipe
                                                    </Button>
                                                </Form.Item>
                                            )}
                                        </Form>
                                    </TabPane>
                                )
                                // console.log(size)
                            )}
                    </Tabs>
                </Spin>
            </ModalBase>
        );
    }
    //#endregion
};

export default ModalRecipeManagement;
