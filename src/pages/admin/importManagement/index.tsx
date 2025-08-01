import { common } from '@/store/reducer';
import { ModalType } from '@/type/store/common';
import { Button, Space, Table, TableColumnsType } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

const ingredientBatches = [
    {
        batch_code: 'BATCH-20250801-001',
        type: 'import',
        note: 'Lô hàng đầu tháng 8',
        is_active: true,
        source: {
            id: 1,
            name: 'Công ty TNHH Nguyên Liệu Xanh',
            address: '123 Đường Lê Lợi, Q1, TP.HCM',
            phoneNumber: '0909123456',
            email: 'contact@nguyenlieuxanh.vn',
            link: 'https://nguyenlieuxanh.vn',
            taxCode: '0301234567',
        },
        ingredients: [
            {
                id: 1,
                name: 'Thịt bò',
                unit: 'kg',
                quantity: 50,
                used_unit: 'kg',
                price_per_unit: 180000,
                avg_price: 180000,
                expired_time: '2025-08-20',
            },
            {
                id: 2,
                name: 'Rau xà lách',
                unit: 'kg',
                quantity: 20,
                used_unit: 'kg',
                price_per_unit: 40000,
                avg_price: 40000,
                expired_time: '2025-08-05',
            },
        ],
        create_at: '2025-08-01T09:30:00',
    },
    {
        batch_code: 'BATCH-20250801-002',
        type: 'import',
        note: 'Nguyên liệu khô nhập từ miền Tây',
        is_active: true,
        source: {
            id: 2,
            name: 'Hợp tác xã Nông sản Miền Tây',
            address: 'Ấp 3, huyện Chợ Lách, Bến Tre',
            phoneNumber: '0911123456',
            email: 'htx@nongsanmientay.vn',
            link: 'https://nongsanmientay.vn',
            taxCode: '1400234567',
        },
        ingredients: [
            {
                id: 3,
                name: 'Bột mì',
                unit: 'kg',
                quantity: 100,
                used_unit: 'kg',
                price_per_unit: 12000,
                avg_price: 12000,
                expired_time: '2026-01-01',
            },
            {
                id: 4,
                name: 'Đường trắng',
                unit: 'kg',
                quantity: 30,
                used_unit: 'kg',
                price_per_unit: 18000,
                avg_price: 18000,
                expired_time: '2026-02-15',
            },
        ],
        create_at: '2025-08-01T10:00:00',
    },
];

const ImportManagement = () => {
    const dispatch = useDispatch();

    const columns: TableColumnsType<any> = [
        {
            title: 'Batch Code',
            dataIndex: 'batch_code',
            key: 'batch_code',
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
            render: (note) => (
                <p
                    className="max-w-[250px]"
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {note}
                </p>
            ),
        },
        {
            title: 'Supplier Name',
            dataIndex: 'source',
            key: 'source',
            render: (source) => <p>{source.name}</p>,
        },
        {
            title: 'Quantity of ingredients',
            dataIndex: 'ingredients',
            key: 'ingredients',
            align: 'center',
            render: (ingredients) => <p>{ingredients.length}</p>,
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '150px',
            align: 'center',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        color="primary"
                        variant="filled"
                        icon={<EyeOutlined />}
                        onClick={() => handleOpenViewImportModal(record)}
                        className=""
                        size="small"
                    />
                    {record?.is_active && (
                        <>
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => handleOpenEditImportModal(record)}
                                className="bg-blue-500 hover:bg-blue-600"
                                size="small"
                            />
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleOpenDeleteImportModal(record)}
                                size="small"
                            />
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const handleOpenViewImportModal = (data) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.IMPORT_MANAGEMENT,
                variant: 'view',
                data: data,
            })
        );
    };

    const handleOpenAddImportModal = () => {
        dispatch(
            common.actions.showModal({
                type: ModalType.IMPORT_MANAGEMENT,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenEditImportModal = (data) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.IMPORT_MANAGEMENT,
                variant: 'edit',
                data: data,
            })
        );
    };

    const handleOpenDeleteImportModal = (data) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.IMPORT_MANAGEMENT,
                variant: 'delete',
                data: data,
            })
        );
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-3">Ingredients Import Management</h1>
            <div className="bg-white p-6 border border-gray-300 mt-4 rounded-lg shadow-sm space-y-4">
                <Button type="primary" onClick={handleOpenAddImportModal}>
                    + New Import
                </Button>

                <Table
                    columns={columns}
                    dataSource={ingredientBatches}
                    rowKey="key"
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                />
            </div>
        </div>
    );
};

export default ImportManagement;
