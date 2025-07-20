import React, { useEffect, useState } from 'react';
import ModalBase from './ModalBase';
import { ModalIngredientProps } from '../../type/modal/modal';
import FormFloatingInput from '../form/FormFloatingInput';
import { Ingredient } from '../../type';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IngredientShema } from '../yup/ingredient';
import { Button, Col, Row } from 'antd';
import FormFloatingSelect from '../form/FormFloatingSelect';
import { ModalState, ModalType } from '@/type/store/common';
import { useDispatch } from 'react-redux';
import { common } from '@/store/reducer';

const ModalIngredient: React.FC<ModalState> = ({ data, type, variant }) => {
    const dispatch = useDispatch();

    const getModalTitle = (): string => {
        switch (variant) {
            case 'edit':
                return 'Edit Ingredient';
            case 'delete':
                return 'Delete Ingredient';
            default:
                return 'Add New Ingredient';
        }
    };

    const title = getModalTitle();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(IngredientShema),
    });

    const onSubmit = (data: Ingredient) => {
        console.log('New values:', {
            ...data,
        });
    };

    const units = [
        { value: 'Kilogram', label: 'Kilogram' },
        { value: 'Gram', label: 'Gram' },
        { value: 'Liter', label: 'Liter' },
    ];

    useEffect(() => {
        if (variant == 'edit' && data) {
            reset({
                name: data.name,
                unit: data.unit,
                low_threshold: data.low_threshold,
            });
        } else {
            reset();
        }
    }, [data, reset]);

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(ModalType.INGREDIENT));
    };

    const handleDeleted = () => {
        console.log('--------id to delete---------', data.id);
    };

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
                                Are you sure you want to delete the ingredient <b>"{data.name}"</b>{' '}
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
                            <Col span={24}>
                                <FormFloatingInput
                                    name="name"
                                    control={control}
                                    label="Name"
                                    placeholder="Enter ingredient name"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            </Col>
                            <Col span={12}>
                                <FormFloatingSelect
                                    name="unit"
                                    control={control}
                                    label="Unit"
                                    options={units}
                                    error={!!errors.unit}
                                    helperText={errors.unit?.message}
                                />
                            </Col>
                            <Col span={12}>
                                <FormFloatingInput
                                    name="low_threshold"
                                    control={control}
                                    label="Low Threshold"
                                    placeholder="e.g., 10"
                                    error={!!errors.low_threshold}
                                    helperText={errors.low_threshold?.message}
                                />
                            </Col>
                        </Row>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                            <Button
                                onClick={handleSubmit(onSubmit)}
                                type="primary"
                                className="bg-blue-500 hover:bg-blue-600"
                                disabled={isSubmitting}
                            >
                                {variant === 'add' ? 'Add Ingredient' : 'Update Ingredient'}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </ModalBase>
    );
};

export default ModalIngredient;
