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
import { Ingredient } from '../../../type';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

type DataIndex = keyof Ingredient;

const IngredientManagement: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Ingredient> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
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
                            setSearchedColumn(dataIndex);
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

    const columns: TableColumnsType<Ingredient> = [
        { title: 'Name', dataIndex: 'name', key: 'name', ...getColumnSearchProps('name') },
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
        },
        {
            title: 'Low threshold',
            dataIndex: 'low_threshold',
            key: 'low_threshold',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Stock', value: 'in_stock' },
                { text: 'Low stock', value: 'out_of_stock' },
                { text: 'Out of stock', value: 'out_of_stock' },
            ],
            onFilter: (value, record) => record.status == value,
            render: (status) => {
                if (status == 'in_stock') return <Tag color="green">Stock</Tag>;
                if (status == 'low_stock') return <Tag color="orange">Low stock</Tag>;
                return <Tag color="red">Out of stock</Tag>;
            },
        },
        {
            title: 'Updated Time',
            dataIndex: 'late_update_time',
            key: 'late_update_time',
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
            onFilter: (value, record) =>
                record.late_update_time?.startsWith(value as string) || false,
        },
    ];

    const data: Ingredient[] = [
        {
            key: '1',
            name: 'Gạo',
            unit: 'kg',
            quantity: 5,
            low_threshold: 10,
            late_update_time: '2025-07-12',
            status: 'low_stock',
        },
        {
            key: '2',
            name: 'Dầu ăn',
            unit: 'liter',
            quantity: 0,
            low_threshold: 3,
            late_update_time: '2025-07-11',
            status: 'out_of_stock',
        },
        {
            key: '3',
            name: 'Muối',
            unit: 'kg',
            quantity: 50,
            low_threshold: 10,
            late_update_time: '2025-07-10',
            status: 'in_stock',
        },
    ];

    return <Table columns={columns} dataSource={data} rowKey="key" />;
};

export default IngredientManagement;
