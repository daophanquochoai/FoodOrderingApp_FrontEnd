import { ModalState } from '@/type/store/common'
import React, { useRef, useState } from 'react'
import ModalBase from './ModalBase'
import { useDispatch } from 'react-redux';
import { Button, DatePicker, Descriptions, DescriptionsProps, Image, Input, InputRef, Modal, Popconfirm, Select, Space, Table, TableColumnsType, TableColumnType, Tag } from 'antd';
import dayjs from 'dayjs';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

type DataIndex = keyof any;

const ModalOrderManagement: React.FC<ModalState> = ({ data, type, variant }) => {

    const ORDER_STATUSES = ['pending', 'processing', 'completed', 'shipping', 'received'] as const;

    const [selectedStatus, setSelectedStatus] = useState(false);

    const dispatch = useDispatch();

    const tagStatus = (status) => {
        let color = '';
        let label = '';

        switch (status) {
            case 'pending':
                color = 'default';
                label = 'pending';
                break;
            case 'processing':
                color = 'orange';
                label = "processing";
                break;
            case 'shipping':
                color = 'blue';
                label = "shipping";
                break;
            case 'received':
                color = 'cyan';
                label = 'received';
                break;
            case 'completed':
                color = 'green';
                label = "completed";
                break;
            case 'cancel':
                color = 'red';
                label = "cancel";
                break;
            default:
                color = 'gray';
                label = status;
        }

        return <Tag color={color}>{label}</Tag>;
    }

    //#region chi tiết sản phẩm
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
            title: 'Food name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.id.localeCompare(b.id),
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            align: 'center',
            render: (image) => (
                <div className="flex items-center justify-center">
                    <Image width={120} height={80} className="object-contain" src={image} />
                </div>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price_at_time',
            key: 'price_at_time',
            sorter: (a, b) => a.total - b.total,
            render: (price) => <p>{price.toLocaleString()}đ</p>
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.total - b.total,
            render: (quantity) => <p>{quantity}</p>
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            sorter: (a, b) => a.total - b.total,
            render: (_, record) => <p>{(record.quantity * record.price_at_time).toLocaleString()}đ</p>
        },
    ];
    //#endregion

    //#region mô tả đơn hàng
    const getNextStatusOptions = (currentStatus) => {
        const currentIndex = ORDER_STATUSES.indexOf(currentStatus);
        const nextStatuses = [];

        if (currentIndex >= 0 && currentIndex < ORDER_STATUSES.length - 1) {
            nextStatuses.push(...ORDER_STATUSES.slice(currentIndex + 1));// Trạng thái tiếp theo
        }

        // Các trạng thái được phép huỷ
        if (['pending', 'processing', 'completed', 'shipping'].includes(currentStatus)) {
            nextStatuses.push('cancel');
        }

        return nextStatuses;
    };


    const orderSummary: DescriptionsProps['items'] = [
        {
            key: 'status',
            label: 'Order Status',
            children: variant === 'edit' ? (
                <div className='w-[180px]'>
                    <Select
                        disabled={getNextStatusOptions(data.status).length === 0}
                        className="w-full"
                        defaultValue={data.status}
                        onChange={(value) => {
                            setSelectedStatus(value);
                        }}
                        options={getNextStatusOptions(data.status).map(status => ({
                            label: tagStatus(status),
                            value: status,
                        }))}
                    />
                    {selectedStatus && selectedStatus !== data.status ? (
                        <Popconfirm
                            title="Confirm status change"
                            description={`Are you sure you want to switch to this state "${selectedStatus}"?`}
                            onConfirm={() => {
                                console.log("Confirmed status change: ", selectedStatus);
                                // Gọi API hoặc callback xử lý ở đây
                            }}
                            okText="Confirm"
                            cancelText="Cancel"
                        >
                            <Button type="primary" danger className='mt-3'>Confirm status</Button>
                        </Popconfirm>
                    ) : null}
                </div>
            ) : (
                tagStatus(data.status)
            )
        },
        {
            key: 'id',
            label: 'Order code',
            children: <p className='font-medium'>{data.id}</p>,

        },
        {
            key: 'clientName',
            label: 'Customer name',
            children: <p className='font-medium'>{data.buyer.name}</p>,
        },
        {
            key: 'clientPhone',
            label: 'Phone number',
            children: <p className='font-medium'>{data.buyer.phone}</p>,
        },
        {
            key: 'address',
            label: 'Address',
            children: <p className='font-medium'>{data.buyer.address}</p>,
        },
        {
            key: 'createdAt',
            label: 'Craeted at',
            children: <p className='font-medium'>{dayjs(data.createdAt).format("DD/MM/YYYY")}</p>,
        },
        {
            key: 'shippingFee',
            label: 'Shipping Fee',
            children: <p className='font-medium'>{data.shippingFee.toLocaleString() || 0}đ</p>,
        },
        {
            key: 'total',
            label: 'Total',
            children: <p className='font-medium'>{data.total.toLocaleString()}đ</p>,
        },
        {
            key: 'paymentMethod',
            label: 'Payment method',
            children: <p className='font-medium'>{data.payment.method}</p>,
        },
        {
            key: 'paymentStatus',
            label: 'Payment status',
            children: (
                <p className={data.payment.status === "pending" ? "text-yellow-500" : "text-green-600"}>
                    {data.payment.status === "pending" ? "Unpaid" : "Paid"}
                </p>
            ),
        },
    ];
    //#endregion

    return (
        <ModalBase type={type}>
            <Descriptions
                title={variant == "edit" ? "Update order" : "Order information"}
                bordered
                column={1}
                items={orderSummary}
                className=''
            />

            <div className='pt-6 mt-6 mb-1 border-t-2 border-dashed border-gray-300'>
                <h3 className='text-[14px] font-semibold mb-4'>Order details</h3>
                <Table
                    columns={columns}
                    dataSource={data.items}
                    rowKey="key"
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                />
            </div>
        </ModalBase>
    )


}

export default ModalOrderManagement