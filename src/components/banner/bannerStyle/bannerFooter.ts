import { bannerProps } from "../../../defaultValue/home/bannerMain";
import { BannerProps } from "../../../type";


let defaultValue = bannerProps;

export const bannerFooter = (content: any): BannerProps => ({
  ...defaultValue,
  wrapperClass: "h-[250px] md:w-full md:h-full w-screen",
  imageHeight: "",
  contentWrapperClass:
    "absolute inset-0 w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 xl:gap-3 lg:gap-2 gap-3",
  title: {
    text: content.title,
    className: "font-playball text-yellow-primary text-[clamp(14px,4vw,50px)]",
  },
  layout: content.layout,
  subTitle: {
    text: content.subTitle,
    className:
      "font-kanit font-medium text-[clamp(14px,4.5vw,60px)] leading-tight",
  },
  descriptionPrice: {
    text: `${content.descriptionPrice}`,
    className:
      "font-montserrat font-semibold text-yellow-primary text-[clamp(12px,2.3vw,30px)]",
  },
  price: {
    text: `${content.price}`,
    className: "text-[clamp(14px,3vw,40px)]",
  },
  description: {
    text: content.description,
    className:
      "font-montserrat font-medium text-[clamp(12px,1.4vw,18px)] leading-[1.7]",
  },
  button: {
    text: content.buttonText,
    className: "btn-yellow-to-white px-3 py-2 text-[clamp(10px,1vw,18px)]",
    hoverGroup: "group-hover",
  },
});
