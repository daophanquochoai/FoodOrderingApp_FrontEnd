import React, { useEffect, useState } from 'react';
import ModalBase from './ModalBase';
import { ModalIngredientProps } from '../../type/modal/modal';
import FormFloatingInput from '../form/FormFloatingInput';
import { Ingredient } from '../../type';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IngredientShema } from '../yup/ingredient';
import { Button, Col, Descriptions, DescriptionsProps, Row } from 'antd';
import FormFloatingSelect from '../form/FormFloatingSelect';
import { ModalState, ModalType } from '@/type/store/common';
import { useDispatch, useSelector } from 'react-redux';
import { common } from '@/store/reducer';
import dayjs from 'dayjs';
import { SpoilIngredientSchema } from '@/validation/spoilIngredient.validation';
import FormSelectAnt from '../form/FormSelectAnt';
import { FormInput } from '../form';
import { fetchFirst as fetchHistoryBatches, setHistoryFilter } from '@/store/action/admin/history/history.action';
import { fetchHistoryIngredients, addIngredientsError, updateIngredientsError } from '@/store/action/admin/ingredients/ingredients_error.action';
import { selectHistory } from '@/store/selector/admin/history/history.selector';
import { selectHistoryIngredients} from '@/store/selector/admin/ingredients/ingredients_error.selector';

