import React, { useEffect } from 'react';
import ClientBreadcrumb from '../../../components/breadcrumb/ClientBreadcrumb';
import ProductInfo from '../../../components/product/ProductInfo';
import ProductRating from '../../../components/product/ProductRating';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchFoodById } from '@/store/action/client/collection/collection.action';
import { selectFoodDetail } from '@/store/selector/client/collection/food.selector';
import burger from '../../../assets/burger.jpg';

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

    return (
        <>
            <ClientBreadcrumb
                title="Cheese Italian Chicken Pizza"
                items={[{ label: 'Home', to: '/' }]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 px-4 lg:px-12 items-start mb-16">
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

            <div className="p-4 m-4 lg:m-12">
                <div className="bg-yellow-500 rounded-t-md w-[200px] text-white text-center p-3 font-bold">
                    <p>RATING</p>
                </div>
                <div className="p-6 bg-white rounded-b-md shadow-lg flex flex-col gap-4">
                    <ProductRating />
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
