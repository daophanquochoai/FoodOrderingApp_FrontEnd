import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchFoodById } from '@/store/action/client/collection/collection.action';
import { selectFoodDetail } from '@/store/selector/client/collection/food.selector';
import burger from '../../../assets/burger.jpg';
import { TbTruckDelivery, TbTruckReturn } from 'react-icons/tb';
import { Collapse, CollapseProps } from 'antd';
import ClientBreadcrumb from '../../../components/breadcrumb/ClientBreadcrumb';
import ProductDisplay from '../../../components/product/ProductDisplay';
import ProductInfo from '../../../components/product/ProductInfo';
import ProductRating from '../../../components/product/ProductRating';

const ProductDetail: React.FC = () => {
    //hook
    const param = useParams();
    const dispatch = useDispatch();
    //selector
    const fooDetail = useSelector(selectFoodDetail);
    useEffect(() => {
        if (param?.id != null) {
            dispatch(fetchFoodById(param?.id));
        }
    }, [param.id]);
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: (
                <span className="font-bold flex items-center gap-3">
                    <TbTruckDelivery className="text-xl" /> Delivery Information
                </span>
            ),
            children: (
                <div className="py-2">
                    <p>Standard Delivery: 2-4 business days</p>
                    <p>Express Delivery: Same day delivery for orders placed before 11:00 AM</p>
                    <p>Delivery hours: Monday to Friday, 9:00 AM - 9:00 PM</p>
                    <p>Weekend Delivery: Saturday and Sunday, 10:00 AM - 8:00 PM</p>
                    <p>Free delivery for orders above $30</p>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <span className="font-bold flex items-center gap-3">
                    <TbTruckReturn className="text-xl" /> Return Policy
                </span>
            ),
            children: (
                <div className="py-2">
                    <p>We strive to ensure customer satisfaction with every order.</p>
                    <p>If you're not satisfied with your meal:</p>
                    <ul className="list-disc pl-5 mt-2">
                        <li>Contact us within 30 minutes of delivery</li>
                        <li>We offer replacement or refund for quality issues</li>
                        <li>Refunds are processed within 3-5 business days</li>
                        <li>
                            Food quality or temperature issues are eligible for immediate resolution
                        </li>
                    </ul>
                </div>
            ),
        },
    ];

    return (
        <>
            <ClientBreadcrumb
                title="Cheese Italian Chicken Pizza"
                items={[{ label: 'Home', to: '/' }]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 px-4 lg:px-12 items-start">
                <div className="p-4 md:sticky top-[110px]">
                    {/* <ProductDisplay /> */}
                    <img
                        src={fooDetail?.image || burger}
                        alt="category_image"
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-[750ms]"
                        onError={(e) => {
                            e.currentTarget.onerror = null; // tránh loop vô hạn
                            e.currentTarget.src = burger;
                        }}
                    />
                </div>
                <div className="p-4">
                    <ProductInfo />
                </div>
            </div>

            <div className="p-4 m-4 lg:m-12">
                <div className="bg-orange-500 rounded-t-md w-[200px] text-white text-center p-3 font-bold">
                    <p>DESCRIPTION</p>
                </div>
                <div className="p-6 bg-white rounded-b-md shadow-lg flex flex-col gap-4">
                    <strong className="text-2xl">About this item</strong>
                    <p>{fooDetail?.desc || `Haven't Description`}</p>
                </div>
            </div>

            {/* <div className="p-4 m-4 lg:m-12">
                <div className="bg-yellow-500 rounded-t-md w-[200px] text-white text-center p-3 font-bold">
                    <p>RATING</p>
                </div>
                <div className="p-6 bg-white rounded-b-md shadow-lg flex flex-col gap-4">
                    <ProductRating />
                </div>
            </div> */}
        </>
    );
};

export default ProductDetail;
