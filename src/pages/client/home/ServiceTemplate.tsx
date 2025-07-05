import React, { useEffect, useRef } from "react";
import ServiceCard from "../../../components/card/ServiceCard";

const ServiceTemplate = () => {
  const scrollServiceTemp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollServiceTemp.current;
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

  return (
    <div
      className="flex overflow-y-auto custom-scrollbar"
      ref={scrollServiceTemp}
    >
      <ServiceCard
        image="https://grillfood-demo.myshopify.com/cdn/shop/files/services-1_87x.png?v=1747026133"
        hearder="Fast Food Delivery"
        descript="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
      />
      <ServiceCard
        image="https://grillfood-demo.myshopify.com/cdn/shop/files/services-2_87x.png?v=1747026133"
        hearder="100% Natural Food"
        descript="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
      />
      <ServiceCard
        image="https://grillfood-demo.myshopify.com/cdn/shop/files/services-3_87x.png?v=1747026133"
        hearder="Best Quality Guarantee"
        descript="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
      />
      <ServiceCard
        image="https://grillfood-demo.myshopify.com/cdn/shop/files/services-4_87x.png?v=1747026133"
        hearder="Variety Of Dishes"
        descript="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
      />
    </div>
  );
};

export default ServiceTemplate;
