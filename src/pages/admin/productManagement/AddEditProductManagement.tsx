import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { Button, Col, Input, Row, Space, Table } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductSchema } from '@/validation/food.validation';
import { Food } from '@/type';
import FormFloatingInput from '@/components/form/FormFloatingInput';
import { FormImageUpload } from '@/components/form';
import FormFoodSize from '@/components/form/FormSizeProduct';

const sizeFromDB = [
    { id: 1, name: 'S' },
    { id: 2, name: 'M' },
    { id: 3, name: 'L' },
];

const AddEditProductManagement = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // id exists => editing
    const isEdit = Boolean(id);
    const [foodData, setFoodData] = useState(null); // Loaded data if edit
    const [newSizeName, setNewSizeName] = useState('');
    const [allSizes, setAllSizes] = useState<any[]>([]);
    const [foodSizes, setFoodSizes] = useState([]);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(ProductSchema),
    });

    useEffect(() => {
        if (isEdit) {
            const data = {
                id: 1,
                name: 'Hamburger Bò',
                desc: 'Bánh hamburger bò nướng với rau xà lách, cà chua và sốt đặc biệt.',
                image: 'https://img.freepik.com/premium-photo/humber-barger_1019272-1536.jpg',
                status: true,
                create_date: '2024-09-01T08:00:00Z',
                last_update_time: '2024-09-10T10:30:00Z',
                food_code: 'HB001',
                category_id: 1, // Đồ ăn nhanh
                sizes: [
                    { id: 1, size: 'S', price: 25000 },
                    { id: 2, size: 'M', price: 32000 },
                ],
                rate: 4.5,
            };

            setFoodData(data);

            setFoodSizes(data.sizes);
        }

        setAllSizes(sizeFromDB);
    }, [id]);

    // Khi edit thì reset theo dữ liệu
    useEffect(() => {
        if (isEdit && foodData) {
            reset({
                name: foodData.name,
                desc: foodData.desc,
                image: foodData.image,
                sizes: foodData.sizes,
            });
        }
    }, [isEdit, foodData]);

    // Khi tạo mới thì reset rỗng ngay từ đầu
    useEffect(() => {
        if (!isEdit) {
            reset({
                name: '',
                desc: '',
                image: '',
                sizes: [],
            });
        }
    }, []);

    const onSubmit = (data: any) => {
        data.sizes = foodSizes;

        console.log('New values:', {
            ...data,
        });
    };

    const handleCreateNewSize = () => {
        if (!newSizeName.trim()) return;

        // check and save...
        if (sizeFromDB.find((s) => s.name.toLowerCase() == newSizeName.toLowerCase())) {
            console.log('Size existed!!');
            return;
        }

        const newSize = {
            id: Date.now(),
            name: newSizeName.trim(),
        };

        setAllSizes([...allSizes, newSize]);
        setNewSizeName('');
    };

    return (
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
                                {isEdit ? (
                                    <>
                                        Update <b>"{foodData?.name}"</b>
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
                                    defaultImage={foodData?.image} // only if isEdit
                                />

                                <FormFoodSize
                                    isEdit={isEdit}
                                    name="sizes"
                                    control={control}
                                    allSizes={allSizes}
                                    foodSizes={foodSizes}
                                    setFoodSizes={setFoodSizes}
                                />

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                                    <Button
                                        onClick={handleSubmit(onSubmit)}
                                        type="primary"
                                        className="bg-blue-500 hover:bg-blue-600"
                                        disabled={isSubmitting}
                                        block
                                    >
                                        {isEdit ? 'Update Food' : 'Create New Food'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Col>
                    <Col span={8} className="">
                        <div className="bg-white rounded-md p-4">
                            <h2 className="text-lg font-semibold mb-4">Danh sách Size hiện có</h2>

                            <Table
                                size="small"
                                columns={[
                                    { title: 'ID', dataIndex: 'id', key: 'id' },
                                    { title: 'Tên Size', dataIndex: 'name', key: 'name' },
                                ]}
                                dataSource={allSizes.map((s) => ({ ...s, key: s.id }))}
                                pagination={false}
                            />

                            <Space className="mt-4" direction="vertical" style={{ width: '100%' }}>
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
    );
};

export default AddEditProductManagement;
