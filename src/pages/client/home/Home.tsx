import React from "react";
import SlideMain from "./SlideMain";
import SubBanner from "./SubBanner";
import CategoryHome from "./CategoryHome";
import ImageTextCommit from "./ImageTextCommit";
import LastestProductHome from "./LastestProductHome";

const Home: React.FC = () => {
  return (
    <div>
      <SlideMain />
      <SubBanner />
      <CategoryHome />
      <ImageTextCommit />
      <LastestProductHome />
    </div>
  );
};

export default Home;
