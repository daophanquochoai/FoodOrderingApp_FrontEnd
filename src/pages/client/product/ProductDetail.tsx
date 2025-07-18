import React from "react";
import ClientBreadcrumb from "../../../components/breadcrumb/ClientBreadcrumb";
import ProductDisplay from "../../../components/product/ProductDisplay";
import ProductInfo from "../../../components/product/ProductInfo";
import ProductRating from "../../../components/product/ProductRating";
import { Collapse, CollapseProps } from 'antd';
import { TbTruckDelivery, TbTruckReturn } from "react-icons/tb";

const ProductDetail:React.FC = () => {
  const items: CollapseProps['items'] = [
    {
        key: '1',
        label: <span className="font-bold flex items-center gap-3"><TbTruckDelivery className='text-xl' /> Delivery Information</span>,
        children: (
            <div className="py-2">
                <p>Standard Delivery: 2-4 business days</p>
                <p>Express Delivery: Same day delivery for orders placed before 11:00 AM</p>
                <p>Delivery hours: Monday to Friday, 9:00 AM - 9:00 PM</p>
                <p>Weekend Delivery: Saturday and Sunday, 10:00 AM - 8:00 PM</p>
                <p>Free delivery for orders above $30</p>
            </div>
        ),
    },
    {
        key: '2',
        label: <span className="font-bold flex items-center gap-3"><TbTruckReturn className='text-xl' /> Return Policy</span>,
        children: (
            <div className="py-2">
                <p>We strive to ensure customer satisfaction with every order.</p>
                <p>If you're not satisfied with your meal:</p>
                <ul className="list-disc pl-5 mt-2">
                    <li>Contact us within 30 minutes of delivery</li>
                    <li>We offer replacement or refund for quality issues</li>
                    <li>Refunds are processed within 3-5 business days</li>
                    <li>Food quality or temperature issues are eligible for immediate resolution</li>
                </ul>
            </div>
        ),
    },  
  ];

  return (

    <>
      <ClientBreadcrumb title="Cheese Italian Chicken Pizza" items={[{ label: "Home", to: "/" }]} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 px-4 lg:px-12 items-start">
        <div className="p-4 md:sticky top-[110px]">
            <ProductDisplay />
        </div>
        <div className="p-4">
            <ProductInfo data={null} />

            <div className="mt-6">
                <Collapse
                  items={items}
                  expandIconPosition="end"
                  bordered={false}
                  className="custom-collapse"
                  ghost={true}
                  defaultActiveKey={[]}
                />
            </div>
        </div>
      </div>

      <div className="p-4 m-4 lg:m-12">
        <div className="bg-orange-500 rounded-t-md w-[200px] text-white text-center p-3 font-bold">
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