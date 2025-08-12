import React from 'react';
import ModalBase from './ModalBase';
import img_hamburger_1 from '../../assets/ham-1.webp';
import { Col, Row } from 'antd';
import ProductInfo from '../product/ProductInfo';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { common, food } from '@/store/reducer';

const ModalOptionProduct: React.FC<any> = (props) => {
    //data
    const { data, type } = props;

    //hook
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // event handling
    const navigateToProductDetail = () => {
        dispatch(common.actions.setHiddenModal(type));
        dispatch(food.actions.setFoodDetail(data));
        navigate(`/products/${data?.id}`);
    };

    return (
        <ModalBase type={type}>
            <div className="bg-white rounded-xl overflow-hidden max-w-4xl mx-auto w-full">
                <Row className="min-h-[400px] max-h-[80vh]">
                    <Col span={24} md={12} className="h-full">
                        <div className="w-full h-full overflow-hidden group">
                            <img
                                src={data.image || img_hamburger_1}
                                alt={data.name}
                                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = img_hamburger_1;
                                }}
                            />
           
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </Col>
                    <Col span={24} md={12} className="flex flex-col h-full">
                        <div className={`flex-1 p-2 md:p-4 overflow-y-auto custom-scrollbar md:max-h-[calc(78vh-80px)] max-h-[calc(45vh-80px)]`}>
                            <ProductInfo />
                        </div>
                        <div className={`p-2 md:p-4 py-0 mt-4 md:mt-2 border-t border-gray-100 flex-shrink-0`}>
                            <button
                                onClick={navigateToProductDetail}
                                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                            >
                                <span className="text-sm">View Full Product Details</span>
                                <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </Col>
                </Row>
            </div>
        </ModalBase>
    );
};

export default ModalOptionProduct;
