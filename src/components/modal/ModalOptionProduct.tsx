import React from 'react';
import ModalBase from './ModalBase';
import img_hamburger_1 from '../../assets/ham-1.webp';
import { Col, Row } from 'antd';
import { ModalOptionProductProps } from '../../type/modal/modal';
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
            <div>
                <Row>
                    <Col span={24} md={12}>
                        <div className="w-full h-full overflow-hidden">
                            <img
                                src={img_hamburger_1}
                                alt="product image"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </Col>
                    <Col span={24} md={12}>
                        <ProductInfo />
                        <p
                            className="flex items-center gap-4 mt-10 cursor-pointer"
                            onClick={navigateToProductDetail}
                        >
                            <span className="underline">View Full Product Details</span>
                            <FaArrowRight />
                        </p>
                    </Col>
                </Row>
            </div>
        </ModalBase>
    );
};

export default ModalOptionProduct;
