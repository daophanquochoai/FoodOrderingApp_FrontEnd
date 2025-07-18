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

const ModalIngredient: React.FC<ModalIngredientProps> = ({
    isOpen,
    onClose,
    variant,
    ingredient,
}) => {
    const getModalTitle = (): string => {
        switch (variant) {
            case 'add':
                return 'Add New Ingredient';
            case 'edit':
                return 'Edit Ingredient';
            case 'delete':
                return 'Delete Ingredient';
            default:
                return 'Ingredient'; // Fallback
        }
    };

    const title = getModalTitle();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
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
        if (isOpen) {
            if (variant == 'edit' && ingredient) {
                reset({
                    name: ingredient.name,
                    unit: ingredient.unit,
                    low_threshold: ingredient.low_threshold,
                });
            } else {
                reset();
            }
        }
    }, [isOpen, reset]);

    return (
        <ModalBase isOpen={isOpen} onClose={onClose}>
            <div>
                <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
            </div>
            <div>
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
                                error={errors.name}
                            />
                        </Col>
                        <Col span={12}>
                            <FormFloatingSelect
                                name="unit"
                                control={control}
                                label="Unit"
                                options={units}
                                error={errors.unit}
                            />
                        </Col>
                        <Col span={12}>
                            <FormFloatingInput
                                name="low_threshold"
                                control={control}
                                label="Low Threshold"
                                placeholder="e.g., 10"
                                error={errors.low_threshold}
                            />
                        </Col>
                    </Row>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            type="primary"
                            className="bg-blue-500 hover:bg-blue-600"
                        >
                            {variant === 'add' ? 'Add Ingredient' : 'Update Ingredient'}
                        </Button>
                    </div>
                </form>
            </div>
        </ModalBase>
    );
};

export default ModalIngredient;
