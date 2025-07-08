import { bannerProps } from "../../../defaultValue/home/bannerMain";
import { BannerProps } from "../type";

let defaultValue = bannerProps;

export const bannerSubOrange = (content: any): BannerProps => ({
  ...defaultValue,
  layout: content.layout,
  imageHeight: "21vw",
  wrapperClass: "cursor-pointer group",
  contentWrapperClass:
    "max-w-[65%] px-2 sm:px-2 md:px-4 lg:px-6 xl:px-8 xl:gap-2 lg:gap-1 gap-1",
  title: {
    text: content.title,
    className: "font-playball text-orange-primary text-[clamp(10px,2vw,26px)]",
  },
  subTitle: {
    text: content.subTitle,
    className:
      "font-kanit font-medium leading-none text-[clamp(8px,2.5vw,40px)] uppercase text-black",
  },
  subTitle2: {
    text: content.subTitle2,
    className:
      "font-montserrat font-bold text-orange-primary text-[clamp(8px,2.8vw,45px)] -mt-1 md:-mt-2",
  },
  descriptionPrice: {
    text: `${content.descriptionPrice}`,
    className:
      "font-playball font-medium text-[clamp(10px,2vw,30px)] hidden md:block text-black -mt-1",
  },
  price: {
    text: content.price,
    className:
      "font-montserrat text-orange-500 font-semibold text-[clamp(10px,2vw,40px)]",
  },
  button: {
    text: content.buttonText,
    className:
      "btn-orange-to-black px-2 py-1 text-[clamp(6px,1vw,12px)] -mt-1 sm:mt-0",
    hoverGroup: "group-hover/icon-hover",
  },
  hoverEffect: true,
  iconButtonStyleExtra: "size-2 mb-[1px] md:size-3 mb-[2px]",
});

export const bannerSubYellow = (content: any): BannerProps => ({
  ...defaultValue,
  layout: content.layout,
  imageHeight: "21vw",
  wrapperClass: "cursor-pointer group",
  contentWrapperClass: "max-w-[65%] gap-1 px-2 md:px-4 lg:px-6 xl:px-8",
  title: {
    text: content.title,
    className: "font-playball text-yellow-primary text-[clamp(10px,2vw,26px)]",
  },
  subTitle: {
    text: content.subTitle,
    className:
      "font-kanit font-medium leading-none text-[clamp(10px,2.5vw,40px)] uppercase",
  },
  subTitle2: {
    text: content.subTitle2,
    className:
      "font-montserrat font-bold text-yellow-primary text-[clamp(8px,2.8vw,45px)] -mt-1 md:-mt-2",
  },
  descriptionPrice: {
    text: `${content.descriptionPrice}`,
    className:
      "font-playball font-medium text-[clamp(10px,2vw,30px)] hidden md:block -mt-1",
  },
  price: {
    text: content.price,
    className:
      "font-montserrat text-orange-500 font-semibold text-[clamp(10px,2vw,40px)]",
  },
  button: {
    text: content.buttonText,
    className:
      "btn-yellow-to-black px-2 py-1 text-[clamp(6px,1vw,12px)] -mt-1 sm:mt-0",
    hoverGroup: "group-hover/icon-hover",
  },
  hoverEffect: true,
  iconButtonStyleExtra: "size-2 mb-[1px] md:size-3 mb-[2px]",
});
