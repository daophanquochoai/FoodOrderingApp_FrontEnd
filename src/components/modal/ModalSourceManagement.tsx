import { ModalState, ModalType } from '@/type/store/common';
import { Button, Col, Descriptions, DescriptionsProps, Row, Spin } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import ModalBase from './ModalBase';
import { useDispatch, useSelector } from 'react-redux';
import { common } from '@/store/reducer';
import FormFloatingInput from '../form/FormFloatingInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SourceSchema } from '@/validation/source.validate';
import {
    selectLoadingComponent,
    selectSourceSelected,
} from '@/store/selector/admin/source/source.selector';
import { createSource, updateSource } from '@/store/action/admin/source/source.action';

const ModalSourceManagement: React.FC<ModalState> = ({ data, type, variant }) => {
    // hook
    const dispatch = useDispatch();

    // selector
    const selectedSource = useSelector(selectSourceSelected);
    const loading = useSelector(selectLoadingComponent);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: selectedSource?.name,
            taxCode: selectedSource?.taxCode,
            address: selectedSource?.address,
            phoneNumber: selectedSource?.phoneNumber,
            email: selectedSource?.email,
            link: selectedSource?.link,
        },
        resolver: yupResolver(SourceSchema),
    });

    const onSubmit = (data: any) => {
        if (variant == 'add') {
            dispatch(
                createSource({
                    ...data,
                    isActive: true,
                })
            );
        } else {
            dispatch(
                updateSource({
                    ...data,
                    id: selectedSource?.id,
                    isActive: true,
                })
            );
        }
    };

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(ModalType.SOURCE_MANAGEMENT));
    };

    const handleDeleted = () => {
        dispatch(
            updateSource({
                ...selectedSource,
                id: selectedSource?.id,
                isActive: false,
            })
        );
    };

    if (variant == 'view') {
        const sourceInfo: DescriptionsProps['items'] = [
            {
                key: 'name',
                label: 'Tên nhà cung cấp',
                children: selectedSource?.name,
            },
            {
                key: 'taxCode',
                label: 'Mã thuế',
                children: selectedSource?.taxCode,
            },
            {
                key: 'address',
                label: 'Địa chỉ',
                children: selectedSource?.address,
            },
            {
                key: 'phoneNumber',
                label: 'Số điện thoại',
                children: selectedSource?.phoneNumber,
            },
            {
                key: 'email',
                label: 'Email',
                children: selectedSource?.email,
            },
            {
                key: 'link',
                label: 'Link',
                children: selectedSource?.link ? (
                    <Link to={`${selectedSource?.link}`}>{selectedSource?.link}</Link>
                ) : (
                    'No link'
                ),
            },
            {
                key: 'create_at',
                label: 'Ngày tạo',
                children: dayjs(selectedSource?.createdAt).format('DD/MM/YYYY'),
            },
            {
                key: 'late_update_time',
                label: 'Ngày cập nhật',
                children: selectedSource?.createdAt
                    ? dayjs(selectedSource?.createdAt).format('DD/MM/YYYY')
                    : 'No update',
            },
        ];

        return (
            <ModalBase type={type}>
                <Descriptions
                    title="Thông tin nhà cung cấp"
                    bordered
                    column={1}
                    items={sourceInfo}
                />
            </ModalBase>
        );
    }

    if (variant == 'delete') {
        return (
            <ModalBase type={type}>
                <Spin spinning={loading}>
                    <div>
                        <h2 className="text-xl font-semibold mb-6 text-center">Delete supplier</h2>
                    </div>
                    <div className="">
                        <p className="text-center text-red-600">
                            <>
                                Are you sure you want to delete supplier <b>"{data.name}"</b> ?
                            </>
                        </p>
                        <div className="flex justify-end space-x-3 mt-6">
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="primary" danger onClick={handleDeleted}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </Spin>
            </ModalBase>
        );
    }

    return (
        <ModalBase type={type}>
            <Spin spinning={loading}>
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-center">
                        {variant == 'edit'
                            ? 'Edit Supplier Information'
                            : 'Add New Supplier Information'}
                    </h2>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white rounded-2xl ">
                        {/* Form Grid */}
                        <Row className="space-y-4">
                            <Col span={24}>
                                <FormFloatingInput
                                    name="name"
                                    control={control}
                                    type="input"
                                    label="Name"
                                    placeholder="* Enter name..."
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            </Col>
                            <Col span={24}>
                                <FormFloatingInput
                                    name="taxCode"
                                    control={control}
                                    type="input"
                                    label="Tax code"
                                    placeholder="* Enter tax code..."
                                    error={!!errors.taxCode}
                                    helperText={errors.taxCode?.message}
                                />
                            </Col>
                            <Col span={24}>
                                <FormFloatingInput
                                    name="address"
                                    control={control}
                                    type="input"
                                    label="Address"
                                    placeholder="* Enter address..."
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                />
                            </Col>
                            <Col span={24}>
                                <FormFloatingInput
                                    name="phoneNumber"
                                    control={control}
                                    type="input"
                                    label="Phone number"
                                    placeholder="* Enter phone number..."
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber?.message}
                                />
                            </Col>
                            <Col span={24}>
                                <FormFloatingInput
                                    name="email"
                                    control={control}
                                    type="email"
                                    label="Email"
                                    placeholder="* Enter email..."
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            </Col>
                            <Col span={24}>
                                <FormFloatingInput
                                    name="link"
                                    control={control}
                                    type="text"
                                    label="Link"
                                    placeholder="Enter link..."
                                    error={!!errors.link}
                                    helperText={errors.link?.message}
                                />
                            </Col>
                        </Row>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4 pt-6 mt-4 border-t border-gray-200">
                            <Button
                                onClick={handleSubmit(onSubmit)}
                                type="primary"
                                className="bg-blue-500 hover:bg-blue-600"
                                disabled={isSubmitting}
                            >
                                {variant === 'add' ? 'Add Supplier' : 'Update Supplier'}
                            </Button>
                        </div>
                    </form>
                </div>
            </Spin>
        </ModalBase>
    );
};

export default ModalSourceManagement;
