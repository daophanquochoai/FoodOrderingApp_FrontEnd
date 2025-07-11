import React, { useEffect, useState } from "react";
import { bannerProps } from "../../../defaultValue/home/bannerMain";
import {
  GenericBanner,
  getBannerStyleByType,
} from "../../../components/banner";
import { BannerProps } from "../../../type";

// chỉ 1 banner
const dataFake = {
  type: "banner_main",
  image:
    "http://res.cloudinary.com/dl54jz2u3/image/upload/v1751704438/vclxcmrstintjzpnoxgf.webp",
  title: "Delicious Pizza",
  subTitle: "Schezwan Corn And Capsicum Pizza",
  descriptionPrice: "Double Cheese Pizza only",
  price: "$99",
  layout: "left",
  description:
    "Enjoy double portions of delicious mozzarella cheese Crispy paneer,onion,green capsicum.",
  buttonText: "Order now",
};

const BannerCenterHome = () => {
  const [bannerProp, setBannerProp] = useState<BannerProps>(bannerProps);

  useEffect(() => {
    const fetchBanners = () => {
      const style = getBannerStyleByType(dataFake.type, dataFake);
      const prop: BannerProps = { ...style, image: dataFake.image };
      setBannerProp(prop);
    };

    fetchBanners();
  }, []);

  return <GenericBanner {...bannerProp} />;
};

export default BannerCenterHome;