const ModalSpoilIngredient: React.FC<ModalState> = ({ data, type, variant }) => {
    const dispatch = useDispatch();

    const historyBatches = useSelector(selectHistory);
    const historyIngredients = useSelector(selectHistoryIngredients);

    const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null);
    const [selectedIngredientId, setSelectedIngredientId] = useState<number | null>(null);
    const [maxQuantity, setMaxQuantity] = useState<number>(0);

    const getModalTitle = (): string => {
        switch (variant) {
            case 'edit':
                return 'Edit Spoil Ingredient';
            case 'delete':
                return 'Delete A Spoil Ingredient';
            case 'view':
                return 'Spoil Ingredient';
            default:
                return 'Add A Spoil Ingredient Report ';
        }
    };

    const title = getModalTitle();

    const {
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: undefined,
            batchCode: undefined,
            unit: "",   
            quantity: undefined,
            reason: ""
        },
        resolver: yupResolver(SpoilIngredientSchema),
        context: { maxQuantity }
    });

    const watchBatchCode = watch('batchCode');
    const watchName = watch('name');

    useEffect(() => {
        dispatch(setHistoryFilter({
            pageNo: 1,
            pageSize: 100,
        }));
        dispatch(fetchHistoryBatches());
    }, [dispatch]);

    useEffect(() => {
        if (watchBatchCode) {
            console.log('Batch code changed:', watchBatchCode);
            const batchId = parseInt(String(watchBatchCode), 10);
            setSelectedBatchId(batchId);
            dispatch(fetchHistoryIngredients({ id: batchId }));
            setValue('name', undefined);
            setSelectedIngredientId(null);
            setMaxQuantity(0);
        } else {
            setSelectedBatchId(null); // Thêm dòng này để đảm bảo reset khi watchBatchCode bị xóa
        }
    }, [watchBatchCode, setValue, dispatch]);

    useEffect(() => {
        if (watchName && Array.isArray(historyIngredients)) {
            const ingredientId = parseInt(String(watchName));
            setSelectedIngredientId(ingredientId);

            const selectedHistory = historyIngredients.find(
                (history) => history.id === ingredientId
            );
            
            if (selectedHistory) {
                setMaxQuantity(selectedHistory.quantity);
                setValue('unit', selectedHistory.unit);
                setValue('quantity', undefined);
            }
        }
    }, [watchName, historyIngredients, setValue]);

    useEffect(() => {
        if (variant == 'edit' && data) {
            reset({
                name: data.name,   /// id number not string....
                batchCode: data.batchCode,
                unit: data.unit,
                quantity: data.quantity,
                reason: data.reason,
            });
        } else {
            reset({
                name: undefined,
                batchCode: undefined,
                unit: "",   
                quantity: undefined,
                reason: ""
            });
        }
    }, [data, reset, variant]);

    const onSubmit = async (formData: any) => {
        try {
            console.log('Form data submitted:', formData);

            const payload = {
                unit: formData.unit,
                quantity: Number(formData.quantity),
                reason: formData.reason,
                historyIngredients: {
                    id: selectedIngredientId
                }
            };

            switch (variant) {
                case 'add':
                    await dispatch(addIngredientsError({
                        isActive: true,
                        ...payload
                    }));
                    break;

                case 'edit':
                    if (!data?.id) {
                        console.log('Cannot update: Missing ID');
                        return;
                    }
                    await dispatch(updateIngredientsError({
                        data: {
                            isActive: true,
                            ...payload
                        },
                        id: data.id,
                    }));
                    dispatch(common.actions.setSuccessMessage('Cập nhật nguyên liệu lỗi thành công'));
                    break;
                default:
                    console.log('Unknown variant:', variant);
                    return;
            }
            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(ModalType.SPOIL_INGREDIENT));
    };

    const handleDeleted = async () => {
        try {
            if (!data?.id) {
                console.log('Cannot delete: Missing ID');
                return;
            }
            
            console.log('Deleting spoil ingredient with ID:', data.id);

            await dispatch(updateIngredientsError({
                data: {
                    unit: data.unit,
                    quantity: Number(data.quantity),
                    reason: data.reason,
                    historyIngredients: {
                        id: data.name
                    },
                    isActive: false,
                },
                id: data.id,
            }));

            dispatch(common.actions.setSuccessMessage('Xóa nguyên liệu lỗi thành công'));
            onClose();
            
        } catch (error) {
            console.error('Error deleting spoil ingredient:', error);
        }
    };

    if(variant == "view"){
        const spoilIngredient: DescriptionsProps['items'] = [
            {
                key: 'name',
                label: 'Ingredient name',
                children: data?.name,
                },
                {
                    key: 'batchCode',
                    label: 'Import batch code',
                    children: data?.batchCode,
                },
                {
                    key: 'unit',
                    label: 'Unit',
                    children: data?.unit,
                },
                {
                    key: 'quantity',
                    label: 'Quantity',
                    children: data?.quantity,
                },
                {
                    key: 'reason',
                    label: 'Reason',
                    children: data?.reason,
                },
        ];

        return (
            <ModalBase type={type}>
                <div className="bg-white px-2 py-2 rounded-md">
                    <Descriptions
                        title="Damaged ingredient information"
                        bordered
                        column={1}
                        items={spoilIngredient}
                    />
                </div>
            </ModalBase>
        );
    }

    return (
        <ModalBase type={type}>
            <div>
                <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
            </div>
            <div>
                {variant === 'delete' ? (
                    <div className="">
                        <p className="text-center text-red-600">
                            <>
                                Are you sure you want to delete the spoil report <b>"{data.name}"</b>{' '}
                                ?
                            </>
                        </p>
                        <div className="flex justify-end space-x-3 mt-6">
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="primary" danger onClick={handleDeleted}>
                                Delete Ingredient
                            </Button>
                        </div>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="p-6 bg-white rounded-2xl shadow-md space-y-6"
                    >
                        {/* Form Grid */}
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <FormSelectAnt
                                    name="batchCode"
                                    control={control}
                                    label="Import Batch Code"
                                    options={historyBatches && historyBatches.data ? historyBatches.data.map(batch => ({
                                        value: batch.id.toString(),
                                        label: `${batch.bathCode || 'Batch'} #${batch.id}`
                                    })) : []}
                                    error={!!errors.batchCode}
                                    helperText={errors.batchCode?.message}
                                />
                            </Col>
                            <Col span={8}>
                                {selectedBatchId && (
                                    <FormSelectAnt
                                        name="name"
                                        control={control}
                                        label="Ingredient"
                                        options={Array.isArray(historyIngredients) ? historyIngredients.map(item => ({
                                            value: item.id.toString(),
                                            label: `${item.ingredients.name || 'Ingredient'}`
                                        })) : []}
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                        disabled={!selectedBatchId}
                                    />
                                )}
                            </Col>
                            <Col span={8}>
                                {selectedIngredientId && (
                                    <FormInput
                                        name="quantity"
                                        control={control}
                                        type='number'
                                        label={`Quantity (Max: ${maxQuantity})`}
                                        placeholder="Enter quantity"
                                        error={!!errors.quantity}
                                        helperText={errors.quantity?.message}
                                        disabled={!selectedIngredientId}
                                        rules={{
                                            validate: value => {
                                                const numValue = Number(value);
                                                if (!numValue || numValue <= 0) return "Quantity must be greater than 0";
                                                if (maxQuantity > 0 && numValue > maxQuantity) return `Quantity cannot exceed ${maxQuantity}`;
                                                return true;
                                            }
                                        }}
                                    />
                                )}
                            </Col>
                            <Col span={24}>
                                <FormFloatingInput
                                    name="reason"
                                    control={control}
                                    type='textarea'
                                    label="Reason"
                                    placeholder="Enter reason..."
                                    error={!!errors.reason}
                                    helperText={errors.reason?.message}
                                />
                            </Col>
                        </Row>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                            <Button onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                htmlType='submit'
                                type="primary"
                                className="bg-blue-500 hover:bg-blue-600"
                                disabled={isSubmitting}
                            >
                                {variant === 'add' ? 'Add Spoil Report' : 'Update Spoil Report'}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </ModalBase>
    );
};

export default ModalSpoilIngredient