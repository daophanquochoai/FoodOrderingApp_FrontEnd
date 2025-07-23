import { ModalState, ModalType } from '@/type/store/common';
import { Button, Col, Descriptions, DescriptionsProps, Row } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import ModalBase from './ModalBase';
import { useDispatch } from 'react-redux';
import { common } from '@/store/reducer';
import FormFloatingInput from '../form/FormFloatingInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { link } from 'fs';
import { SourceSchema } from '@/validation/source.validate';

const ModalSourceManagement: React.FC<ModalState> = ({ data, type, variant }) => {

    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: "",   /// id number not string....
            taxCode: "",
            address: "",
            phoneNumber: "",
            email: "",
            link: "",
        },
        resolver: yupResolver(SourceSchema),
    });

    useEffect(() => {
        if (variant == 'edit' && data) {
            reset({
                name: data.name,   /// id number not string....
                taxCode: data.taxCode,
                address: data.address,
                phoneNumber: data.phoneNumber,
                email: data.email,
                link: data.link,
            });
        } 
    }, [data, reset]);

    const onSubmit = (data: any) => {
        console.log('New values:', {
            ...data,
        });
    };


    const onClose = () => {
        dispatch(common.actions.setHiddenModal(ModalType.SOURCE_MANAGEMENT));
    };

    const handleDeleted = () => {
        console.log("--------delete--------", data.id);
    }


    if(variant == "view"){

        const sourceInfo: DescriptionsProps['items'] = [
            {
                key: 'name',
                label: 'Tên nhà cung cấp',
                children: data.name,
            },
            {
                key: 'taxCode',
                label: 'Mã thuế',
                children: data.taxCode,
            },
            {
                key: 'address',
                label: 'Địa chỉ',
                children: data.address,
            },
            {
                key: 'phoneNumber',
                label: 'Số điện thoại',
                children: data.phoneNumber,
            },
            {
                key: 'email',
                label: 'Email',
                children: data.email,
            },
            {
                key: 'link',
                label: 'Link',
                children: data.link ? <Link to='#'>{data.link}</Link> : "No link",
            },
            {
                key: 'create_at',
                label: 'Ngày tạo',
                children: dayjs(data.create_at).format('DD/MM/YYYY'),
            },
            {
                key: 'late_update_time',
                label: 'Ngày cập nhật',
                children: data.late_update_time ? dayjs(data.late_update_time).format('DD/MM/YYYY') : "No update",
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
        )
    }

    if(variant == "delete"){
        return (
            <ModalBase type={type}>    
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-center">Delete supplier</h2>
                </div>
                <div className="">
                    <p className="text-center text-red-600">
                        <>
                            Are you sure you want to delete supplier <b>"{data.name}"</b>{' '}
                            ?
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
        )
    }

    return (
        <ModalBase type={type}>
            <div>
                <h2 className="text-xl font-semibold mb-6 text-center">{variant == "edit" ? "Edit Supplier Information" : "Add New Supplier Information"}</h2>
            </div>
            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-4 bg-white rounded-2xl "
                >
                    {/* Form Grid */}
                    <Row className='space-y-4'>
                        <Col span={24}>
                            <FormFloatingInput
                                name="name"
                                control={control}
                                type='input'
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
                                type='input'
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
                                type='input'
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
                                type='input'
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
                                type='email'
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
                                type='text'
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
        </ModalBase>
    )
}

export default ModalSourceManagement