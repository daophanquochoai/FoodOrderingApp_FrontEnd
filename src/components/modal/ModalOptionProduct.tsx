import React from "react";
import ModalBase from "./ModalBase";
import img_hamburger_1 from "../../assets/ham-1.webp";
import { Col, Row } from "antd";
import { ModalOptionProductProps } from "../../type/modal/modal";
import ProductInfo from "../product/ProductInfo";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ModalOptionProduct: React.FC<ModalOptionProductProps> = ({
  isOpen,
  onClose,
}) => {
  // Hàm điều khiển đóng modal
  const handleContentClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.quantity-selector')) {
      return;
    }
    if (target.tagName === "BUTTON" || target.closest('button')) {
      onClose();
      return;
    }
    if (target.tagName === "A" || target.closest('a')) {
      onClose();
      return;
    }
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose}>
      <div onClick={handleContentClick}>
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
            <Link 
              to={"/products/product-name"} 
              className="flex items-center gap-4 mt-10"
            >
              <span className="underline">View Full Product Details</span>
              <FaArrowRight />
            </Link>
          </Col>
        </Row>
      </div>
    </ModalBase>
  );
};

export default ModalOptionProduct;
