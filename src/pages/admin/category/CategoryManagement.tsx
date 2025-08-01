import { useEffect, useState } from 'react';
import { Button, Table, Space, Pagination } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';
import { selectModal } from '@/store/selector/common/common.selector';
import { common } from '@/store/reducer';
import { ModalType } from '@/type/store/common';
import {
    selectCategoryAdmin,
    selectLoadingTable,
} from '@/store/selector/admin/category/category.selector';
import { fetchCategoryFirst } from '@/store/action/admin/category/category.action';
import { selectFilterCategory } from '@/store/selector/client/collection/collection.selector';
import { Category } from '@/type/store/client/collection/collection.style';
import FilterBar from '@/components/filter/FilterBar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination as PaginationSwiper } from 'swiper/modules';
import { CategoryItem } from '@/components/category';
import CategoryItemCircle from '@/components/category/CategoryItemCircle';

const CategoryManagement = () => {
    // hook
    const dispatch = useDispatch();
    const modal = useSelector(selectModal);

    //selector
    const filter = useSelector(selectFilterCategory);
    const category = useSelector(selectCategoryAdmin);
    const loadingTable = useSelector(selectLoadingTable);

    const [filters, setFilters] = useState({});

    // useEffect
    useEffect(() => {
        dispatch(fetchCategoryFirst());
    }, []);

    const handleOpenAddCategoryModal = () => {
        dispatch(
            common.actions.showModal({
                type: ModalType.CATEGORY,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenEditCategoryModal = (category: Category) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.CATEGORY,
                variant: 'edit',
                data: category,
            })
        );
    };

    const handleOpenDeleteCategoryModal = (category: Category) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.CATEGORY,
                variant: 'delete',
                data: category,
            })
        );
    };

    const columns: ColumnsType<Category> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '60px',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: '100px',
            render: (image) => (
                <img
                    src={image}
                    alt="Category"
                    className="w-12 h-12 object-cover rounded-md"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/100x100/orange/white?text=No+Image';
                    }}
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, _) => (
                <div className="flex flex-col">
                    <span className="font-medium">{text}</span>
                </div>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
            ellipsis: true,
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '150px',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleOpenEditCategoryModal(record)}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                    />
                    {(record?.foods == null ||
                        record?.foods.length == 0 ||
                        record.parent == null) && (
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleOpenDeleteCategoryModal(record)}
                            size="small"
                        />
                    )}
                </Space>
            ),
        },
    ];

    const categoryFilterFields = [
        { key: 'name', type: 'text', placeholder: 'Tên danh mục' },
        { key: 'create_at', type: 'dateRange', placeholder: 'Ngày tạo' },
        {
            key: 'status',
            type: 'select',
            placeholder: 'Trạng thái',
            options: [
                { label: 'Hoạt động', value: 'active' },
                { label: 'Dừng hoạt động', value: 'inactive' },
            ],
        },
    ];

    const handleFilterChange = (key, value) => {
        setFilters((pre) => ({ ...pre, [key]: value }));
    };

    const handleResetFilter = () => {
        setFilters({});
    };

    const dataCategoryFake = [
        {
            id: 1,
            name: 'Combo Ăn Nhanh',
            image: 'https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg',
            desc: 'Combo tiết kiệm cho 1-2 người',
            create_date: '2024-09-01T10:00:00Z',
            late_update_time: '2024-09-10T15:30:00Z',
            status: 'active',
            parentId: null,
            create_by: 'admin',
        },
        {
            id: 2,
            name: 'Burger',
            image: 'https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg',
            desc: 'Các loại burger hấp dẫn',
            create_date: '2024-09-01T10:30:00Z',
            late_update_time: '2024-09-11T09:20:00Z',
            status: 'active',
            parentId: null,
            create_by: 'admin',
        },
        {
            id: 3,
            name: 'Gà Rán',
            image: 'https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg',
            desc: 'Gà rán giòn tan',
            create_date: '2024-09-02T11:00:00Z',
            late_update_time: '2024-09-11T10:00:00Z',
            status: 'active',
            parentId: null,
            create_by: 'admin',
        },
        {
            id: 4,
            name: 'Nước Uống',
            image: 'https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg',
            desc: 'Đa dạng các loại nước giải khát',
            create_date: '2024-09-03T08:00:00Z',
            late_update_time: '2024-09-12T12:00:00Z',
            status: 'active',
            parentId: null,
            create_by: 'admin',
        },
        {
            id: 5,
            name: 'Burger Bò',
            image: 'https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg',
            desc: 'Burger nhân bò đậm vị',
            create_date: '2024-09-05T14:00:00Z',
            late_update_time: '2024-09-15T09:00:00Z',
            status: 'active',
            parentId: 2,
            create_by: 'admin',
        },
        {
            id: 6,
            name: 'Burger Gà',
            image: 'https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg',
            desc: 'Burger nhân gà giòn',
            create_date: '2024-09-05T14:30:00Z',
            late_update_time: '2024-09-15T09:30:00Z',
            status: 'active',
            parentId: 2,
            create_by: 'admin',
        },
        {
            id: 7,
            name: 'Burger Gà',
            image: 'https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg',
            desc: 'Burger nhân gà giòn',
            create_date: '2024-09-05T14:30:00Z',
            late_update_time: '2024-09-15T09:30:00Z',
            status: 'active',
            parentId: 2,
            create_by: 'admin',
        },
        {
            id: 8,
            name: 'Burger Gà',
            image: 'https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg',
            desc: 'Burger nhân gà giòn',
            create_date: '2024-09-05T14:30:00Z',
            late_update_time: '2024-09-15T09:30:00Z',
            status: 'active',
            parentId: 2,
            create_by: 'admin',
        },
    ];

    return (
        <>
            <h1 className="text-2xl font-bold mb-3">Category Management</h1>

            {/* category images */}
            <div className="bg-white rounded-md border border-gray-200 py-3">
                <div className="container">
                    {/* Nút back nếu có category cha được chọn */}
                    <div className="flex items-center space-x-2 mb-4">
                        <button
                            onClick={() => {}}
                            className="flex items-center text-blue-600 hover:text-blue-800 transition"
                        >
                            <ArrowLeftOutlined className="mr-1" />
                            Back to parent categories
                        </button>
                        <span className="font-medium">Hamburger</span>
                    </div>
                    <div className="p-2 min-h-[140px]">
                        <Swiper
                            loop={true}
                            breakpoints={{
                                0: { slidesPerView: 2 },
                                560: { slidesPerView: 3 },
                                768: { slidesPerView: 4 },
                                992: { slidesPerView: 5 },
                                1200: { slidesPerView: 6 },
                                1300: { slidesPerView: 8 },
                            }}
                            freeMode={true}
                            pagination={{ clickable: true }}
                            spaceBetween={0}
                            modules={[FreeMode, PaginationSwiper]}
                            className="SlideCategory h-full"
                        >
                            {dataCategoryFake &&
                                dataCategoryFake.map((c) => (
                                    <SwiperSlide key={c.id} onClick={() => console.log(c)}>
                                        <CategoryItemCircle {...c} />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                </div>
            </div>

            {/* filter */}
            <div className="my-3">
                <FilterBar
                    fields={categoryFilterFields}
                    values={filters}
                    onChange={handleFilterChange}
                    onReset={handleResetFilter}
                    type={ModalType.CATEGORY}
                />
            </div>

            <div className="bg-white p-6 border border-gray-300 mt-4 rounded-lg shadow-sm space-y-4">
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => handleOpenAddCategoryModal()}
                    className="bg-blue-500 hover:bg-blue-600"
                >
                    Add New Category
                </Button>
                <Table
                    loading={loadingTable}
                    columns={columns}
                    dataSource={category?.data}
                    rowKey="id"
                    scroll={{ x: 1000 }}
                    className="border-y border-gray-300"
                    pagination={false}
                />
                <Pagination
                    current={category?.page + 1 || 0}
                    pageSize={10}
                    total={category?.totalPage * 10 || 1}
                />
            </div>
        </>
    );
};

export default CategoryManagement;
