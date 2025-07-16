import React from "react";
import ClientBreadcrumb from "../../../components/breadcrumb/ClientBreadcrumb";
import ProductDisplay from "../../../components/product/ProductDisplay";
import ProductInfo from "../../../components/product/ProductInfo";
import ProductRating from "../../../components/product/ProductRating";

const ProductDetail:React.FC = () => {

  return (

    <>
      <ClientBreadcrumb title="Cheese Italian Chicken Pizza" items={[{ label: "Home", to: "/" }]} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 px-4 lg:px-12 items-start mb-16">
        <div className="p-4 md:sticky top-[110px]">
            <ProductDisplay />
        </div>
        <div className="p-4">
            <ProductInfo />
        </div>
      </div>

      <div className="p-4 m-4 lg:m-12">
        <div className="bg-orange-500 rounded-t-md w-[200px] text-white text-center p-3 font-bold">
            <p>DESCRIPTION</p>
        </div>
        <div className="p-6 bg-white rounded-b-md shadow-lg flex flex-col gap-4">
            <strong className="text-2xl">About this item</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>

      <div className="p-4 m-4 lg:m-12">
        <div className="bg-yellow-500 rounded-t-md w-[200px] text-white text-center p-3 font-bold">
            <p>RATING</p>
        </div>
        <div className="p-6 bg-white rounded-b-md shadow-lg flex flex-col gap-4">
          <ProductRating />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;