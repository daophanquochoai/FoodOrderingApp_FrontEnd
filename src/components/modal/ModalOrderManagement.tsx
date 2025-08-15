import { ModalState } from '@/type/store/common';
import React, { useRef, useState } from 'react';
import ModalBase from './ModalBase';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Descriptions,
    DescriptionsProps,
    Image,
    Input,
    InputRef,
    Popconfirm,
    Select,
    Space,
    Table,
    TableColumnsType,
    TableColumnType,
    Tag,
} from 'antd';
import dayjs from 'dayjs';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { selectSelectedOrder } from '@/store/selector/admin/order/order.selector';
import { OrderItem } from '@/type/store/admin/order/order.style';

type DataIndex = keyof any;
const ORDER_STATUSES = [
    'CREATING',
    'PENDING',
    'PROCESSING',
    'COMPLETE',
    'SHIPPING',
    'RECEIVE',
    'CANCEL',
] as const;

const ModalOrderManagement: React.FC<ModalState> = ({ data, type, variant }) => {
    // selector
    const selectOrder = useSelector(selectSelectedOrder);

    console.log(selectOrder);

    const [selectedStatus, setSelectedStatus] = useState(false);

    const dispatch = useDispatch();

    const tagStatus = (status) => {
        let color = '';
        let label = '';

        switch (status) {
            case 'CREATING':
                color = 'default';
                label = 'Creating';
                break;
            case 'PENDING':
                color = 'orange';
                label = 'Pending';
                break;
            case 'PROCESSING':
                color = 'pink';
                label = 'Processing';
                break;
            case 'COMPLETE':
                color = 'cyan';
                label = 'Complete';
                break;
            case 'SHIPPING':
                color = 'blue';
                label = 'Shippinh';
                break;
            case 'RECEIVE':
                color = 'green';
                label = 'Receive';
                break;
            case 'CANCEL':
                color: 'red';
                label: 'Cancel';
            default:
                color = 'gray';
                label = status;
        }

        return <Tag color={color}>{label}</Tag>;
    };

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

    const columns: TableColumnsType<OrderItem> = [
        {
            title: 'Food name',
            key: 'name',
            render: (e: OrderItem) => <p>{e?.foodId?.foodId?.name}</p>,
        },
        {
            title: 'Image',
            key: 'image',
            align: 'center',
            render: (image: OrderItem) => (
                <div className="flex items-center justify-center">
                    <Image
                        width={120}
                        height={80}
                        className="object-contain"
                        src={image?.foodId?.foodId?.image}
                    />
                </div>
            ),
        },
        {
            title: 'Price at time',
            key: 'price_at_time',
            render: (price: OrderItem) => (
                <p>${price?.priceAtTime ? price?.priceAtTime.toLocaleString() : 0}</p>
            ),
        },
        {
            title: 'Quantity',
            key: 'quantity',
            render: (quantity: OrderItem) => <p>{quantity?.quantity}</p>,
        },
        {
            title: 'Total item',
            key: 'total',
            render: (_, record: OrderItem) => (
                // <p>${selectOrder?.totalPrice ? selectOrder?.totalPrice.toLocaleString() : 0}</p>
                <p>${((record?.quantity || 0) * (record?.priceAtTime || 0)).toLocaleString()}</p>
            ),
        },
    ];
    //#endregion

    //#region mô tả đơn hàng
    const getNextStatusOptions = (currentStatus) => {
        const currentIndex = ORDER_STATUSES.indexOf(currentStatus);
        const nextStatuses = [];

        if (currentIndex >= 0 && currentIndex < ORDER_STATUSES.length - 1) {
            nextStatuses.push(...ORDER_STATUSES.slice(currentIndex + 1)); // Trạng thái tiếp theo
        }

        // Các trạng thái được phép huỷ
        if (['pending', 'processing', 'completed', 'shipping'].includes(currentStatus)) {
            nextStatuses.push('cancel');
        }

        return nextStatuses;
    };

    console.log(selectOrder);

    const orderSummary: DescriptionsProps['items'] = [
        {
            key: 'status',
            label: 'Order status',
            children:
                variant === 'edit' ? (
                    <div className="w-[180px]">
                        <Select
                            disabled={getNextStatusOptions(data.status).length === 0}
                            className="w-full"
                            defaultValue={selectOrder?.status}
                        />
                    </div>
                ) : (
                    tagStatus(data.status)
                ),
        },
        {
            key: 'id',
            label: 'Order code',
            children: <p className="font-medium">{selectOrder?.id}</p>,
        },
        {
            key: 'clientName',
            label: 'Customer name',
            children: <p className="font-medium">{selectOrder?.name}</p>,
        },
        {
            key: 'clientPhone',
            label: 'Number phone',
            children: <p className="font-medium">{selectOrder?.phoneNumber}</p>,
        },
        {
            key: 'address',
            label: 'Address',
            children: <p className="font-medium">{selectOrder?.address}</p>,
        },
        {
            key: 'createdAt',
            label: 'Order at',
            children: (
                <p className="font-medium">{dayjs(selectOrder?.createTime).format('DD/MM/YYYY')}</p>
            ),
        },
        {
            key: 'shippingFee',
            label: 'Shipping fee',
            children: (
                <p className="font-medium">
                    ${selectOrder?.shipFee ? selectOrder?.shipFee.toLocaleString() : 0}
                </p>
            ),
        },
        {
            key: 'total',
            label: 'Total price',
            children: (
                <p className="font-medium">
                    ${selectOrder?.totalPrice ? selectOrder?.totalPrice.toLocaleString() : 0}
                </p>
            ),
        },
        {
            key: 'paymentMethod',
            label: 'Payment method',
            children: <p className="font-medium">{selectOrder?.paymentId?.methodName}</p>,
        },
    ];
    //#endregion

    return (
        <ModalBase type={type}>
            <Descriptions
                title={variant == 'edit' ? 'Update order' : 'Order infomation'}
                bordered
                column={1}
                items={orderSummary}
                className=""
            />

            <div className="pt-6 mt-6 mb-1 border-t-2 border-dashed border-gray-300">
                <h3 className="text-[14px] font-semibold mb-4">Oder details</h3>
                <Table
                    columns={columns}
                    dataSource={selectOrder.orderItems}
                    rowKey="key"
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                />
            </div>
        </ModalBase>
    );
};

export default ModalOrderManagement;
