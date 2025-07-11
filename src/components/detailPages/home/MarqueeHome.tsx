import React from "react";

const announcements = [
  "Best Pizza In Town",
  "Special Deal Offer For This Week",
  "New Phenomenon Burger Taste",
  "Start Ordering Now",
];

const MarqueeHome = () => {
  return (
    <div className="w-full overflow-hidden bg-yellow-400 whitespace-nowrap group py-4 my-8">
      <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-fit">
        {[...announcements, ...announcements].map((text, index) => (
          <span key={index} className="mx-6 font-bold text-xl inline-block">
            {text} <span className="ml-12">-</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeHome;
