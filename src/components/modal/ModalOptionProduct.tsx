import React from "react";
import { ModalOptionProductProps } from "./type";
import ModalBase from "./ModalBase";
import { Col, Row } from "antd";

const ModalOptionProduct: React.FC<ModalOptionProductProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  return (
    <ModalBase isOpen={isOpen} onClose={onClose}>
      <div>
        <Row>
          <Col span={24} md={12}>
            <div className="w-full h-full overflow-hidden">
              <img
                src={product?.image}
                alt="product image"
                className="w-full h-auto object-cover"
              />
            </div>
          </Col>
          <Col span={24} md={12}>
            <div className="flex flex-col">
              <p className="font-kanit text-xl font-medium">{product.name}</p>
            </div>
          </Col>
        </Row>
      </div>
    </ModalBase>
  );
};

export default ModalOptionProduct;
