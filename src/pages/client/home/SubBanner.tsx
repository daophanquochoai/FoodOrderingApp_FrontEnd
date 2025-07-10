import React, { useEffect, useRef, useState } from "react";

import {
  BannerProps,
  GenericBanner,
  getBannerStyleByType,
} from "../../../components/banner";

const dataSubFake = [
  {
    type: "banner_sub",
    variant: "yellow-text",
    image:
      "https://grillfood-demo.myshopify.com/cdn/shop/files/sub-banner-1.jpg?v=1746877062",
    title: "Delicious Pizza",
    subTitle: "cheese fried",
    subTitle2: "Italian Pizza",
    descriptionPrice: "Today Best Deals!",
    buttonText: "Order now",
    layout: "left",
  },
  {
    type: "banner_sub",
    variant: "yellow-text",
    image:
      "https://grillfood-demo.myshopify.com/cdn/shop/files/sub-banner-2.jpg?v=1746877062",
    title: "Classic Chicken",
    subTitle: "cheese fried",
    subTitle2: "Chicken!",
    descriptionPrice: "Special Just For You",
    buttonText: "Order now",
    layout: "left",
  },
  {
    type: "banner_sub",
    variant: "orange-text",
    image:
      "https://grillfood-demo.myshopify.com/cdn/shop/files/sub-banner-3.jpg?v=1746877062",
    title: "Corniche Taco",
    subTitle: "beef tomato",
    subTitle2: "With Taco!",
    descriptionPrice: "Special Just For You",
    buttonText: "Order now",
    layout: "left",
  },
];

const SubBanner = () => {
  const scrollSubBanner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollSubBanner.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const [subBanners, setSubBanners] = useState<BannerProps[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const final = dataSubFake.map((item: any) => {
        const style = getBannerStyleByType(item.type, item, item.variant);
        return {
          ...style,
          image: item.image, // phần dùng chung
        } as BannerProps;
      });

      setSubBanners(final);
    };

    fetchBanners();
  }, []);

  return (
    <div
      ref={scrollSubBanner}
      className="mt-2 w-screen flex flex-row gap-2 overflow-auto custom-scrollbar"
    >
      {subBanners?.map((props, index) => (
        <div
          key={index}
          className="bg-gray-200 overflow-hidden cursor-pointer relative group"
          style={{ width: "40vw", maxHeight: "400px", flexShrink: 0 }}
        >
          <GenericBanner key={index} {...props} />
        </div>
      ))}
    </div>
  );
};

export default SubBanner;
