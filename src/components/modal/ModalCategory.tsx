import React, { useState, useEffect } from 'react';
import ModalBase from './ModalBase';
import { Category } from '@/type';
import { Button, GetProp, Upload, UploadProps } from 'antd';
import { FloatingSelect } from '../input';
import { useDispatch } from 'react-redux';
import { common } from '@/store/reducer';
import { ModalType } from '@/type/store/common';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const ModalCategory: React.FC<any> = (props) => {
    // state
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('');

    // selector

    const { data, type, variant } = props;
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

    const categoryList: Category[] = [
        {
            id: 1,
            name: 'Chicken',
            image: 'https://grillfood-demo.myshopify.com/cdn/shop/files/13_474a9d6a-8185-41aa-9876-efe49e338886.jpg?v=1746869562&width=416',
            desc: 'Delicious chicken dishes',
            create_date: '2025-01-01',
            late_update_time: '2025-01-01',
            status: true,
            parentId: null,
            create_by: 1,
        },
        {
            id: 2,
            name: 'Spicy Chicken',
            image: 'https://grillfood-demo.myshopify.com/cdn/shop/files/4_f05eb882-424b-41e4-958c-fff1757c2958.jpg?v=1746869562&width=416',
            desc: 'Spicy chicken dishes',
            create_date: '2025-01-02',
            late_update_time: '2025-01-02',
            status: true,
            parentId: 1,
            create_by: 1,
        },
    ];

    const dispatch = useDispatch();

    const title = getModalTitle();

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        desc: '',
        parentId: null as number | null,
    });

    const [errors, setErrors] = useState({
        name: '',
        image: '',
        desc: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (variant === 'edit' && data) {
            setFormData({
                name: data.name,
                image: data.image,
                desc: data.desc,
                parentId: data.parentId,
            });
        } else {
            setFormData({
                name: '',
                image: '',
                desc: '',
                parentId: null,
            });
        }
        setErrors({
            name: '',
            image: '',
            desc: '',
        });
    }, [data]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (name in errors) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value ? parseInt(value) : null,
        }));
        if (name in errors) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!formData.name.trim()) {
            newErrors.name = 'Category name is required.';
            isValid = false;
        }

        if (!formData.image.trim()) {
            newErrors.image = 'Image URL is required.';
            isValid = false;
        }

        if (!formData.desc.trim()) {
            newErrors.desc = 'Description is required.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const onClose = () => {
        dispatch(common.actions.setHiddenModal({ type: ModalType.CATEGORY }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Ensure id is at most 3 digits
            let generatedId = data ? data.id : Date.now() % 1000;
            if (generatedId > 999) generatedId = 999;

            const categoryData: Category = {
                id: generatedId,
                name: formData.name,
                image: formData.image,
                desc: formData.desc,
                parentId: formData.parentId,
                create_date: new Date().toISOString(),
                late_update_time: new Date().toISOString(),
                status: true,
                create_by: 1, // Assuming current user ID is 1
            };
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            <Button onClick={onClose}>Cancel</Button>
                            <Button
                                type="primary"
                                danger
                                onClick={() => {
                                    onClose();
                                }}
                                loading={isSubmitting}
                            >
                                Delete Category
                            </Button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleInputChange}
                                placeholder="Category Name"
                                className={`peer inputBox px-5 py-2 pt-5 pb-1`}
                            />
                            <label
                                htmlFor="name"
                                className={`absolute left-5 top-1 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`}
                            >
                                Category Name
                            </label>
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                            )}
                        </div>
                        <div className="relative">
                            <textarea
                                id="desc"
                                name="desc"
                                value={formData.desc || ''}
                                onChange={handleInputChange}
                                placeholder="Description"
                                className={`peer inputBox px-5 py-2 pt-5 pb-1`}
                            />
                            <label
                                htmlFor="desc"
                                className={`absolute left-5 top-1 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`}
                            >
                                Description
                            </label>
                            {errors.desc && (
                                <p className="mt-1 text-xs text-red-500">{errors.desc}</p>
                            )}
                        </div>
                        <FloatingSelect
                            label="Parent Category"
                            id="parentId"
                            name="parentId"
                            value={formData.parentId?.toString() || ''}
                            onChange={handleSelectChange}
                            options={[
                                { value: '', label: 'No Parent' },
                                ...categoryList
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
                            <Button onClick={onClose}>Cancel</Button>
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
