import React, { useEffect, useState } from 'react';
import ModalBase from './ModalBase';
import { Button, GetProp, Upload, UploadProps } from 'antd';
import { FloatingInput, FloatingSelect } from '../input';
import { useDispatch, useSelector } from 'react-redux';
import { common } from '@/store/reducer';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { selectFilterOption } from '@/store/selector/admin/category/category.selector';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createCategorySchema } from '@/validation/category.validation';
import { Category } from '@/type/store/client/collection/collection.style';
import {
    createCategory,
    deleteCategory,
    updateCategory,
} from '@/store/action/admin/category/category.action';
import { ModalType } from '@/type/store/common';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const ModalCategory: React.FC<any> = ({ data, type, variant }) => {
    // state
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('');
    const [parentId, setParentId] = useState('');
    const [loadingPage, setLoadingPage] = useState(false);

    // selector
    const filterOptions = useSelector(selectFilterOption);

    //hook
    const dispatch = useDispatch();

    //yup
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(createCategorySchema),
        defaultValues: {
            categoryName: data?.name,
            description: data?.desc,
        },
    });

    const getModalTitle = (): string => {
        switch (variant) {
            case 'edit':
                return 'Edit Category';
            case 'delete':
                return 'Delete Category';
            default:
                return 'Add Category';
        }
    };

    const title = getModalTitle();
    // useEffec
    useEffect(() => {
        if (data) {
            setImage(data?.image);
            setParentId(data?.parent?.id);
        }
    }, [data]);

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

    const handleClose = () => {
        dispatch(common.actions.setHiddenModal(ModalType.CATEGORY));
    };

    const onSubmit = (e) => {
        if (image == null || image == '') {
            dispatch(common.actions.setErrorMessage('Image is required'));
            return;
        }
        let info: any = {
            id: 0,
            name: e.categoryName,
            image: image,
            desc: e.description,
            status: 'ACTIVE',
            parent: {
                id: parentId,
            },
        };
        if (variant == 'edit') {
            info = {
                ...info,
                id: data.id,
            };
            dispatch(updateCategory(info));
        } else {
            dispatch(createCategory(info));
        }
    };
    const handeDelete = () => {
        dispatch(deleteCategory(data));
    };

    return (
        <ModalBase type={type}>
            <div>
                <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
                {variant === 'delete' ? (
                    <div>
                        <p className="text-center text-red-600">
                            <>
                                Are you sure you want to delete the category <b>"{data.name}"</b>
                            </>
                        </p>
                        <div className="flex justify-end space-x-3 mt-6">
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button
                                type="primary"
                                danger
                                onClick={() => {
                                    handeDelete();
                                }}
                                loading={loadingPage}
                            >
                                Delete Category
                            </Button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
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
                        </div>
                        <FloatingInput
                            id="name"
                            label="Category name"
                            type="text"
                            {...register('categoryName')}
                            error={!!errors.categoryName}
                            helperText={errors.categoryName?.message}
                        />
                        <FloatingInput
                            id="description"
                            label="Description"
                            type="text"
                            {...register('description')}
                            defaultValue={data?.desc || ''}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                        <FloatingSelect
                            label="Parent Category"
                            id="parentId"
                            name="parentId"
                            value={parentId}
                            onChange={(e) => setParentId(e.target.value)}
                            options={[
                                { value: '', label: 'No Parent' },
                                ...filterOptions.category
                                    .filter(
                                        (cat) => !(variant === 'edit' && data && cat.id === data.id)
                                    )
                                    .map((cat) => ({
                                        value: cat.id.toString(),
                                        label: cat.name,
                                    })),
                            ]}
                            placeholder="Select parent category"
                        />
                        <div className="flex justify-end space-x-3 mt-6">
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isSubmitting}
                                className="bg-blue-500 hover:bg-blue-600"
                            >
                                {variant === 'update' ? 'Update Category' : 'Add Category'}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </ModalBase>
    );
};

export default ModalCategory;
