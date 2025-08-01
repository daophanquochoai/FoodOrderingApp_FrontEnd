import FilterBar from '@/components/filter/FilterBar';
import { common } from '@/store/reducer';
import { ModalType } from '@/type/store/common';
import { EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { LuTrendingUp, LuTrendingDown } from 'react-icons/lu';
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
import { FilterDropdownProps } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type DataIndex = keyof any;

const OrderManagement = () => {
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const [filters, setFilters] = useState({});

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

    let orders = [
        {
            id: 1001,
            buyer: {
                id: 1,
                name: 'Nguyễn Văn A',
                phone: '0909123456',
                email: 'vana@example.com',
                address: 'TP Hồ Chí Minh',
            },
            items: [
                {
                    id: 101,
                    name: 'Bánh mì thịt',
                    quantity: 2,
                    price_at_time: 50000,
                    cost: 30000, // lợi nhuận dương
                    image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                },
                {
                    id: 102,
                    name: 'Nước cam',
                    quantity: 1,
                    price_at_time: 35000,
                    cost: 20000,
                    image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                },
            ],
            shippingFee: 15000,
            total: 135000,
            payment: {
                method: 'Visa',
                status: 'paid',
            },
            status: 'processing',
            createdAt: '2025-07-23T14:00:00Z',
        },
        {
            id: 1002,
            buyer: {
                id: 2,
                name: 'Trần Thị B',
                phone: '0911123456',
                email: 'tranb@example.com',
                address: 'TP Hồ Chí Minh',
            },
            items: [
                {
                    id: 103,
                    name: 'Cơm gà chiên',
                    quantity: 1,
                    price_at_time: 65000,
                    cost: 60000, // lợi nhuận thấp
                    image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                },
            ],
            shippingFee: 15000,
            total: 80000,
            payment: {
                method: 'Cash',
                status: 'pending',
            },
            status: 'shipping',
            createdAt: '2025-07-22T10:30:00Z',
        },
        {
            id: 1003,
            buyer: {
                id: 3,
                name: 'Lê Quốc C',
                phone: '0988765432',
                email: 'quocc@example.com',
                address: 'TP Hồ Chí Minh',
            },
            items: [
                {
                    id: 104,
                    name: 'Phở bò tái',
                    quantity: 2,
                    price_at_time: 60000,
                    cost: 65000, // lỗ
                    image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                },
                {
                    id: 105,
                    name: 'Trà sữa trân châu',
                    quantity: 2,
                    price_at_time: 40000,
                    cost: 45000, // lỗ
                    image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                },
            ],
            shippingFee: 0,
            total: 200000,
            payment: {
                method: 'Visa',
                status: 'paid',
            },
            status: 'received',
            createdAt: '2025-07-21T09:00:00Z',
        },
        {
            id: 1004,
            buyer: {
                id: 4,
                name: 'Phạm Minh D',
                phone: '0977123988',
                email: 'minhd@example.com',
                address: 'TP Hồ Chí Minh',
            },
            items: [
                {
                    id: 106,
                    name: 'Bún bò Huế',
                    quantity: 1,
                    price_at_time: 70000,
                    cost: 40000, // lời nhiều
                    image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                },
                {
                    id: 107,
                    name: 'Nước suối',
                    quantity: 2,
                    price_at_time: 10000,
                    cost: 7000,
                    image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                },
            ],
            shippingFee: 15000,
            total: 95000,
            payment: {
                method: 'Visa',
                status: 'paid',
            },
            status: 'pending',
            createdAt: '2025-07-24T11:45:00Z',
        },
    ];

    orders = orders.map((order) => {
        const costOfItems = order.items.reduce((sum, item) => sum + item.cost * item.quantity, 0);
        const totalCost = costOfItems + order.shippingFee;
        const profit = order.total - totalCost;

        return { ...order, totalCost, profit };
    });

    console.log(orders);

    const columns: TableColumnsType = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps('id'),
            sorter: (a, b) => a.id.localeCompare(b.id),
        },
        {
            title: 'Customer name',
            dataIndex: 'buyer',
            key: 'buyer',
            ...getColumnSearchProps('id'),
            render: (buyer) => <p>{buyer.name}</p>,
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
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
                        Áp dụng
                    </Button>
                    <Button
                        onClick={() => clearFilters && clearFilters()}
                        size="small"
                        style={{ width: '100%' }}
                    >
                        Xóa
                    </Button>
                </div>
            ),
            onFilter: (value, record) =>
                record.late_update_time?.startsWith(value as string) || false,
            render: (createdAt) => (createdAt ? dayjs(createdAt).format('DD/MM/YYYY') : ''),
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            sorter: (a, b) => a.total - b.total,
            render: (total) => <p>{total.toLocaleString()}đ</p>,
        },
        {
            title: 'Cost',
            dataIndex: 'totalCost',
            key: 'totalCost',
            render: (totalCost) => <p>{totalCost.toLocaleString()}đ</p>,
        },
        {
            title: 'Price Difference',
            key: 'priceDifference',
            render: (_, record) => {
                const profit = record.total - record.totalCost;

                return (
                    <div
                        className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md ${
                            profit > 0 ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
                        }`}
                    >
                        <h6 className="text-xs font-medium">${profit.toLocaleString()}</h6>
                        {profit > 0 ? <LuTrendingUp /> : <LuTrendingDown />}
                    </div>
                );
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'pending', value: 'pending' },
                { text: 'processing', value: 'processing' },
                { text: 'completed', value: 'completed' },
                { text: 'shipping', value: 'shipping' },
                { text: 'received', value: 'received' },
                { text: 'cancel', value: 'cancel' },
            ],
            onFilter: (value, record) => record.status == value,
            render: (status) => {
                let color = '';
                let label = '';

                switch (status) {
                    case 'pending':
                        color = 'default';
                        label = 'pending';
                        break;
                    case 'processing':
                        color = 'orange';
                        label = 'processing';
                        break;
                    case 'shipping':
                        color = 'blue';
                        label = 'shipping';
                        break;
                    case 'received':
                        color = 'cyan';
                        label = 'received';
                        break;
                    case 'completed':
                        color = 'green';
                        label = 'completed';
                        break;
                    case 'cancel':
                        color = 'red';
                        label = 'cancel';
                        break;
                    default:
                        color = 'gray';
                        label = status;
                }

                return <Tag color={color}>{label}</Tag>;
            },
        },
        {
            title: 'Payment',
            dataIndex: 'payment',
            key: 'payment',
            filters: [
                { text: 'Visa', value: 'Visa' },
                { text: 'Cash', value: 'Cash' },
            ],
            onFilter: (value, record) => record.payment.method == value,
            render: (payment) => (
                <div className="flex items-center justify-start gap-2">
                    <p style={{ marginBottom: 4 }}>{payment.method}</p>
                    <Tag color={payment.status === 'pending' ? 'red' : 'green'}>
                        {payment.status === 'pending' ? 'Unpaid' : 'Paid'}
                    </Tag>
                </div>
            ),
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
                        onClick={() => {
                            handleOpenViewOrderModal(record);
                        }}
                        className=""
                        size="small"
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            handleOpenEditOrderModal(record);
                        }}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    const handleOpenViewOrderModal = (data) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.ORDER_MANAGEMENT,
                variant: 'view',
                data: data,
            })
        );
    };

    const handleOpenEditOrderModal = (data) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.ORDER_MANAGEMENT,
                variant: 'edit',
                data: data,
            })
        );
    };

    const orderFilterFields = [
        { key: 'name', type: 'text', placeholder: 'Buyer Names' },
        { key: 'create_at', type: 'dateRange', placeholder: 'Date of purchase' },
        {
            key: 'status',
            type: 'select',
            placeholder: 'Status',
            options: [
                { label: 'pending', value: 'pending' },
                { label: 'processing', value: 'processing' },
                { label: 'completed', value: 'completed' },
                { label: 'shipping', value: 'shipping' },
                { label: 'received', value: 'received' },
                { label: 'cancel', value: 'cancel' },
            ],
        },
    ];

    const handleFilterChange = (key, value) => {
        setFilters((pre) => ({ ...pre, [key]: value }));
    };

    const handleResetFilter = () => {
        setFilters({});
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-3">Orders management</h1>

            {/* filter */}
            <div className="mb-3">
                <FilterBar
                    fields={orderFilterFields}
                    values={filters}
                    onChange={handleFilterChange}
                    onReset={handleResetFilter}
                    type={ModalType.ORDER_MANAGEMENT}
                />
            </div>

            <div className="bg-white p-2 rounded-md">
                <Table
                    columns={columns}
                    dataSource={orders}
                    rowKey="key"
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                />
            </div>
        </div>
    );
};

export default OrderManagement;
