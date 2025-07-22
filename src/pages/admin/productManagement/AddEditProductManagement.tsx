import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { Button, Col, Input, Popconfirm, Row, Space, Table, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductSchema } from '@/validation/food.validation';
import FormFloatingInput from '@/components/form/FormFloatingInput';
import { FormImageUpload } from '@/components/form';
import FormFoodSize from '@/components/form/FormSizeProduct';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectFitlerOption,
    selectFoodSelected,
    selectLoadingComponent,
} from '@/store/selector/admin/food/food_manager.selector';
import { common } from '@/store/reducer';
import { addSize, updateFood } from '@/store/action/admin/food/food_manager.action';
import FormSelectAnt from '@/components/form/FormSelectAnt';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';

const sizeFromDB = [
    { id: 1, name: 'S' },
    { id: 2, name: 'M' },
    { id: 3, name: 'L' },
];

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

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(ProductSchema),
        defaultValues: {
            name: selectedFood?.name,
            image: selectedFood?.image || '',
            status: selectedFood?.status + '' || 'true',
            desc: selectedFood?.desc,
        },
    });

    // Khi edit thì reset theo dữ liệu
    useEffect(() => {
        if (selectedFood) {
            reset({
                name: selectedFood?.name,
                desc: selectedFood?.desc,
                image: selectedFood?.image,
                sizes: selectedFood?.foodSizes,
            });
        }
    }, [selectedFood]);

    // event handling
    const onSubmit = (data: any) => {
        console.log('New values:', {
            ...data,
        });
        dispatch(
            updateFood({
                id: selectedFood?.id,
                data: data,
            })
        );
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
    };

    const optionsStatus = [
        { value: true, label: 'Active' },
        { value: false, label: 'Inactive' },
    ]

    const handleDeleteSize = (record) => {
        console.log(record);
    }

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

                                    <FormImageUpload
                                        name="image"
                                        control={control}
                                        defaultImage={selectedFood?.image} // only if isEdit
                                    />

                                    <FormFoodSize name="sizes" />

                                    <div className='w-[22%]'>
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
                            <div className="bg-white rounded-md p-4">
                                <h2 className="text-lg font-semibold mb-4">
                                    Danh sách Size hiện có
                                </h2>

                                <Table
                                    size="small"
                                    columns={[
                                        { title: 'ID', dataIndex: 'id', key: 'id' },
                                        { title: 'Tên Size', dataIndex: 'name', key: 'name' },
                                    ]}
                                    dataSource={filterOption?.size.map((s) => ({
                                        ...s,
                                        key: s?.name,
                                    }))}
                                    pagination={false}
                                />

                                <Space
                                    className="mt-4"
                                    direction="vertical"
                                    style={{ width: '100%' }}
                                >
                                    <Input
                                        placeholder="Tên size mới"
                                        value={newSizeName}
                                        onChange={(e) => setNewSizeName(e.target.value)}
                                    />
                                    <Button onClick={handleCreateNewSize} block>
                                        Thêm size mới
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
