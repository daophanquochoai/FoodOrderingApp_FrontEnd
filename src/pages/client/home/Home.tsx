import React from 'react';
import {
    BannerCenterHome,
    BannerFooter,
    BannerUnderMarqueeHome,
    CategoryHome,
    DealOfWeekHome,
    ImageTextCommit,
    LastestProductHome,
    MarqueeHome,
    ServiceTemplate,
    SlideMain,
    StaffQuoteHome,
    SubBanner,
} from '../../../components/detailPages/home';

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
