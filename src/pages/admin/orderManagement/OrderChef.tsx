import { common } from '@/store/reducer';
import { ModalType } from '@/type/store/common';
import { Badge, Card, Col, Row } from 'antd';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

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
                quantity: 1,
                price_at_time: 50000,
                cost: 30000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                ingredients: [
                    { id: 1, ingredient_name: 'Bánh mì', quantity: 1, unit: 'cái' },
                    { id: 2, ingredient_name: 'Thịt nguội', quantity: 50, unit: 'g' },
                    { id: 3, ingredient_name: 'Rau sống', quantity: 30, unit: 'g' },
                    { id: 4, ingredient_name: 'Nước sốt', quantity: 10, unit: 'ml' },
                ],
            },
            {
                id: 101,
                name: 'Bánh mì thịt',
                quantity: 1,
                price_at_time: 50000,
                cost: 30000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                ingredients: [
                    { id: 1, ingredient_name: 'Bánh mì', quantity: 1, unit: 'cái' },
                    { id: 2, ingredient_name: 'Thịt nguội', quantity: 50, unit: 'g' },
                    { id: 3, ingredient_name: 'Rau sống', quantity: 30, unit: 'g' },
                    { id: 4, ingredient_name: 'Nước sốt', quantity: 10, unit: 'ml' },
                ],
            },
            {
                id: 101,
                name: 'Bánh mì thịt',
                quantity: 1,
                price_at_time: 50000,
                cost: 30000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                ingredients: [
                    { id: 1, ingredient_name: 'Bánh mì', quantity: 1, unit: 'cái' },
                    { id: 2, ingredient_name: 'Thịt nguội', quantity: 50, unit: 'g' },
                    { id: 3, ingredient_name: 'Rau sống', quantity: 30, unit: 'g' },
                    { id: 4, ingredient_name: 'Nước sốt', quantity: 10, unit: 'ml' },
                ],
            },
            {
                id: 101,
                name: 'Bánh mì thịt',
                quantity: 1,
                price_at_time: 50000,
                cost: 30000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                ingredients: [
                    { id: 1, ingredient_name: 'Bánh mì', quantity: 1, unit: 'cái' },
                    { id: 2, ingredient_name: 'Thịt nguội', quantity: 50, unit: 'g' },
                    { id: 3, ingredient_name: 'Rau sống', quantity: 30, unit: 'g' },
                    { id: 4, ingredient_name: 'Nước sốt', quantity: 10, unit: 'ml' },
                ],
            },
            {
                id: 101,
                name: 'Bánh mì thịt',
                quantity: 1,
                price_at_time: 50000,
                cost: 30000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                ingredients: [
                    { id: 1, ingredient_name: 'Bánh mì', quantity: 1, unit: 'cái' },
                    { id: 2, ingredient_name: 'Thịt nguội', quantity: 50, unit: 'g' },
                    { id: 3, ingredient_name: 'Rau sống', quantity: 30, unit: 'g' },
                    { id: 4, ingredient_name: 'Nước sốt', quantity: 10, unit: 'ml' },
                ],
            },
            {
                id: 111,
                name: 'Bánh mì chả',
                quantity: 1,
                price_at_time: 50000,
                cost: 30000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                ingredients: [
                    { id: 1, ingredient_name: 'Bánh mì', quantity: 1, unit: 'cái' },
                    { id: 100, ingredient_name: 'Chả cá', quantity: 50, unit: 'g' },
                    { id: 3, ingredient_name: 'Rau sống', quantity: 30, unit: 'g' },
                    { id: 4, ingredient_name: 'Nước sốt', quantity: 10, unit: 'ml' },
                ],
            },
            {
                id: 102,
                name: 'Nước cam',
                quantity: 1,
                price_at_time: 35000,
                cost: 20000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                ingredients: [
                    { id: 5, ingredient_name: 'Cam tươi', quantity: 2, unit: 'trái' },
                    { id: 6, ingredient_name: 'Đường', quantity: 10, unit: 'g' },
                    { id: 7, ingredient_name: 'Đá viên', quantity: 100, unit: 'g' },
                ],
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
                cost: 60000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                ingredients: [
                    { id: 8, ingredient_name: 'Gạo', quantity: 150, unit: 'g' },
                    { id: 9, ingredient_name: 'Gà chiên', quantity: 1, unit: 'đùi' },
                    { id: 10, ingredient_name: 'Dưa leo', quantity: 20, unit: 'g' },
                    { id: 11, ingredient_name: 'Nước mắm chua ngọt', quantity: 10, unit: 'ml' },
                ],
            },
        ],
        shippingFee: 15000,
        total: 80000,
        payment: {
            method: 'Cash',
            status: 'pending',
        },
        status: 'pending',
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
                cost: 65000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                ingredients: [
                    { id: 12, ingredient_name: 'Bánh phở', quantity: 200, unit: 'g' },
                    { id: 13, ingredient_name: 'Thịt bò tái', quantity: 100, unit: 'g' },
                    { id: 14, ingredient_name: 'Nước dùng', quantity: 300, unit: 'ml' },
                    { id: 15, ingredient_name: 'Hành lá', quantity: 5, unit: 'g' },
                    { id: 16, ingredient_name: 'Ngò rí', quantity: 3, unit: 'g' },
                ],
            },
            {
                id: 105,
                name: 'Trà sữa trân châu',
                quantity: 2,
                price_at_time: 40000,
                cost: 45000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                ingredients: [
                    { id: 17, ingredient_name: 'Trà đen', quantity: 100, unit: 'ml' },
                    { id: 18, ingredient_name: 'Sữa đặc', quantity: 30, unit: 'ml' },
                    { id: 19, ingredient_name: 'Trân châu', quantity: 50, unit: 'g' },
                    { id: 7, ingredient_name: 'Đá viên', quantity: 100, unit: 'g' }, // dùng chung id: 7
                ],
            },
        ],
        shippingFee: 0,
        total: 200000,
        payment: {
            method: 'Visa',
            status: 'paid',
        },
        status: 'pending',
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
                cost: 40000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                ingredients: [
                    { id: 20, ingredient_name: 'Bún', quantity: 150, unit: 'g' },
                    { id: 21, ingredient_name: 'Chả Huế', quantity: 50, unit: 'g' },
                    { id: 13, ingredient_name: 'Thịt bò', quantity: 80, unit: 'g' }, // dùng chung id: 13
                    { id: 14, ingredient_name: 'Nước lèo', quantity: 300, unit: 'ml' }, // chung với "Nước dùng"
                    { id: 22, ingredient_name: 'Hành tím phi', quantity: 5, unit: 'g' },
                ],
            },
            {
                id: 107,
                name: 'Nước suối',
                quantity: 2,
                price_at_time: 10000,
                cost: 7000,
                image: 'https://file.hstatic.net/200000700229/article/ga-ran-vi-kfc-1_0c2450efe15d4b6f9e6bd2637b71d88d.jpg',
                ingredients: [
                    { id: 23, ingredient_name: 'Nước tinh khiết', quantity: 500, unit: 'ml' },
                ],
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

const OrderChef = () => {
    const dispatch = useDispatch();

    const handleOpenViewOrder = (data) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.ORDER_CHEF,
                variant: 'view',
                data: data,
            })
        );
    };

    return (
        <div>
            <Row gutter={[20, 20]}>
                {orders &&
                    orders.length > 0 &&
                    orders.map((order) => (
                        <Col key={order.id} xs={12} md={8} xl={6}>
                            <div
                                className="h-full bg-white rounded-md cursor-pointer"
                                onClick={() => {
                                    handleOpenViewOrder(order);
                                }}
                            >
                                <Badge.Ribbon
                                    text={order.status}
                                    color={order.status == 'pending' ? 'red' : 'purple'}
                                >
                                    <div className="">
                                        <div className="py-3 px-4 font-semibold">#{order.id}</div>
                                        <div className="border-b border-gray-300"></div>
                                        <div className="py-3 px-4">
                                            <p>
                                                <i>Order time: </i>
                                                <b>
                                                    {dayjs(order.createdAt).format(
                                                        'DD/MM/YYYY HH:MM'
                                                    )}
                                                </b>
                                            </p>
                                            <div className="flex items-start justify-start gap-2 mt-1">
                                                <i>Foods:</i>
                                                <div className="flex flex-col">
                                                    {order.items.map((i) => (
                                                        <div key={i.id}>
                                                            <Badge
                                                                status={
                                                                    order.status == 'pending'
                                                                        ? 'warning'
                                                                        : 'processing'
                                                                }
                                                                text={`${i.name} - ${i.quantity}`}
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
