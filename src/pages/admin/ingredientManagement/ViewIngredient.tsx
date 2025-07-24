import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { Button, DatePicker, Descriptions, DescriptionsProps, Input, InputRef, Space, Table, TableColumnsType, TableColumnType, Tag } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@mui/icons-material';
import Highlighter from 'react-highlight-words';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const ViewIngredient = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const navigate = useNavigate();

    type DataIndex = keyof any;

    const dataFakeHistory = [
        {
            history_id: 2,
            source_name: 'Công ty A',
            quantity: 50,
            used_unit: 40,
            avg_price: 15,
            price_per_unit: 16,
            create_at: '2025-07-03T10:00:00Z',
            expired_time: '2025-08-03T10:00:00Z',
            is_active: true,
        },
        {
            history_id: 1,
            source_name: 'Công ty A',
            quantity: 20,
            used_unit: 20,
            avg_price: 14,
            price_per_unit: 14,
            create_at: '2025-05-03T10:00:00Z',
            expired_time: '2025-06-03T10:00:00Z',
            is_active: false,
        },
    ];

    const getStatusTag = (status: string) => {
        switch (status) {
            case 'in_stock':
                return <Tag color="green">Còn</Tag>;
            case 'low_stock':
                return <Tag color="orange">Còn ít</Tag>;
            default:
                return <Tag color="red">Hết</Tag>;
        }
    };

    const data = {
        id: '1',
        name: 'Gạo',
        unit: 'kg',
        low_threshold: 10,
        late_update_time: '2025-07-13',
        avg_price: 15,
        create_at: '2024-09-03T10:00:00Z',
        quantity: 10,
        status: 'in_stock',
    };

    const foodInfo: DescriptionsProps['items'] = [
        {
            key: 'name',
            label: 'Tên nguyên liệu',
            children: data.name,
        },
        {
            key: 'unit',
            label: 'Đơn vị',
            children: data.unit,
        },
        {
            key: 'avg_price',
            label: 'Giá trung bình',
            children: <p>${data.avg_price}</p>,
        },
        {
            key: 'quantity',
            label: 'Số lượng còn',
            children: data.quantity,
        },
        {
            key: 'low_threshold',
            label: 'Ngưỡng cảnh báo',
            children: data.low_threshold,
        },
        {
            key: 'create_at',
            label: 'Ngày tạo',
            children: dayjs(data.create_at).format('DD/MM/YYYY'),
        },
        {
            key: 'status',
            label: 'Trạng thái',
            children: getStatusTag(data.status),
        },
    ];

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
            title: 'Lô nhập',
            dataIndex: 'history_id',
            key: 'history_id',
            sorter: (a, b) => a.history_id - b.history_id,
        },
        {
            title: 'Nhà cung cấp',
            dataIndex: 'source_name',
            key: 'source_name',
            ...getColumnSearchProps('source_name'),
        },
        {
            title: 'Số lượng nhập',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: 'Số lượng dùng',
            dataIndex: 'used_unit',
            key: 'used_unit',
            sorter: (a, b) => a.used_unit - b.used_unit,
        },
        {
            title: 'Giá/đơn vị',
            dataIndex: 'price_per_unit',
            key: 'price_per_unit',
            sorter: (a, b) => a.price_per_unit - b.price_per_unit,
            render: (text) => <p>${text}</p>,
        },
        {
            title: 'Giá trung bình',
            dataIndex: 'avg_price',
            key: 'avg_price',
            sorter: (a, b) => a.avg_price - b.avg_price,
            render: (text) => <p>${text}</p>,
        },
        {
            title: 'Ngày nhập',
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
            title: 'Ngày hết hạn',
            dataIndex: 'expired_time',
            key: 'expired_time',
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
            onFilter: (value, record) => record.expired_time?.startsWith(value as string) || false,
            render: (date) => dayjs(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'is_active',
            key: 'status',
            filters: [
                { text: 'Active', value: true },
                { text: 'Inactive', value: false },
            ],
            onFilter: (value, record) => record.is_active == value,
            render: (status) => {
                if (status == true) return <Tag color="green">Active</Tag>;
                return <Tag color="red">Inactive</Tag>;
            },
        },
    ];

    return (
        <div className="relative">
            <div className="absolute top-0 left-0">
                <button
                    onClick={() => navigate(`/admin/ingredient-management`)}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-white hover:bg-gray-50 rounded shadow"
                >
                    <IoMdArrowBack /> Back
                </button>
            </div>
            <div className='pt-12'>
                <div className="bg-white px-2 py-2 rounded-md">
                    <Descriptions
                        title="Thông tin nguyên liệu"
                        bordered
                        column={1}
                        items={foodInfo}
                    />
                </div>

                <div className="bg-white px-2 py-2 rounded-md mt-6 ">
                    <h2 className="text-[14px] mb-6 font-semibold">Lịch sử nhập nguyên liệu</h2>
                    <Table
                        columns={columns}
                        dataSource={dataFakeHistory}
                        rowKey="key"
                        scroll={{ x: 'max-content' }}
                        pagination={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewIngredient