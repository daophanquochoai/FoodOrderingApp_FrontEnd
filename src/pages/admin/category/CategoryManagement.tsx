import { useEffect } from 'react';
import { Button, Table, Space, Pagination } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
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

const CategoryManagement = () => {
    // hook
    const dispatch = useDispatch();
    const modal = useSelector(selectModal);

    //selector
    const filter = useSelector(selectFilterCategory);
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

    return (
        <>
            <h1 className="text-2xl font-bold">Category Management</h1>
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
