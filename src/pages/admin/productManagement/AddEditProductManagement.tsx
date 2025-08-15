import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';

import {
    Button,
    Col,
    GetProp,
    Input,
    Popconfirm,
    Row,
    Space,
    Spin,
    Table,
    Upload,
    UploadProps,
} from 'antd';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductSchema } from '@/validation/food.validation';
import FormFloatingInput from '@/components/form/FormFloatingInput';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import FormFoodSize from '@/components/form/FormSizeProduct';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectFitlerOption,
    selectFoodSelected,
    selectLoadingComponent,
} from '@/store/selector/admin/food/food_manager.selector';
import { common } from '@/store/reducer';
import {
    addFood,
    addSize,
    updateFood,
    updateSize,
} from '@/store/action/admin/food/food_manager.action';
import FormSelectAnt from '@/components/form/FormSelectAnt';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const AddEditProductManagement = () => {
    // hook
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //select
    const selectedFood = useSelector(selectFoodSelected);
    const filterOption = useSelector(selectFitlerOption);
    const loadingComponent = useSelector(selectLoadingComponent);

    //state
    const [newSizeName, setNewSizeName] = useState('');
    const [image, setImage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(ProductSchema),
        defaultValues: {
            name: selectedFood?.name,
            status: 'ACTIVE',
            desc: selectedFood?.desc,
        },
    });
    useEffect(() => {
        if (errors.desc || errors?.name || errors?.status) {
            dispatch(common.actions.setErrorMessage('Please fill in all feild'));
        }
    }, [errors]);

    // Khi edit thì reset theo dữ liệu
    useEffect(() => {
        if (selectedFood) {
            reset({
                name: selectedFood?.name,
                desc: selectedFood?.desc,
                sizes: selectedFood?.foodSizes,
            });
            setImage(selectedFood?.image);
        }
    }, [selectedFood]);

    // event handling
    const onSubmit = (data: any) => {
        if (selectedFood) {
            dispatch(
                updateFood({
                    id: selectedFood?.id,
                    data: {
                        ...data,
                        image: image,
                    },
                })
            );
        } else {
            dispatch(
                addFood({
                    data: {
                        ...data,
                        image: image,
                        id: 0,
                    },
                    navigate: () => navigate('/admin/product-management'),
                })
            );
        }
    };

    const handleCreateNewSize = () => {
        if (!newSizeName.trim()) {
            dispatch(common.actions.setErrorMessage('Name Size is required'));
            return;
        }
        const newSize = {
            name: newSizeName.trim(),
        };
        dispatch(addSize(newSize));
        setNewSizeName('');
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

    const optionsStatus = [
        { value: 'ACTIVE', label: 'Active' },
        { value: 'OUT_STOCK', label: 'Out Of Stock' },
    ];

    const handleDeleteSize = (record) => {
        dispatch(
            updateSize({
                ...record,
                isActive: false,
            })
        );
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

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
    return (
        <Spin spinning={loadingComponent}>
            <div className="relative">
                <div className="absolute top-0 left-0">
                    <button
                        onClick={() => navigate(`/admin/product-management`)}
                        className="flex items-center justify-center gap-1 px-3 py-2 bg-white hover:bg-gray-50 rounded shadow"
                    >
                        <IoMdArrowBack /> Back
                    </button>
                </div>

                <div className="pt-12">
                    <Row gutter={[10, 10]}>
                        <Col span={16} className="">
                            <div className="bg-white rounded-md p-4">
                                <h2 className="text-lg font-semibold mb-4 text-center">
                                    {selectedFood ? (
                                        <>
                                            Update <b>"{selectedFood?.name}"</b>
                                        </>
                                    ) : (
                                        <>Create A Food</>
                                    )}
                                </h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                    {/* Form Grid */}

                                    <FormFloatingInput
                                        name="name"
                                        control={control}
                                        label="Name"
                                        placeholder="Enter food name"
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />

                                    <FormFloatingInput
                                        name="desc"
                                        control={control}
                                        label="Description"
                                        placeholder="Enter description"
                                        type="textarea"
                                        error={!!errors.desc}
                                        helperText={errors.desc?.message}
                                    />

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
                                            <img
                                                src={image}
                                                alt="avatar"
                                                style={{ width: '100%' }}
                                            />
                                        ) : (
                                            uploadButton
                                        )}
                                    </Upload>

                                    {selectedFood && <FormFoodSize name="sizes" />}

                                    <div className="w-[22%]">
                                        <FormSelectAnt
                                            name="status"
                                            control={control}
                                            label="Status"
                                            options={optionsStatus}
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                                        <Button
                                            onClick={handleSubmit(onSubmit)}
                                            type="primary"
                                            className="bg-blue-500 hover:bg-blue-600"
                                            disabled={isSubmitting}
                                            block
                                        >
                                            {selectedFood ? 'Update Food' : 'Create New Food'}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Col>
                        <Col span={8} className="">
                            <div className="bg-white rounded-md p-4 max-h-[calc(100vh-154px)] flex flex-col">
                                <h2 className="text-lg font-semibold mb-4">
                                    List of Available Sizes
                                </h2>

                                <Table
                                    size="small"
                                    className="flex-1 overflow-hidden"
                                    columns={[
                                        { title: 'ID', dataIndex: 'id', key: 'id' },
                                        {
                                            title: 'Size name',
                                            dataIndex: 'name',
                                            key: 'name',
                                            align: 'center',
                                        },
                                        {
                                            title: 'Actions',
                                            key: 'actions',
                                            align: 'center',
                                            render: (_, record) => (
                                                <Space size="small">
                                                    <Popconfirm
                                                        title={`Remove size ${record.name} ?`}
                                                        onConfirm={() => handleDeleteSize(record)}
                                                    >
                                                        <Button danger size="small">
                                                            Delete
                                                        </Button>
                                                    </Popconfirm>
                                                </Space>
                                            ),
                                        },
                                    ]}
                                    dataSource={filterOption?.size
                                        ?.filter((i) => i.isActive)
                                        .map((s) => ({
                                            ...s,
                                            key: s?.name,
                                        }))}
                                    pagination={false}
                                    scroll={{ y: 'calc(100vh - 320px)' }}
                                />

                                <Space
                                    className="mt-4"
                                    direction="vertical"
                                    style={{ width: '100%' }}
                                >
                                    <Input
                                        placeholder="New size name"
                                        value={newSizeName}
                                        onChange={(e) => setNewSizeName(e.target.value)}
                                    />
                                    <Button onClick={handleCreateNewSize} block>
                                        Add new size
                                    </Button>
                                </Space>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Spin>
    );
};

export default AddEditProductManagement;
