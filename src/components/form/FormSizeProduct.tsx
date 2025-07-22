import { Button, Input, Select, Form, message, Popconfirm } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectFitlerOption,
    selectFoodSelected,
} from '@/store/selector/admin/food/food_manager.selector';
import { createFoodSize, removeFoodSize } from '@/store/action/admin/food/food_manager.action';
import { createFoodSizeSchema } from '@/validation/foodSize.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { common } from '@/store/reducer';

const FormFoodSize = ({ name }) => {
    // selector
    const selectedFood = useSelector(selectFoodSelected);
    const filterOption = useSelector(selectFitlerOption);

    //hook
    const dispatch = useDispatch();

    // yup
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(createFoodSizeSchema),
        defaultValues: {
            sizeId: '',
            price: '0',
            readyInMinutes: null,
            discount: null,
        },
    });

    // use
    useEffect(() => {
        if (errors?.discount || errors?.price || errors?.readyInMinutes || errors?.sizeId) {
            dispatch(common.actions.setErrorMessage('Please fill in all feild'));
        }
    }, [errors]);

    // event handling
    const handleAddFoodSize = (e) => {
        const data = {
            discount: e?.discount,
            readyInMinutes: e?.readyInMinutes,
            price: e?.price,
            foodId: {
                id: selectedFood?.id,
            },
            sizeId: {
                id: e?.sizeId,
            },
            isActive: true,
        };
        dispatch(createFoodSize({ data, resetYup }));
    };

    const resetYup = () => {
        reset({
            sizeId: '',
            price: '0',
            readyInMinutes: null,
            discount: null,
        });
    };

    const handleRemoveFoodSize = (item) => {
        dispatch(
            removeFoodSize({
                data: {
                    ...item,
                    isActive: false,
                },
                id: item?.id,
            })
        );
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div>
                    <h2 className="text-lg font-semibold">Food Sizes</h2>
                    {selectedFood?.foodSizes &&
                        selectedFood?.foodSizes?.length > 0 &&
                        selectedFood?.foodSizes
                            .filter((item) => item.isActive)
                            .map((item, index) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between px-4 py-2 my-2 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-medium text-gray-700">
                                            Size: {item?.sizeId?.name}
                                        </span>
                                        <span className="text-sm text-gray-700 font-medium">
                                            Price: ${item.price}
                                        </span>
                                    </div>
                                    <Popconfirm
                                        title={`Remove size ${item?.sizeId?.name} ?`}
                                        onConfirm={() => handleRemoveFoodSize(item)}
                                    >
                                        <Button danger className="!h-auto !px-3 !py-1 text-sm">
                                            Remove
                                        </Button>
                                    </Popconfirm>
                                </div>
                            ))}

                    <div className="my-4 flex items-center gap-2">
                        <Controller
                            control={control}
                            name="sizeId"
                            render={({ field }) => (
                                <Select
                                    style={{ width: 120 }}
                                    placeholder="Select size"
                                    value={field.value}
                                    onChange={(value) => field.onChange(value)}
                                >
                                    {selectedFood?.foodSizes &&
                                    selectedFood?.foodSizes.length > 0 &&
                                    filterOption.size
                                        ? filterOption.size
                                              ?.filter(
                                                  (s) =>
                                                      !selectedFood?.foodSizes.some(
                                                          (fs) =>
                                                              fs?.sizeId?.name === s.name &&
                                                              fs.isActive
                                                      )
                                              )
                                              .map((s) => (
                                                  <Select.Option key={s.id} value={s.id}>
                                                      {s.name}
                                                  </Select.Option>
                                              ))
                                        : filterOption.size.map((s) => (
                                              <Select.Option key={s.id} value={s.id}>
                                                  {s.name}
                                              </Select.Option>
                                          ))}
                                </Select>
                            )}
                        />
                        <Controller
                            control={control}
                            name="price"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="Price"
                                    style={{ width: 120 }}
                                    prefix={'$'}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*\.?\d*$/.test(value) || value === '') {
                                            field.onChange(value === '' ? null : Number(value));
                                        }
                                    }}
                                    value={typeof field.value === 'number' ? field.value : ''}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="discount"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="Discount"
                                    style={{ width: 120 }}
                                    suffix="%"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Chỉ cho phép số hoặc chuỗi rỗng (nếu muốn nullable)
                                        if (/^\d*\.?\d*$/.test(value) || value === '') {
                                            field.onChange(value === '' ? null : Number(value));
                                        }
                                    }}
                                    value={typeof field.value === 'number' ? field.value : ''}
                                />
                            )}
                        />
                        <Controller
                            name="readyInMinutes"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="number"
                                    placeholder="Ready In Minutes"
                                    style={{ width: 120 }}
                                    suffix="minutes"
                                    {...field}
                                    value={typeof field.value === 'number' ? field.value : ''}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            )}
                        />

                        <Button onClick={handleSubmit(handleAddFoodSize)} type="dashed">
                            + Add Food Size
                        </Button>
                    </div>
                </div>
            )}
        />
    );
};

export default FormFoodSize;
