import React from "react";
import ModalBase from "./ModalBase";
import img_hamburger_1 from "../../assets/ham-1.webp";
import { Col, Row } from "antd";
import { ModalOptionProductProps } from "../../type/modal/modal";

const ModalOptionProduct: React.FC<ModalOptionProductProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <ModalBase isOpen={isOpen} onClose={onClose}>
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
            <div className="flex flex-col ml-3">
              <p className="font-kanit text-2xl font-medium">Cheeseburger</p>
            </div>
          </Col>
        </Row>
      </div>
    </ModalBase>
  );
};

export default ModalOptionProduct;
