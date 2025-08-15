import FilterBar from '@/components/filter/FilterBar';
import { fetchFirst } from '@/store/action/admin/order/order.action';
import { common, order } from '@/store/reducer';
import { selectFilterOrder, selectOrders } from '@/store/selector/admin/order/order.selector';
import { Order } from '@/type/store/admin/order/order.style';
import { ModalType } from '@/type/store/common';
import { EyeOutlined } from '@ant-design/icons';
import { Button, DatePicker, Pagination, Space, Spin, Table, TableColumnsType, Tag } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initFilterOrder } from '@/defaultValue/admin/order/order';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { PiApproximateEqualsFill } from 'react-icons/pi';

const OrderManagement = () => {
    // hook
    const dispatch = useDispatch();

    //selector
    const orderList = useSelector(selectOrders);
    const filter = useSelector(selectFilterOrder);

    // useEffect
    useEffect(() => {
        dispatch(fetchFirst());
    }, []);

    const columns: TableColumnsType<Order> = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Customer',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Order time',
            dataIndex: 'createTime',
            key: 'createTime',
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
            onFilter: (value, record) => record?.createTime?.startsWith(value as string) || false,
            render: (createdAt) => (createdAt ? dayjs(createdAt).format('DD/MM/YYYY') : ''),
        },
        {
            title: 'Total price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            sorter: (a, b) => a?.totalPrice - b?.totalPrice,
            render: (total) => <p>{total ? total.toLocaleString() : 0} USD</p>,
        },
        {
            title: 'COGS',
            key: 'cogs',
            sorter: (a, b) => a?.totalPrice - b?.totalPrice,
            render: (item) => {
                return (
                    <div className="flex gap-4 items-center">
                        <p>{item && item?.cogs ? item?.cogs?.toLocaleString() : '0'} USD</p>
                        {(item?.totalPrice || 0) < (item?.cogs || 0) ? (
                            <div className="text-2xl text-red-700">
                                <FaArrowTrendDown />
                            </div>
                        ) : (item?.totalPrice || 0) == (item?.cogs || 0) ? (
                            <div className="text-2xl text-blue-600">
                                <PiApproximateEqualsFill />
                            </div>
                        ) : (
                            <div className="text-2xl text-green-500">
                                <FaArrowTrendUp />
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Creating', value: 'CREATING' },
                { text: 'Pending', value: 'PENDING' },
                { text: 'Processing', value: 'PROCESSING' },
                { text: 'Complete', value: 'COMPLETE' },
                { text: 'Shipping', value: 'SHIPPING' },
                { text: 'Receive', value: 'RECEIVE' },
                { text: 'Cancel', value: 'CANCEL' },
            ],
            onFilter: (value, record) => record.status == value,
            render: (status) => {
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
                        color = 'red';
                        label = 'Cancel';
                        break;
                    default:
                        color = 'gray';
                        label = status;
                }

                return <Tag color={color}>{label}</Tag>;
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
                        onClick={() => {
                            handleOpenViewOrderModal(record);
                        }}
                        className=""
                        size="small"
                    />
                    {/* <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            handleOpenEditOrderModal(record);
                        }}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                    /> */}
                </Space>
            ),
        },
    ];

    const handleOpenViewOrderModal = (data) => {
        dispatch(order.actions.setSelectOrder(data));
        dispatch(
            common.actions.showModal({
                type: ModalType.ORDER_MANAGEMENT,
                variant: 'view',
                data: data,
            })
        );
    };

    const orderFilterFields = [
        { key: 'search', type: 'text', placeholder: 'Input search' },
        // { key: 'startDate', type: 'dateRange', placeholder: 'Ngày mua hàng' },
        { key: 'startDate', type: 'date', placeholder: 'Order date' },
        {
            key: 'statusOrders',
            type: 'multiSelect',
            placeholder: 'Status',
            options: [
                { label: 'pending', value: 'PENDING' },
                { label: 'processing', value: 'PROCESSING' },
                { label: 'completed', value: 'COMPLETE' },
                { label: 'shipping', value: 'SHIPPING' },
                { label: 'received', value: 'RECEIVE' },
                { label: 'cancel', value: 'CANCEL' },
            ],
        },
    ];

    const handleFilterChange = (key, value) => {
        dispatch(
            order.actions.setFilterOrder({
                ...filter,
                [key]: value,
            })
        );
    };

    const handleApplyFilter = () => {
        dispatch(fetchFirst());
    };

    const handleResetFilter = () => {
        dispatch(order.actions.setFilterOrder(initFilterOrder));
        dispatch(fetchFirst());
    };

    const handleChangePage = (e) => {
        console.log(e);
        dispatch(
            order.actions.setFilterOrder({
                ...filter,
                pageNo: e - 1,
            })
        );
        dispatch(fetchFirst());
    };

    return (
        <Spin spinning={orderList.loading}>
            <div>
                <h1 className="text-2xl font-bold mb-3">Order Management</h1>

                {/* filter */}
                <div className="mb-3">
                    <FilterBar
                        fields={orderFilterFields}
                        values={filter}
                        onChange={handleFilterChange}
                        onReset={handleResetFilter}
                        onApply={handleApplyFilter}
                        type={ModalType.ORDER_MANAGEMENT}
                    />
                </div>

                <div className="bg-white p-2 rounded-md">
                    <Table
                        columns={columns}
                        dataSource={orderList.data}
                        rowKey="key"
                        scroll={{ x: 'max-content' }}
                        pagination={false}
                    />
                    <div className="flex justify-center mt-[20px] mb-[10px]">
                        <Pagination
                            showSizeChanger={false}
                            onChange={(e) => handleChangePage(e)}
                            current={filter.pageNo + 1}
                            pageSize={10}
                            total={orderList.totalPage}
                        />
                    </div>
                </div>
            </div>
        </Spin>
    );
};

export default OrderManagement;
