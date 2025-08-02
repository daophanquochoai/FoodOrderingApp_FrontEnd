import { Button, Table, Pagination, Tag, Space, Spin } from 'antd';
import {
    PlusOutlined,
    ExportOutlined,
    CheckCircleOutlined,
    EyeOutlined,
    CloseCircleOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';
import { common, voucher, voucher_admin } from '@/store/reducer';
import { ModalType } from '@/type/store/common';
import { useNavigate } from 'react-router-dom';
import { selectVoucher } from '@/store/selector/admin/voucher/voucher_admin.selector';
import { useEffect } from 'react';
import { fetchFirst } from '@/store/action/admin/voucher/voucher_admin.action';
import { Voucher } from '@/type/store/client/voucher/voucher.style';

const VoucherManagement = () => {
    // hook
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // selector
    const voucherList = useSelector(selectVoucher);

    // useEffect
    useEffect(() => {
        dispatch(fetchFirst());
    }, []);

    const handleOpenViewVoucherModal = (voucher: Voucher) => {
        dispatch(voucher_admin.actions.setSelectVoucher(voucher));
        dispatch(
            common.actions.showModal({
                type: ModalType.VOUCHER,
                variant: 'view',
                data: voucher,
            })
        );
    };

    const handleOpenAddVoucherModal = () => {
        dispatch(voucher_admin.actions.setSelectVoucher(null));
        dispatch(
            common.actions.showModal({
                type: ModalType.VOUCHER,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenEditVoucherModal = (voucher: Voucher) => {
        dispatch(voucher_admin.actions.setSelectVoucher(voucher));
        dispatch(
            common.actions.showModal({
                type: ModalType.VOUCHER,
                variant: 'edit',
                data: voucher,
            })
        );
    };

    const handleOpenDeleteVoucherModal = (voucher: Voucher) => {
        dispatch(voucher_admin.actions.setSelectVoucher(voucher));
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
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            render: (text) => <span className="font-semibold">{text}</span>,
        },
        {
            title: 'Discount',
            key: 'discount',
            render: (_, record) => {
                if (record.discountType.toString() === 'PERCENT') {
                    return (
                        <span>
                            {record?.discountValue}% (max ${record?.maxDiscount})
                        </span>
                    );
                } else {
                    return <span>${record?.discountValue}</span>;
                }
            },
        },
        {
            title: 'Usage',
            key: 'usage',
            render: (_, record) => (
                <span>
                    {record.usedCount}/{record?.maxUse}
                </span>
            ),
        },
        {
            title: 'Validity Period',
            key: 'validityPeriod',
            render: (_, record) => (
                <span>
                    {record?.startDate
                        ? new Date(record.startDate).toLocaleDateString('vi-VN')
                        : '__'}{' '}
                    -{' '}
                    {record?.endDate ? new Date(record.endDate).toLocaleDateString('vi-VN') : '__'}
                </span>
            ),
        },
        {
            title: 'Status',
            key: 'status',
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

                return record.status.toString() == 'ACTIVE' ? (
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
            render: (_, record) => {
                return (
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
                        {new Date(record.endDate) > new Date() &&
                            record.status.toString() == 'ACTIVE' && (
                                <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    size="small"
                                    onClick={() => handleOpenDeleteVoucherModal(record)}
                                />
                            )}
                    </Space>
                );
            },
        },
    ];

    return (
        <Spin spinning={voucherList.loading}>
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
                        dataSource={voucherList?.data || []}
                        rowKey="id"
                        scroll={{ x: 1000 }}
                        className="border-y border-gray-300"
                        pagination={false}
                    />
                    <Pagination current={1} total={voucherList.totalPage} pageSize={10} />
                </div>
            </div>
        </Spin>
    );
};

export default VoucherManagement;
