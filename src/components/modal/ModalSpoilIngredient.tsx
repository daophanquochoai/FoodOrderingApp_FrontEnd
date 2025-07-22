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
import { useDispatch } from 'react-redux';
import { common } from '@/store/reducer';
import dayjs from 'dayjs';
import { SpoilIngredientSchema } from '@/validation/spoilIngredient.validation';
import FormSelectAnt from '../form/FormSelectAnt';
import { FormInput } from '../form';

const ModalSpoilIngredient: React.FC<ModalState> = ({ data, type, variant }) => {
    const dispatch = useDispatch();

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
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: [],
            importHistoryId: [],
            quantity: undefined,
            reason: ""
        },
        resolver: yupResolver(SpoilIngredientSchema),
    });

    const onSubmit = (data: any) => {
        console.log('New values:', {
            ...data,
        });
    };

    const optionsIngredient = [
        { value: 1, label: 'Gạo' },
        { value: 2, label: 'Dầu ăn' },
    ];

    const optionsHistoryIngredientIds = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
    ];

    useEffect(() => {
        if (variant == 'edit' && data) {
            reset({
                name: data.name,   /// id number not string....
                importHistoryId: data.importHistoryId,
                quantity: data.quantity,
                reason: data.reason,
            });
        } else {
            reset({
                name: "",
                importHistoryId: "",
                quantity: "",
                reason: "",
            });
        }
    }, [data, reset]);

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(ModalType.INGREDIENT));
    };

    const handleDeleted = () => {
        console.log('--------id to delete---------', data.id);
    };


            // reason: "Dầu ăn bảo quản hỏng aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            // create_at: '2024-09-03T10:00:00Z',


    if(variant == "view"){
        const spoilIngredient: DescriptionsProps['items'] = [
            {
                key: 'name',
                label: 'Tên nguyên liệu',
                children: data.name,
                },
                {
                    key: 'importHistoryId',
                    label: 'Mã lô nhập',
                    children: data.importHistoryId,
                },
                {
                    key: 'unit',
                    label: 'Đơn vị',
                    children: data.unit,
                },
                {
                    key: 'quantity',
                    label: 'Số lượng hư',
                    children: data.quantity,
                },
                {
                    key: 'reason',
                    label: 'Lý do hư',
                    children: data.reason,
                },
                {
                    key: 'create_at',
                    label: 'Ngày tạo',
                    children: dayjs(data.create_at).format('DD/MM/YYYY'),
                },
                {
                    key: 'create_at',
                    label: 'Ngày cập nhật',
                    children: data.late_update_time ? dayjs(data.late_update_time).format('DD/MM/YYYY') : "no date",
                },
        ];

        return (
            <ModalBase type={type}>
                <div className="bg-white px-2 py-2 rounded-md">
                    <Descriptions
                        title="Thông tin nguyên liệu hư hỏng"
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
                                    name="name"
                                    control={control}
                                    label="Name"
                                    options={optionsIngredient}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            </Col>
                            <Col span={8}>
                                <FormSelectAnt
                                    name="importHistoryId"
                                    control={control}
                                    label="Import History Ids"
                                    options={optionsHistoryIngredientIds}
                                    error={!!errors.importHistoryId}
                                    helperText={errors.importHistoryId?.message}
                                />
                            </Col>
                            <Col span={8}>
                                <FormInput
                                    name="quantity"
                                    control={control}
                                    type='number'
                                    label="Quatity"
                                    placeholder="e.g., 10"
                                    error={!!errors.quantity}
                                    helperText={errors.quantity?.message}
                                />
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
                            <Button
                                onClick={handleSubmit(onSubmit)}
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