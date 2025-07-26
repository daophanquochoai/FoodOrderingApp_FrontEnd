import {
    Button,
    DatePicker,
    Input,
    InputRef,
    Space,
    Table,
    TableColumnsType,
    TableColumnType,
    Tag,
} from 'antd';
import React, { useRef, useState } from 'react';

import { FilterDropdownProps } from 'antd/es/table/interface';
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { mapIngredients } from '../../../utils/mapIngredients';
import { ModalType } from '@/type/store/common';
import { common } from '@/store/reducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import FilterBar from '@/components/filter/FilterBar';

type DataIndex = keyof any;

const SpoilIngredient = () => {
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const navigate = useNavigate();

    const [filters, setFilters] = useState({});

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(String(dataIndex));
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${String(dataIndex)}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(String(dataIndex));
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ?.toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()) || false,
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: TableColumnsType = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Import History ID',
            dataIndex: 'importHistoryId',
            key: 'name',
            width: '200px',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            filters: [
                { text: 'kg', value: 'kg' },
                { text: 'liter', value: 'liter' },
            ],
            onFilter: (value, record) => record.unit == value,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
            width: '150px',
            render: (reason) => (
                <p
                    style={{
                        width: '150px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {reason}
                </p>
            ),
        },
        {
            title: 'Created Time',
            dataIndex: 'create_at',
            key: 'create_at',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <DatePicker
                        onChange={(date, dateString) =>
                            setSelectedKeys(dateString ? [dateString as string] : [])
                        }
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        size="small"
                        style={{ width: '100%' }}
                    >
                        Apply
                    </Button>
                    <Button
                        onClick={() => clearFilters && clearFilters()}
                        size="small"
                        style={{ width: '100%' }}
                    >
                        Delete
                    </Button>
                </div>
            ),
            onFilter: (value, record) => record.create_at?.startsWith(value as string) || false,
            render: (date) => dayjs(date).format('DD/MM/YYYY'),
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
                        onClick={() => handleOpenViewSpoilIngredientModal(record)}
                        className=""
                        size="small"
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleOpenEditSpoilIngredientModal(record)}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleOpenDeleteSpoilIngredientModal(record)}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    const dataSource = [
        {
            name: 'Dầu ăn',
            importHistoryId: 1,
            unit: 'liter',
            quantity: 3,
            reason: 'Dầu ăn bảo quản hỏng aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            create_at: '2024-09-03T10:00:00Z',
            late_update_time: '',
        },
    ];

    const handleOpenViewSpoilIngredientModal = (data) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.SPOIL_INGREDIENT,
                variant: 'view',
                data: data,
            })
        );
    };

    const handleOpenAddSpoilIngredientModal = () => {
        dispatch(
            common.actions.showModal({
                type: ModalType.SPOIL_INGREDIENT,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenEditSpoilIngredientModal = (spoil) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.SPOIL_INGREDIENT,
                variant: 'edit',
                data: spoil,
            })
        );
    };

    const handleOpenDeleteSpoilIngredientModal = (ingredient) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.SPOIL_INGREDIENT,
                variant: 'delete',
                data: ingredient,
            })
        );
    };

    const spoilIngredientFilterFields = [
        { key: 'name', type: 'text', placeholder: 'Tên nguyên liệu' },
        { key: 'create_at', type: 'dateRange', placeholder: 'Ngày tạo' },
    ];

    const handleFilterChange = (key, value) => {
        setFilters((pre) => ({ ...pre, [key]: value }));
    };

    const handleResetFilter = () => {
        setFilters({});
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-3">Spoil Ingredient Management</h1>

            {/* filter */}
            <div className="mb-3">
                <FilterBar
                    fields={spoilIngredientFilterFields}
                    values={filters}
                    onChange={handleFilterChange}
                    onReset={handleResetFilter}
                    type={ModalType.SPOIL_INGREDIENT}
                />
            </div>

            <div className="bg-white p-6 border border-gray-300 mt-4 rounded-lg shadow-sm space-y-4">
                <Button type="primary" onClick={handleOpenAddSpoilIngredientModal}>
                    + New Report
                </Button>

                <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey="key"
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                />
            </div>
        </div>
    );
};

export default SpoilIngredient;
