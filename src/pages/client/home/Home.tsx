import React from "react";
import bannerImg from "../../../assets/Food-Web-Banner-18.jpg";

const Home: React.FC = () => {
  return (
    <div className="h-[1200px] bg-gray-200 mt-[-110px]">
      <img
        src={bannerImg}
        alt="Full screen"
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default Home;
