import React from "react";
import SlideMain from "./SlideMain";
import SubBanner from "./SubBanner";
import CategoryHome from "./CategoryHome";
import ImageTextCommit from "./ImageTextCommit";
import LastestProductHome from "./LastestProductHome";
import BannerCenterHome from "./BannerCenterHome";
import ServiceTemplate from "./ServiceTemplate";
import DealOfWeekHome from "./DealOfWeekHome";
import MarqueeHome from "./MarqueeHome";
import StaffQuoteHome from "./StaffQuoteHome";
import BannerUnderMarqueeHome from "./BannerUnderMarqueeHome";
import BannerFooter from "./BannerFooter";

const Home: React.FC = () => {
  return (
    <div>
      <SlideMain />
      <SubBanner />
      <CategoryHome />
      <ImageTextCommit />
      <LastestProductHome />
      <BannerCenterHome />
      <ServiceTemplate />
      <DealOfWeekHome />
      <MarqueeHome />
      <BannerUnderMarqueeHome />
      <StaffQuoteHome />
      <BannerFooter />
    </div>
  );
};

export default Home;
