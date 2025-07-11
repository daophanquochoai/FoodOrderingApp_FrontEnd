export type BannerTextBlock = {
  text: string;
  className?: string;
};

export type BannerProps = {
  image: string;
  imageHeight: string;
  layout?: "left" | "right";
  wrapperClass?: string;
  contentWrapperClass?: string;
  hoverEffect?: boolean;

  title: BannerTextBlock;
  subTitle?: BannerTextBlock;
  subTitle2?: BannerTextBlock;
  descriptionPrice?: BannerTextBlock;
  price?: BannerTextBlock;
  description?: BannerTextBlock;

  button?: {
    text: string;
    className?: string;
    hoverGroup?: string;
  };

  iconButtonStyleExtra?: string;
};
