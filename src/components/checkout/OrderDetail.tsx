import { checkout } from '@/store/reducer';
import { selectCart } from '@/store/selector/client/cart/cart.selector';
import {
    selectCheckout,
    selectDiscountApply,
    selectPoint,
    selectShip,
    selectSubTotal,
    selectTotal,
} from '@/store/selector/client/checkout/checkout.selector';
import { selectVoucher } from '@/store/selector/client/voucher/voucher.selector';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const OrderDetail: React.FC<any> = () => {
    // hook
    const dispatch = useDispatch();

    // selector
    const cart = useSelector(selectCart);
    const checkoutData = useSelector(selectCheckout);
    const discountApply = useSelector(selectDiscountApply);
    const voucher = useSelector(selectVoucher);
    const point = useSelector(selectPoint);
    const total = useSelector(selectTotal);
    const ship = useSelector(selectShip);
    const subTotal = useSelector(selectSubTotal);

    // state
    const [discount, setDiscount] = useState<any>({
        value: 0,
        voucher: null,
    });

    useEffect(() => {
        if (cart?.cartItems && cart?.cartItems.length > 0) {
            dispatch(
                checkout.actions.setSubTotal(
                    cart?.cartItems.reduce(
                        (sum, item) =>
                            sum +
                            item.quantity *
                                ((item?.foodId?.price * (100 - item?.foodId?.discount)) / 100),
                        0
                    ) + 10000
                )
            );
        } else {
            dispatch(checkout.actions.setSubTotal(0));
        }
        if (checkoutData) {
            const ship =
                checkoutData?.ship_fee?.baseFee +
                checkoutData?.ship_fee?.feePerKm +
                checkoutData?.ship_fee?.rushHourFee;
            dispatch(checkout.actions.setFeeShip(ship > subTotal ? subTotal : ship));
        } else {
            dispatch(checkout.actions.setFeeShip(0));
        }

        if (voucher != null && voucher?.data?.length > 0 && discountApply != null) {
            const discountUsing = voucher?.data?.filter((i) => i.id === discountApply)[0];
            const totalActual = subTotal - ship - point > 0 ? subTotal - ship - point : 0;
            if (discountUsing) {
                if (discountUsing.discountType.toString() == 'PERCENT') {
                    let ability = (totalActual * discountUsing.discountValue) / 100;

                    if (ability > discountUsing.discountValue) {
                        ability = discountUsing.discountValue;
                    }
                    if (ability > totalActual) {
                        ability = totalActual;
                    }
                    setDiscount({
                        value: ability,
                        voucher: discountUsing,
                    });
                } else {
                    setDiscount({
                        value:
                            discountUsing.discountValue > totalActual
                                ? totalActual
                                : discountUsing.discountValue,
                        voucher: discountUsing,
                    });
                }
            }
        } else {
            setDiscount({
                value: 0,
                voucher: null,
            });
        }

        dispatch(
            checkout.actions.setTotal(
                subTotal - ship - point - discount?.value > 0
                    ? subTotal - ship - point - discount?.value
                    : 0
            )
        );
    }, [cart, checkoutData, point, discountApply]);

    return (
        <div className="xl:w-2/3">
            <ul className="space-y-4">
                {cart?.cartItems &&
                    cart?.cartItems
                        .filter((item) => item.isActive)
                        .map((item) => (
                            <li key={item.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="relative mr-4">
                                        <img
                                            src={item?.foodId?.foodId?.image}
                                            alt={item?.foodId?.foodId?.name}
                                            style={{ width: 60, height: 60, objectFit: 'cover' }}
                                            className="border border-gray-400 rounded-md"
                                        />
                                        <span
                                            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                                            style={{ fontSize: 12 }}
                                        >
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <p>
                                        {item?.foodId?.foodId?.name} - {item?.foodId?.sizeId?.name}
                                    </p>
                                </div>
                                <p>
                                    {(item?.foodId?.price * (100 - item?.foodId?.discount)) / 100}
                                </p>
                            </li>
                        ))}
            </ul>
            <div className="flex items-center justify-between mt-8">
                <p>
                    Subtotal · {cart?.cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                </p>
                <p>${subTotal}</p>
            </div>
            {discount?.voucher && (
                <div className="flex items-center justify-between mt-2 text-green-600">
                    <div className="flex items-center">
                        <p>Voucher discount</p>
                        {discount?.voucher && (
                            <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {discount?.voucher?.code}
                            </span>
                        )}
                    </div>
                    <p>-${discount?.value ? discount?.value?.toFixed(2) : 0}</p>
                </div>
            )}
            {point > 0 && (
                <div className="flex items-center justify-between mt-2 text-purple-600">
                    <div className="flex items-center">
                        <p>Points discount</p>
                        <span className="ml-2 bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {point.toLocaleString()} points
                        </span>
                    </div>
                    <p>-${point ? point.toFixed(2) : 0}</p>
                </div>
            )}
            <div className="flex items-center justify-between mt-2">
                <p>Shipping</p>
                <p>${ship}</p>
            </div>
            <div className="flex items-center justify-between mt-8">
                <strong className="text-lg">Total</strong>
                <div className="flex gap-2 items-center">
                    <p className="text-sm pt-1">USD</p>
                    <strong className="text-lg">
                        $
                        {(total - ship - point - discount?.value > 0
                            ? total - ship - point - discount?.value
                            : 0
                        ).toFixed(2)}
                    </strong>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
