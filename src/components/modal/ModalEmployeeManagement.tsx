import { ModalState, ModalType } from '@/type/store/common';
import React, { useEffect, useState } from 'react';
import ModalBase from './ModalBase';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { empAccountSchema } from '@/validation/account.validation';
import { common } from '@/store/reducer';
import { Button, Col, GetProp, Row, Upload, UploadProps, message } from 'antd';
import { FormInput } from '../form';
import FormSelectAnt from '../form/FormSelectAnt';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const ModalEmployeeManagement: React.FC<ModalState> = ({ data, type, variant }) => {
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState<string>('');

    const getModalTitle = (): string => {
        switch (variant) {
            case 'edit':
                return 'Edit Employee Account';
            case 'delete':
                return 'Delete Employee Account';
            default:
                return 'Add Employee Account';
        }
    };

    const title = getModalTitle();

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: '',
            cccd: '',
            username: '',
            email: '',
            role: '',
            image: '',
        },
        resolver: yupResolver(empAccountSchema),
    });

    const onSubmit = (data: any) => {
        console.log('New values:', {
            ...data,
        });
    };

    useEffect(() => {
        if (variant == 'edit' && data) {
            reset({
                name: data.name,
                cccd: data.cccd,
                username: data.username,
                email: data.email,
                role: data.role.role,
                image: data?.image,
            });
            setImageUrl(data?.image || '');
        }
    }, [data, reset]);

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(type));
    };

    const handleDeleted = () => {
        console.log('--------id to delete---------', data.id);
    };

    // Handle image upload
    const handleImageChange = (info: any) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            const url = info.file.response?.url || URL.createObjectURL(info.file.originFileObj);
            setImageUrl(url);
            setValue('image', url);
        }
    };

    if (variant == 'delete') {
        return (
            <ModalBase type={type}>
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
                </div>
                <div className="">
                    <p className="text-center text-red-600">
                        <>
                            Are you sure you want to delete the account of <b>"{data.name}"</b> ?
                        </>
                    </p>
                    <div className="flex justify-end space-x-3 mt-6">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" danger onClick={handleDeleted}>
                            Delete Account
                        </Button>
                    </div>
                </div>
            </ModalBase>
        );
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            dispatch(common.actions.setErrorMessage('You can only upload JPG/PNG file!'));
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            dispatch(common.actions.setErrorMessage('Image must smaller than 2MB!'));
        }
        return isJpgOrPng && isLt2M;
    };

    const roles = [
        { value: 'Admin', label: 'Admin' },
        { value: 'Manager', label: 'Manager' },
        { value: 'Staff', label: 'Staff' },
        // { value: 1, label: 'Admin' },
        // { value: 2, label: 'Manager' },
        // { value: 3, label: 'Staff' },
    ];

    return (
        <ModalBase type={type}>
            <div>
                <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 pb-2 bg-white rounded-2xl space-y-6"
            >
                {/* Form Grid */}
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <FormInput
                            name="name"
                            control={control}
                            type="text"
                            label="Name"
                            placeholder="Fullname"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </Col>
                    <Col span={12}>
                        <FormInput
                            name="cccd"
                            control={control}
                            type="text"
                            label="Citizen ID Card"
                            placeholder="Citizen ID Card"
                            error={!!errors.cccd}
                            helperText={errors.cccd?.message}
                        />
                    </Col>
                    <Col span={12}>
                        <FormInput
                            name="username"
                            control={control}
                            type="text"
                            label="Username"
                            placeholder="Username"
                            error={!!errors.username}
                            helperText={errors.username?.message}
                        />
                    </Col>
                    <Col span={12}>
                        <FormInput
                            name="email"
                            control={control}
                            type="email"
                            label="Email"
                            placeholder="Email"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Col>
                    <Col span={12}>
                        <FormSelectAnt
                            name="role"
                            control={control}
                            label="Role"
                            options={roles}
                            error={!!errors.role}
                            helperText={errors.role?.message}
                        />
                    </Col>
                    <Col span={24}>
                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Profile Image
                            </label>
                        </div>
                        <Upload
                            name="image"
                            listType="picture-card"
                            className="avatar-uploader overflow-hidden"
                            showUploadList={false}
                            onChange={handleImageChange}
                            beforeUpload={beforeUpload}
                        >
                            {imageUrl ? (
                                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                        )}
                    </Col>
                </Row>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        type="primary"
                        className="bg-blue-500 hover:bg-blue-600"
                        disabled={isSubmitting}
                        block
                    >
                        {variant === 'add' ? 'Create Account' : 'Update Account'}
                    </Button>
                </div>
            </form>
        </ModalBase>
    );
};

export default ModalEmployeeManagement;
