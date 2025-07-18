import { useState } from "react";
import { useModalContext } from "@/hooks/context/ModalContext";
import { Category } from "@/type";
import { Button, Table, Space, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from 'react-redux';
import { selectModal } from '@/store/selector/common/common.selector';
import { common } from "@/store/reducer";
import { ModalType } from "@/type/store/common";

const CategoryManagement = () => {
    const [categoryList, setCategoryList] = useState<Category[]>([
        {
            id: 1,
            name: "Chicken",
            image: "https://grillfood-demo.myshopify.com/cdn/shop/files/13_474a9d6a-8185-41aa-9876-efe49e338886.jpg?v=1746869562&width=416",
            desc: "Delicious chicken dishes",
            create_date: "2025-01-01",
            late_update_time: "2025-01-01",
            status: true,
            parentId: null,
            create_by: 1
        },
        {
            id: 2,
            name: "Spicy Chicken",
            image: "https://grillfood-demo.myshopify.com/cdn/shop/files/4_f05eb882-424b-41e4-958c-fff1757c2958.jpg?v=1746869562&width=416",
            desc: "Spicy chicken dishes",
            create_date: "2025-01-02",
            late_update_time: "2025-01-02",
            status: true,
            parentId: 1,
            create_by: 1
        }
    ]);
    
    const dispatch = useDispatch();

    const modal = useSelector(selectModal); 

    const handleOpenAddCategoryModal = () => {
        dispatch(
            common.actions.showModal({
                type: ModalType.CATEGORY,
                variant: "add",
                data: null
            })
        );
    };

    const handleOpenEditCategoryModal = (category: Category) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.CATEGORY,
                variant: "edit",
                data: category
            })
        );
    };

    const handleOpenDeleteCategoryModal = (category: Category) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.CATEGORY,
                variant: "delete",
                data: category
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
            render: (text, record) => (
                <div className="flex flex-col">
                    <span className="font-medium">{text}</span>
                    {record.parentId && (
                        <Tag color="blue" className="mt-2 w-fit">Child</Tag>
                    )}
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
            title: 'Parent Category',
            key: 'parentId',
            render: (_, record) => {
                if (!record.parentId) return <span className="text-gray-500">-</span>;
                const parentCategory = categoryList.find(cat => cat.id === record.parentId);
                return parentCategory ? parentCategory.name : <span className="text-gray-500">Unknown</span>;
            }
        },
        {
            title: 'Last Updated',
            dataIndex: 'late_update_time',
            key: 'late_update_time',
            render: (date) => new Date(date).toLocaleDateString(),
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
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleOpenDeleteCategoryModal(record)}
                        size="small"
                    />
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
                    columns={columns} 
                    dataSource={categoryList} 
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50'],
                    }}
                    scroll={{ x: 1000 }}
                    className="border-y border-gray-300"
                />
            </div>
        </>
    );
};

export default CategoryManagement;