import React, { useEffect, useState } from "react";
import image_1 from "../../../assets/img-1.webp";
import { Col, Row } from "antd";

import { bannerProps } from "../../../defaultValue/home/bannerMain";
import {
  BannerProps,
  GenericBanner,
  getBannerStyleByType,
} from "../../../components/banner";

// chỉ 1 banner
const dataFake = {
  type: "banner_main",
  image:
    "http://res.cloudinary.com/dl54jz2u3/image/upload/v1751727561/vz9pxj7ltdihodimakyz.webp",
  title: "Delicious food",
  subTitle: "Special Deal Offer For This Week!",
  descriptionPrice: "Two varieties of taco only",
  price: "$59",
  layout: "left",
  description:
    "The origins of the taco are not precisely known, and etymologies for the culinary usage of the word are generally theoretical.",
  buttonText: "Order now",
};

const BannerFooter = () => {
  const [bannerProp, setBannerProp] = useState<BannerProps>(bannerProps);

  useEffect(() => {
    const fetchBanners = () => {
      const style = getBannerStyleByType(dataFake.type, dataFake);
      const prop: BannerProps = { ...style, image: dataFake.image };
      setBannerProp(prop);
    };

    fetchBanners();
  }, []);

  return (
    <div>
      <Row>
        <Col md={12} min-2000={4}>
          <div className="h-auto md:w-full md:h-full w-screen overflow-hidden group">
            <img
              src={image_1}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1s] ease-linear"
            />
          </div>
        </Col>
        <Col md={12} min-2000={20}>
          <GenericBanner {...bannerProp} />
        </Col>
      </Row>
    </div>
  );
};

export default BannerFooter;
