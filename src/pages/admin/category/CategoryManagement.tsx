import { useEffect, useState } from 'react';
import { Button, Table, Space, Pagination } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';
import { selectModal } from '@/store/selector/common/common.selector';
import { common, category as categoryReducer } from '@/store/reducer';
import { ModalType } from '@/type/store/common';
import {
    selectCategoryAdmin,
    selectFilter,
    selectLoadingTable,
} from '@/store/selector/admin/category/category.selector';
import { fetchCategoryFirst } from '@/store/action/admin/category/category.action';
import { Category, EStatusCategory } from '@/type/store/client/collection/collection.style';
import FilterBar from '@/components/filter/FilterBar';
import { filterCategory } from '@/defaultValue/client/collection/collection';

const CategoryManagement = () => {
    // hook
    const dispatch = useDispatch();
    const modal = useSelector(selectModal);

    //selector
    const filter = useSelector(selectFilter);
    const category = useSelector(selectCategoryAdmin);
    const loadingTable = useSelector(selectLoadingTable);

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

    const options = Object.keys(EStatusCategory)
        .filter((key) => isNaN(Number(key)))
        .map((key) => ({
        label: key,
        value: EStatusCategory[key as keyof typeof EStatusCategory],
    }));

    const categoryFilterFields = [
        { key: 'search', type: 'text', placeholder: 'Search' },
        { key: 'startDate', type: 'date', placeholder: 'Created time' },
        {
            key: 'statusCategories',
            type: 'multiSelect',
            placeholder: 'Status',
            options: options
        },
    ];

    const handleFilterChange = (key, value) => {
        // console.log(key, value);
        dispatch(
            categoryReducer.actions.setFilter({
                ...filter,
                [key]: value
            })
        );
    };

    const handleApplyFilter = (filterValues) => {
        // console.log(filterValues);
        dispatch(fetchCategoryFirst());
    };


    const handleResetFilter = () => {
        dispatch(
            categoryReducer.actions.setFilter(filterCategory)
        );
        dispatch(fetchCategoryFirst());
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-3">Category Management</h1>

            {/* filter */}
            <div className="my-3">
                <FilterBar
                    fields={categoryFilterFields}
                    values={filter}
                    onChange={handleFilterChange}
                    onReset={handleResetFilter}
                    onApply={handleApplyFilter}
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
