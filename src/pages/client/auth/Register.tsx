import React, { useState } from 'react';
import ClientBreadcrumb from '../../../components/breadcrumb/ClientBreadcrumb';
import FloatingInput from '../../../components/input/FloatingInput';
import { Link } from 'react-router-dom';
import { validateEmail, validateName } from '../../../utils/helper';
import { GetProp, Upload, UploadProps } from 'antd';
import { useDispatch } from 'react-redux';
import { common } from '@/store/reducer';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userFullSchema } from '@/validation/auth.validation';
import { createUser } from '@/type/store/auth/authSlide';
import { createUserAction } from '@/store/action/auth/auth.action';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const Register = () => {
    // hook
    const dispatch = useDispatch();

    //state
    const [loading, setLoading] = useState<boolean>(false);
    const [image, setImage] = useState<string>('');

    // yup
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(userFullSchema),
        defaultValues: {
            name: '',
            phoneNumber: '',
            email: '',
            password: '',
        },
    });

    // event handling
    const handleChangeImage: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            setImage('');
            return;
        }
        if (info.file.status === 'done') {
            setLoading(false);
            setImage(info?.file?.response);
        }
    };

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

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    // event handling
    const onSubmit = (data) => {
        const user: createUser = {
            name: data?.name,
            phoneNumber: data?.phoneNumber,
            image: image,
            email: data?.email,
            password: data?.password,
            isActive: true,
            role: {
                roleName: 'USER',
            },
        };
        dispatch(createUserAction(user));
    };

    return (
        <div>
            <ClientBreadcrumb title="Create Account" items={[{ label: 'Home', to: '/' }]} />

            <div className="my-8">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="max-w-xl mx-auto p-8 pt-10 bg-white rounded-sm shadow-sm space-y-5"
                >
                    <h2 className="text-xl md:text-2xl font-kanit font-semibold tracking-wide text-center">
                        Create account
                    </h2>
                    <Upload
                        name="image"
                        listType="picture-card"
                        className="avatar-uploader overflow-hidden"
                        showUploadList={false}
                        action={`${import.meta.env.VITE_BACKEND_URL}/upload`}
                        beforeUpload={beforeUpload}
                        onChange={handleChangeImage}
                    >
                        {image ? (
                            <img src={image} alt="avatar" style={{ width: '100%' }} />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                    <FloatingInput
                        id="name"
                        label="Name"
                        type="text"
                        {...register('name')}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <FloatingInput
                        id="phoneNumber"
                        label="Phone number"
                        type="text"
                        {...register('phoneNumber')}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                    />
                    <FloatingInput
                        id="email"
                        label="Email"
                        type="text"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <FloatingInput
                        id="password"
                        label="Password"
                        type="text"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <button className="btn-primary" type="submit">
                        Create
                    </button>

                    <div className="text-center">
                        <Link to={'/'}>
                            <span className="underline-text text-base font-medium">
                                Return to store
                            </span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
