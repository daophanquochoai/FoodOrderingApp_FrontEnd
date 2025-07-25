import {
    Button,
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

type DataIndex = keyof any;

const IngredientManagement: React.FC = () => {
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const navigate = useNavigate();

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
            title: 'Avg Price',
            dataIndex: 'avg_price',
            key: 'avg_price',
            sorter: (a, b) => a.avg_price - b.avg_price,
            render: (text) => <p>${text}</p>,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: 'Low threshold',
            dataIndex: 'low_threshold',
            key: 'low_threshold',
            sorter: (a, b) => a.low_threshold - b.low_threshold,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Stock', value: 'in_stock' },
                { text: 'Low stock', value: 'low_stock' },
                { text: 'Out of stock', value: 'out_of_stock' },
            ],
            onFilter: (value, record) => record.status == value,
            render: (status) => {
                if (status == 'in_stock') return <Tag color="green">Còn</Tag>;
                if (status == 'low_stock') return <Tag color="orange">Còn ít</Tag>;
                return <Tag color="red">Hết</Tag>;
            },
        },
        // {
        //     title: 'Updated Time',
        //     dataIndex: 'late_update_time',
        //     key: 'late_update_time',
        //     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        //         <div style={{ padding: 8 }}>
        //             <DatePicker
        //                 onChange={(date, dateString) =>
        //                     setSelectedKeys(dateString ? [dateString as string] : [])
        //                 }
        //                 style={{ marginBottom: 8, display: 'block' }}
        //             />
        //             <Button
        //                 type="primary"
        //                 onClick={() => confirm()}
        //                 size="small"
        //                 style={{ width: '100%' }}
        //             >
        //                 Apply
        //             </Button>
        //             <Button
        //                 onClick={() => clearFilters && clearFilters()}
        //                 size="small"
        //                 style={{ width: '100%' }}
        //             >
        //                 Delete
        //             </Button>
        //         </div>
        //     ),
        //     onFilter: (value, record) =>
        //         record.late_update_time?.startsWith(value as string) || false,
        // },
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
                        onClick={() => navigate(`/admin/ingredient-management/${record.id}`)}
                        className=""
                        size="small"
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleOpenEditIngredientModal(record)}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleOpenDeleteIngredientModal(record)}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    const rawData = [
        {
            id: '1',
            name: 'Gạo',
            unit: 'kg',
            low_threshold: 10,
            late_update_time: '2025-07-13',
            avg_price: 15,
            create_at: '2024-09-03T10:00:00Z',
            history: [
                { quantity: 50, used_unit: 40, avg_price: 15 }, // còn 10
                { quantity: 20, used_unit: 20, avg_price: 10 }, // còn 0
            ],
        },
        {
            id: '2',
            name: 'Dầu ăn',
            unit: 'lít',
            low_threshold: 5,
            late_update_time: '2025-07-12',
            avg_price: 8,
            create_at: '2024-09-03T10:00:00Z',
            history: [{ quantity: 10, used_unit: 10, avg_price: 8 }],
        },
    ];

    const dataSource = mapIngredients(rawData);

    const handleOpenAddIngredientModal = () => {
        dispatch(
            common.actions.showModal({
                type: ModalType.INGREDIENT,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenEditIngredientModal = (ingredient) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.INGREDIENT,
                variant: 'edit',
                data: ingredient,
            })
        );
    };

    const handleOpenDeleteIngredientModal = (ingredient) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.INGREDIENT,
                variant: 'delete',
                data: ingredient,
            })
        );
    };

    return (
        <div className=''>
            <h1 className="text-2xl font-bold">Ingredient Management</h1>
            <div className="bg-white p-6 border border-gray-300 mt-4 rounded-lg shadow-sm space-y-4">
                <Button type="primary" onClick={handleOpenAddIngredientModal}>
                    + New Ingredient
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

export default IngredientManagement;
