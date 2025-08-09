import FilterBar from '@/components/filter/FilterBar';
import { initFilterOrder } from '@/defaultValue/admin/order/order';
import { fetchFirst } from '@/store/action/admin/order/order.action';
import { common, order } from '@/store/reducer';
import { selectFilterOrder, selectOrders } from '@/store/selector/admin/order/order.selector';
import { Order } from '@/type/store/admin/order/order.style';
import { ModalType } from '@/type/store/common';
import { Badge, Col, Row } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const OrderChef = () => {
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({});
    // selector
    const fitlerOrder = useSelector(selectFilterOrder);
    const { data } = useSelector(selectOrders);

    useEffect(() => {
        dispatch(
            order.actions.setFilterOrder({
                ...fitlerOrder,
                statusOrders: ['PENDING', 'PROCESSING'],
                sort: 'desc',
            })
        );
        dispatch(fetchFirst());
    }, []);

    const handleOpenViewOrder = (data) => {
        dispatch(order.actions.setSelectOrder(data));
        dispatch(
            common.actions.showModal({
                type: ModalType.ORDER_CHEF,
                variant: 'view',
                data: data,
            })
        );
    };

    const orderFilterFields = [
        { key: 'search', type: 'text', placeholder: 'Input search order code' },
        { key: 'date', type: 'dateRange', placeholder: 'Order time' },
        {
            key: 'statusOrders',
            type: 'select',
            placeholder: 'Status',
            options: [
                { label: 'PENDING', value: 'PENDING' },
                { label: 'PROCESSING', value: 'PROCESSING' },
            ],
        },
    ];

    const handleFilterChange = (key, value) => {
        if (key == 'date') {
            if (value == undefined || value == null) {
                dispatch(
                    order.actions.setFilterOrder({
                        ...fitlerOrder,
                        startDate: null,
                        endDate: null,
                    })
                );
            } else {
                dispatch(
                    order.actions.setFilterOrder({
                        ...fitlerOrder,
                        startDate: dayjs(value[0]).format('YYYY-MM-DD'),
                        endDate: dayjs(value[1]).format('YYYY-MM-DD'),
                    })
                );
            }
        } else if (key == 'statusOrders') {
            if (value == undefined || value == null) {
                dispatch(
                    order.actions.setFilterOrder({
                        ...fitlerOrder,
                        [key]: ['PENDING', 'PROCESSING'],
                    })
                );
            } else {
                dispatch(
                    order.actions.setFilterOrder({
                        ...fitlerOrder,
                        [key]: [value],
                    })
                );
            }
        } else {
            dispatch(
                order.actions.setFilterOrder({
                    ...fitlerOrder,
                    [key]: value,
                })
            );
        }
        setFilters((pre) => ({ ...pre, [key]: value }));
        dispatch(fetchFirst());
    };

    const handleResetFilter = () => {
        setFilters({});
        dispatch(
            order.actions.setFilterOrder({
                ...initFilterOrder,
                statusOrders: ['PENDING', 'PROCESSING'],
                sort: 'desc',
            })
        );
        dispatch(fetchFirst());
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-3">Order Management</h1>

            {/* filter */}
            <div className="mb-3">
                <FilterBar
                    fields={orderFilterFields}
                    values={filters}
                    onChange={handleFilterChange}
                    onReset={handleResetFilter}
                    onApply={null}
                    type={ModalType.ORDER_MANAGEMENT}
                />
            </div>

            <Row gutter={[20, 20]}>
                {data &&
                    data?.length > 0 &&
                    data.map((order: Order) => (
                        <Col key={order.id} xs={12} md={8} xl={6}>
                            <div
                                className="h-full bg-white rounded-md cursor-pointer"
                                onClick={() => {
                                    handleOpenViewOrder(order);
                                }}
                            >
                                <Badge.Ribbon
                                    text={order?.status || 'Unknown'}
                                    color={order?.status == 'PENDING' ? 'red' : 'purple'}
                                >
                                    <div className="">
                                        <div className="py-3 px-4 font-semibold">#{order.id}</div>
                                        <div className="border-b border-gray-300"></div>
                                        <div className="py-3 px-4">
                                            <p>
                                                <i>Order time: </i>
                                                <b>
                                                    {dayjs(order?.createTime || '').format(
                                                        'DD/MM/YYYY HH:MM'
                                                    )}
                                                </b>
                                            </p>
                                            <div className="flex items-start justify-start gap-2 mt-1">
                                                <i>Foods:</i>
                                                <div className="flex flex-col">
                                                    {order?.orderItems?.map((i) => (
                                                        <div key={i.id}>
                                                            <Badge
                                                                status={
                                                                    order.status == 'pending'
                                                                        ? 'warning'
                                                                        : 'processing'
                                                                }
                                                                text={`${i?.foodId?.foodId?.name} - ${i?.quantity}`}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Badge.Ribbon>
                            </div>
                        </Col>
                    ))}
            </Row>
        </div>
    );
};

export default OrderChef;
