import { common } from '@/store/reducer';
import { ModalType } from '@/type/store/common';
import { EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
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

    const orders = [
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
                    image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                },
                {
                    id: 102,
                    name: 'Nước cam',
                    quantity: 1,
                    price_at_time: 35000,
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
                    image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                },
            ],
            shippingFee: 15000,
            total: 80000,
            payment: {
                method: 'Tiền mặt',
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
                    image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                },
                {
                    id: 105,
                    name: 'Trà sữa trân châu',
                    quantity: 2,
                    price_at_time: 40000,
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
                    image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                },
                {
                    id: 107,
                    name: 'Nước suối',
                    quantity: 2,
                    price_at_time: 10000,
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

    const columns: TableColumnsType = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps('id'),
            sorter: (a, b) => a.id.localeCompare(b.id),
        },
        {
            title: 'Khách hàng',
            dataIndex: 'buyer',
            key: 'buyer',
            ...getColumnSearchProps('id'),
            render: (buyer) => <p>{buyer.name}</p>,
        },
        {
            title: 'Ngày đặt',
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
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'total',
            sorter: (a, b) => a.total - b.total,
            render: (total) => <p>{total.toLocaleString()}đ</p>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Chờ xử lý', value: 'pending' },
                { text: 'Đang xử lý', value: 'processing' },
                { text: 'Hoàn thành', value: 'completed' },
                { text: 'Đang giao', value: 'shipping' },
                { text: 'Đã nhận', value: 'received' },
                { text: 'Đã hủy', value: 'cancel' },
            ],
            onFilter: (value, record) => record.status == value,
            render: (status) => {
                let color = '';
                let label = '';

                switch (status) {
                    case 'pending':
                        color = 'default';
                        label = 'Chờ xử lý';
                        break;
                    case 'processing':
                        color = 'orange';
                        label = 'Đang xử lý';
                        break;
                    case 'shipping':
                        color = 'blue';
                        label = 'Đang giao';
                        break;
                    case 'received':
                        color = 'cyan';
                        label = 'Đã nhận';
                        break;
                    case 'completed':
                        color = 'green';
                        label = 'Hoàn thành';
                        break;
                    case 'cancel':
                        color = 'red';
                        label = 'Đã hủy';
                        break;
                    default:
                        color = 'gray';
                        label = status;
                }

                return <Tag color={color}>{label}</Tag>;
            },
        },
        {
            title: 'Thanh toán',
            dataIndex: 'payment',
            key: 'payment',
            filters: [
                { text: 'Visa', value: 'Visa' },
                { text: 'Tiền mặt', value: 'Tiền mặt' },
            ],
            onFilter: (value, record) => record.payment.method == value,
            render: (payment) => (
                <div className="flex items-center justify-start gap-2">
                    <p style={{ marginBottom: 4 }}>{payment.method}</p>
                    <Tag color={payment.status === 'pending' ? 'red' : 'green'}>
                        {payment.status === 'pending' ? 'Chưa TT' : 'Đã TT'}
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

    return (
        <div>
            <h1 className="text-2xl font-bold mb-3">Quản lý đơn hàng</h1>

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
