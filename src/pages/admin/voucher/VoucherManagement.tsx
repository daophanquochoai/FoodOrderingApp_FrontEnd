import { Button, Table, Pagination, Tag, Space } from "antd";
import { PlusOutlined, ExportOutlined, CheckCircleOutlined, EyeOutlined, CloseCircleOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Voucher } from "../../../type";
import type { ColumnsType } from 'antd/es/table';
import { useDispatch } from 'react-redux';
import { common } from '@/store/reducer';
import { ModalType } from '@/type/store/common';
import { useNavigate } from "react-router-dom";

const voucherList: Voucher[] = [
    {
        id: "1",
        code: "BESTBURGER",
        description: "10% off for your first burger order!",
        type: "percentage",
        value: 10,
        maxDiscount: 4,
        maxUsage: 100,
        usedCount: 50,
        startDate: "2024-01-01",
        endDate: "2025-12-31",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
    },
    {
        id: "2",
        code: "WELCOME",
        description: "Welcome voucher for new users.",
        type: "fixed",
        value: 2,
        maxDiscount: 2,
        maxUsage: 100,
        usedCount: 90,
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
    },
    {
        id: "3",
        code: "COMBOFAMILY",
        description: "10% off on family combo orders!",
        type: "percentage",
        value: 10,
        maxDiscount: 10,
        maxUsage: 50,
        usedCount: 20,
        startDate: "2024-01-01",
        endDate: "2025-12-31",
        isActive: false,
        createdAt: "2024-01-01T00:00:00Z",
    }
];

const VoucherManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpenViewVoucherModal = (voucher: Voucher) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.VOUCHER,
                variant: 'view',
                data: voucher,
            })
        );
    };

    const handleOpenAddVoucherModal = () => {
        dispatch(
            common.actions.showModal({
                type: ModalType.VOUCHER,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenEditVoucherModal = (voucher: Voucher) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.VOUCHER,
                variant: 'edit',
                data: voucher,
            })
        );
    };

    const handleOpenDeleteVoucherModal = (voucher: Voucher) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.VOUCHER,
                variant: 'delete',
                data: voucher,
            })
        );
    };

    const columns: ColumnsType<Voucher> = [
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
            render: (text) => <span className="font-semibold">{text}</span>,
        },
        {
            title: "Discount",
            key: "discount",
            render: (_, record) => {
                if (record.type === "percentage") {
                    return <span>{record.value}% (max ${record.maxDiscount})</span>;
                } else {
                    return <span>${record.value}</span>;
                }
            },
        },
        {
            title: "Usage",
            key: "usage",
            render: (_, record) => (
                <span>{record.usedCount}/{record.maxUsage}</span>
            ),
        },
        {
            title: "Validity Period",
            key: "validityPeriod",
            render: (_, record) => (
                <span>
                    {new Date(record.startDate).toLocaleDateString()} - {new Date(record.endDate).toLocaleDateString()}
                </span>
            ),
        },
        {
            title: "Status",
            key: "status",
            render: (_, record) => {
                const currentDate = new Date();
                const endDate = new Date(record.endDate);
                
                if (currentDate > endDate) {
                    return (
                        <Tag icon={<CloseCircleOutlined />} color="default">
                            Expired
                        </Tag>
                    );
                }
                
                return record.isActive ? (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                        Active
                    </Tag>
                ) : (
                    <Tag icon={<CloseCircleOutlined />} color="error">
                        Inactive
                    </Tag>
                );
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '150px',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        color="primary"
                        variant="filled"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => handleOpenViewVoucherModal(record)}
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                        onClick={() => handleOpenEditVoucherModal(record)}
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => handleOpenDeleteVoucherModal(record)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold">Voucher Management</h1>
            <div className="bg-white p-6 border border-gray-300 mt-4 rounded-lg shadow-sm space-y-4">
                <div className="space-x-4">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="bg-blue-500 hover:bg-blue-600 mb-4"
                        onClick={handleOpenAddVoucherModal}
                    >
                        Add New Voucher
                    </Button>
                    <Button
                        type="primary"
                        className="bg-blue-500 mb-4"
                        icon={<ExportOutlined />}
                        onClick={() => navigate('/admin/voucher-management/export')}
                    >
                        Export Vouchers
                    </Button>
                </div>
                <Table 
                    columns={columns}
                    dataSource={voucherList}
                    rowKey="id"
                    scroll={{ x: 1000 }}
                    className="border-y border-gray-300"
                    pagination={false}
                />
                <Pagination
                    current={1}
                    total={voucherList.length}
                    pageSize={10}
                />
            </div>
        </div>
    );
};

export default VoucherManagement;