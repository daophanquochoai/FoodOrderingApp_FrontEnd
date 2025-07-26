import { useState, useEffect } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message as antMessage, Spin, Upload } from 'antd';
import type { UploadChangeParam, RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectInfo,
    selectLoadingComponent,
} from '@/store/selector/client/account/account.selector';
import { yupResolver } from '@hookform/resolvers/yup';
import { userInfoSchema } from '@/validation/user.validation';
import { useForm } from 'react-hook-form';
import { FloatingInput } from '@/components/input';
import { fetchFirst, updateAccount } from '@/store/action/client/account/account.action';

const UserInfo = () => {
    // state
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    // selector
    const accountInfo = useSelector(selectInfo);
    const loadingComonent = useSelector(selectLoadingComponent);

    // hook
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userInfoSchema),
        defaultValues: {
            fullName: accountInfo?.name || '',
            phoneNumber: accountInfo?.phoneNumber || '',
            email: accountInfo?.email || '',
        },
    });

    //useEffect
    useEffect(() => {
        dispatch(fetchFirst());
    }, []);

    useEffect(() => {
        reset({
            fullName: accountInfo?.name || '',
            phoneNumber: accountInfo?.phoneNumber || '',
            email: accountInfo?.email || '',
        });
        setImageUrl(accountInfo?.image);
    }, [accountInfo]);

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            antMessage.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            antMessage.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleUploadChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            if (info.file.originFileObj) {
                setLoading(false);
                const url = URL.createObjectURL(info.file.originFileObj);
                setImageUrl(url);
            }
        }
        if (info.file.status === 'error') {
            setLoading(false);
            antMessage.error('Upload failed.');
        }
    };

    const customRequest = ({ onSuccess }: any) => {
        setTimeout(() => {
            onSuccess('ok', new XMLHttpRequest());
        }, 1000);
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleReset = () => {
        reset({
            fullName: accountInfo?.name || '',
            phoneNumber: accountInfo?.phoneNumber || '',
            email: accountInfo?.email || '',
        });
        setImageUrl(accountInfo?.image);
    };

    const onSubmit = (data) => {
        dispatch(
            updateAccount({
                ...accountInfo,
                email: data?.email,
                name: data?.fullName,
                phoneNumber: data?.phoneNumber,
                image: imageUrl,
            })
        );
    };

    return (
        <Spin spinning={loadingComonent}>
            <div className="bg-white p-6 border border-gray-300 rounded-lg">
                <div className="flex flex-col gap-6 p-8">
                    <strong className="text-2xl mb-4">Personal profile</strong>

                    <form
                        className="flex flex-col xl:px-40 gap-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="mb-6 flex flex-col items-center">
                            <Upload
                                name="avatar"
                                listType="picture-circle"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={`${import.meta.env.VITE_BACKEND_URL}/upload`}
                                beforeUpload={beforeUpload}
                                onChange={handleUploadChange}
                                customRequest={customRequest}
                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{ width: '100%', borderRadius: '50%' }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                            <p className="text-gray-500 mt-2 text-sm">
                                Click to upload or change your profile photo
                            </p>
                        </div>
                        <FloatingInput
                            id="fullName"
                            label="Full Name"
                            type="text"
                            {...register('fullName')}
                            error={!!errors.fullName}
                            helperText={errors.fullName?.message}
                        />
                        <FloatingInput
                            id="phoneNumber"
                            label="Phone Number"
                            type="number"
                            {...register('phoneNumber')}
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber?.message}
                        />
                        <FloatingInput
                            disabled
                            id="email"
                            label="Email"
                            type="email"
                            {...register('email')}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <div className="flex gap-4 justify-end mt-2">
                            <button
                                type="submit"
                                className={`bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded transition-colors w-auto`}
                            >
                                Save Changes
                            </button>
                            <div
                                onClick={handleReset}
                                className="border cursor-pointer border-gray-300 text-gray-700 py-3 px-6 rounded hover:bg-gray-100 transition-colors w-auto"
                            >
                                Reset
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Spin>
    );
};

export default UserInfo;
