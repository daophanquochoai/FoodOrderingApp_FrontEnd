import { common, history_import } from '@/store/reducer';
import { ModalType } from '@/type/store/common';
import { Button, Pagination, Space, Table, TableColumnsType, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import FilterBar from '@/components/filter/FilterBar';
import dayjs from 'dayjs';
import { selectFilter, selectHistory } from '@/store/selector/admin/history/history.selector';
import { fetchFirst } from '@/store/action/admin/history/history.action';
import { HistoryImportAdmin } from '@/type/store/admin/history/history.style';
import { filterHistoryIngredient } from '@/defaultValue/admin/ingredients/ingredients';

const ImportManagement = () => {
    // hook
    const dispatch = useDispatch();

    //selector
    const historyList = useSelector(selectHistory);
    const filter = useSelector(selectFilter);

    //useEffect
    useEffect(() => {
        dispatch(fetchFirst());
    }, []);

    const [filters, setFilters] = useState({});

    const columns: TableColumnsType<HistoryImportAdmin> = [
        {
            title: 'Batch Code',
            dataIndex: 'bathCode',
            key: 'bathCode',
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
            key: 'source',
            render: (source) => <p>{source?.source?.name}</p>,
        },
        {
            title: 'Quantity of ingredients',
            key: 'ingredients',
            align: 'center',
            sorter: (a, b) => a?.historyIngredients?.length - b?.historyIngredients?.length,
            render: (ingredients) => <p>{ingredients?.historyIngredients?.length}</p>,
        },
        {
            title: 'Import date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (importDate) => <p>{dayjs(importDate).format('DD/MM/YYYY')}</p>,
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            filters: [
                { text: 'Active', value: true },
                { text: 'Inactive', value: false },
            ],
            onFilter: (value, record) => record?.isActive === value,
            render: (status) => {
                if (status == true) {
                    return (
                        <>
                            <Tag icon={<CheckCircleOutlined />} color="success">
                                Active
                            </Tag>
                        </>
                    );
                } else {
                    return (
                        <>
                            <Tag icon={<CloseCircleOutlined />} color="error">
                                Inactive
                            </Tag>
                        </>
                    );
                }
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '150px',
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
                    {record?.isActive && (
                        <>
                            {/* <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => handleOpenEditImportModal(record)}
                                className="bg-blue-500 hover:bg-blue-600"
                                size="small"
                            /> */}
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
        dispatch(history_import.actions.setSelectHistory(data));
        dispatch(
            common.actions.showModal({
                type: ModalType.IMPORT_MANAGEMENT,
                variant: 'view',
                data: data,
            })
        );
    };

    const handleOpenAddImportModal = () => {
        dispatch(history_import.actions.setSelectHistory(null));
        dispatch(
            common.actions.showModal({
                type: ModalType.IMPORT_MANAGEMENT,
                variant: 'add',
                data: null,
            })
        );
    };

    // const handleOpenEditImportModal = (data) => {
    //     dispatch(
    //         common.actions.showModal({
    //             type: ModalType.IMPORT_MANAGEMENT,
    //             variant: 'edit',
    //             data: data,
    //         })
    //     );
    // };

    const handleOpenDeleteImportModal = (data) => {
        dispatch(history_import.actions.setSelectHistory(data));
        dispatch(
            common.actions.showModal({
                type: ModalType.IMPORT_MANAGEMENT,
                variant: 'delete',
                data: data,
            })
        );
    };

    const importFilterFields = [
        { key: 'search', type: 'text', placeholder: 'Batch code' },
        { key: 'startDate', type: 'date', placeholder: 'Import date' },
        { key: 'minPrice', type: 'number', placeholder: 'Min price' },
        { key: 'maxPrice', type: 'number', placeholder: 'Max price' },
        {
            key: 'isActive',
            type: 'select',
            placeholder: 'Status',
            options: [
                { label: 'Active', value: true },
                { label: 'Inactive', value: false },
            ],
        },  
    ];

    const handleFilterChange = (key, value) => {
        // console.log(key, value);
        dispatch(
            history_import.actions.setFilter({
                ...filter,
                [key]: value
            })
        );
    };

    const handleApplyFilter = (filterValues) => {
        // console.log(filterValues);
        dispatch(fetchFirst());
    };

    const handleResetFilter = () => {
        dispatch(
            history_import.actions.setFilter(filterHistoryIngredient)
        );
        dispatch(fetchFirst());
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-3">Ingredients Import Management</h1>
            {/* filter */}
            <div className="mb-3">
                <FilterBar
                    fields={importFilterFields}
                    values={filters}
                    onChange={handleFilterChange}
                    onApply={handleApplyFilter}
                    onReset={handleResetFilter}
                    type={ModalType.IMPORT_MANAGEMENT}
                />
            </div>
            <div className="bg-white p-6 border border-gray-300 mt-4 rounded-lg shadow-sm space-y-4">
                <Button type="primary" onClick={handleOpenAddImportModal}>
                    + New Import
                </Button>

                <Table
                    columns={columns}
                    dataSource={historyList?.data || []}
                    rowKey="key"
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                />
                <Pagination
                    current={historyList?.filter?.pageNo}
                    pageSize={10}
                    total={historyList.totalPage}
                />
            </div>
        </div>
    );
};

export default ImportManagement;
