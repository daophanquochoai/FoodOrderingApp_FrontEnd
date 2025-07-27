import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFirst } from '@/store/action/client/voucher/voucher.action';
import { selectFilter, selectVoucher } from '@/store/selector/client/voucher/voucher.selector';
import {
    EStatusVoucher,
    EVoucher,
    Voucher as VoucherType,
} from '@/type/store/client/voucher/voucher.style';
import { checkout, voucher } from '@/store/reducer';
import { selectCart } from '@/store/selector/client/cart/cart.selector';
import { selectInfo } from '@/store/selector/client/account/account.selector';
import { selectDiscountApply } from '@/store/selector/client/checkout/checkout.selector';

const Voucher: React.FC<any> = () => {
    // hook
    const dispatch = useDispatch();

    //selector
    const vouchers = useSelector(selectVoucher);
    const filter = useSelector(selectFilter);
    const cart = useSelector(selectCart);
    const info = useSelector(selectInfo);
    const discountApply = useSelector(selectDiscountApply);

    // useEffect
    useEffect(() => {
        dispatch(
            voucher.actions.setFilter({
                ...filter,
                categoryIds: cart?.cartItems
                    ?.filter((cart) => cart?.foodId?.foodId?.category?.id != null)
                    .map((cart) => {
                        return cart?.foodId?.foodId?.category?.id;
                    }),
                foodIds: cart?.cartItems
                    ?.filter((cart) => cart?.foodId?.foodId?.id != null)
                    .map((cart) => {
                        return cart?.foodId?.foodId?.id;
                    }),
                id: info?.id,
                statusVouchers: ['ACTIVE'],
            })
        );
        dispatch(fetchFirst());
    }, []);
    const handleVoucherSelect = (voucher: number, voucherObj: VoucherType) => {
        if (discountApply === voucher) {
            dispatch(checkout.actions.setDiscountApply(null));
            setError('');
        } else {
            if (isVoucherEligible(voucherObj)) {
                dispatch(checkout.actions.setDiscountApply(voucher));
                setError('');
            } else if (voucherObj.status.toString() == 'DELETE')
                setError('This voucher is not active.');
            else setError('This voucher has expired.');
        }
    };

    const [error, setError] = useState('');

    const isVoucherEligible = (voucher: VoucherType): boolean => {
        return voucher.status.toString() == 'ACTIVE' && new Date(voucher.endDate) > new Date();
    };

    return (
        <div className="flex flex-col gap-4">
            <strong className="text-lg">Voucher</strong>
            <div className="space-y-4">
                {vouchers &&
                    vouchers?.data &&
                    vouchers?.data.map((voucher) => (
                        <div
                            key={voucher.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                                discountApply === voucher.id
                                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                            onClick={() => handleVoucherSelect(voucher.id, voucher)}
                        >
                            <div className="flex items-start space-x-3">
                                <input
                                    type="radio"
                                    name="voucher"
                                    value={voucher.code}
                                    checked={discountApply === voucher.id}
                                    // onChange={() => handleVoucherSelect(voucher.code, voucher)}
                                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <div className="flex-1">
                                    <div className="flex gap-2 items-center mb-1">
                                        <span className="font-semibold text-blue-600">
                                            {voucher.code}
                                        </span>
                                        <span className="text-xs text-white bg-blue-400 rounded px-2 py-0.5">
                                            {voucher.discountType === EVoucher.PERCENT
                                                ? `-${voucher.discountValue}%`
                                                : `-$${voucher.discountValue.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {voucher.desc}
                                    </p>
                                    <span className="text-xs text-gray-400">
                                        Expiration Date:{' '}
                                        {new Date(voucher.endDate).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            {error && <p className="text-sm text-red-500 pl-1">{error}</p>}
        </div>
    );
};

export default Voucher;
