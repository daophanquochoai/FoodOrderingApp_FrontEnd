import { Col, Row } from "antd";
import React from "react";
import imageCenter from "../../../assets/cms-banner-1.webp";
import img_commit_1 from "../../../assets/cms-icon-1_54x.webp";
import img_commit_2 from "../../../assets/cms-icon-2_54x.png";

const ImageTextCommit = () => {
  return (
    <div className="container">
      <div className="w-full block mx-auto py-4">
        <Row className="w-full">
          <Col
            xs={24}
            md={10}
            xl={11}
            className="flex items-center justify-center"
          >
            <div className="w-full h-auto group overflow-hidden">
              <img
                src={imageCenter}
                alt=""
                className="w-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
              />
            </div>
          </Col>

          <Col xs={24} md={14} xl={13}>
            <div className="p-3 xl:pt-10 xl:pl-20 lg:pl-14 md:pl-10 pl-3 pt-0 flex flex-col gap-5">
              <h2 className="font-kanit text-[clamp(24px,3.5vw,50px)] font-medium leading-[50px]">
                Amazing & Quality Food For Your Good Health
              </h2>

              <p className="text-gray-600 text-[clamp(12px,3vw,17px)] tracking-wide text-justify">
                Welcome too restaurant where culinary excellence meets
                hospitality in every dish we serve nestled in the heart of City
                Name our eatery invites you on a journey
              </p>

              <div>
                <Row gutter={[15, 15]}>
                  <Col xs={24} lg={12}>
                    <div className="flex items-center justify-center gap-3">
                      <div className="max-w-[80px] max-h-[80px]">
                        <img
                          src={img_commit_1}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col items-start justify-center">
                        <h3 className="font-kanit text-[clamp(18px,2vw,22px)] font-medium">
                          Best Quality Food
                        </h3>
                        <p className="text-gray-600 text-[clamp(12px,3vw,16px)] tracking-wide text-justify">
                          Our talented chefs craft dish precision
                        </p>
                      </div>
                    </div>
                  </Col>

                  <Col xs={24} lg={12}>
                    <div className="flex items-center justify-center gap-3">
                      <div className="max-w-[80px] max-h-[80px]">
                        <img
                          src={img_commit_2}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col items-start justify-center">
                        <h3 className="font-kanit text-[clamp(18px,2vw,22px)] font-medium">
                          Experience Chefs
                        </h3>
                        <p className="text-gray-600 text-[clamp(12px,3vw,16px)] tracking-wide text-justify">
                          Our talented chefs craft dish precision
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              <button className="text-[clamp(10px,2vw,14px)] btn-orange-to-black w-fit mx-auto md:mx-0 px-4 py-3">
                Order Now
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ImageTextCommit;
