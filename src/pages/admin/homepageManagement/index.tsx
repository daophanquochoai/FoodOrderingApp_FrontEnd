import ShopByCategories from "./ShopByCategories";
import LatestProduct from "./LatestProduct";
import DealOfTheWeek from "./DealOfTheWeek";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

const HomepageManagement = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Homepage Management</h1>
            <div className="grid grid-cols-1 gap-4 p-6">
                <div className="border-2 border-black bg-gray-200 flex p-3 justify-center items-center">
                    <p className="font-bold">Header</p>
                </div>
                <div className="border-2 border-black bg-red-100 flex p-12 justify-center items-center">
                    <p className="font-bold">Carousel</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="border-2 border-black bg-orange-100 flex p-6 justify-center items-center">
                        <p className="font-bold">Banner 1</p>
                    </div>
                    <div className="border-2 border-black bg-orange-100 flex p-6 justify-center items-center">
                        <p className="font-bold">Banner 2</p>
                    </div>
                    <div className="border-2 border-black bg-orange-100 flex p-6 justify-center items-center">
                        <p className="font-bold">Banner 3</p>
                    </div>
                </div>
                <div
                    className="relative group border-2 border-black bg-green-100 flex p-6 justify-center items-center transition-transform duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => navigate('/admin/homepage-management/shop-by-categories')}
                >
                    <p className="font-bold z-10">Shop By Categories</p>
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex gap-2 justify-center items-center transition-opacity duration-300 z-20">
                        <EditOutlined className="text-white font-semibold text-lg" />
                        <p className="text-white font-semibold text-lg">Edit</p>
                    </div>
                </div>
                <div className="border-2 border-black bg-blue-100 flex p-8 justify-center items-center">
                    <p className="font-bold">Hero Section 1</p>
                </div>
                <div 
                    onClick={() => navigate('/admin/homepage-management/latest-products')}
                    className="relative group border-2 border-black bg-green-100 flex p-6 justify-center items-center transition-transform duration-300 hover:scale-105 cursor-pointer"
                >
                    <p className="font-bold z-10">Latest Products</p>
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex gap-2 justify-center items-center transition-opacity duration-300 z-20">
                        <EditOutlined className="text-white font-semibold text-lg" />
                        <p className="text-white font-semibold text-lg">Edit</p>
                    </div>
                </div>
                <div className="border-2 border-black bg-blue-100 flex p-8 justify-center items-center">
                    <p className="font-bold">Hero Section 2</p>
                </div>
                <div onClick={() => navigate('/admin/homepage-management/deal-of-the-week')}
                    className="relative group border-2 border-black bg-green-100 flex p-6 justify-center items-center transition-transform duration-300 hover:scale-105 cursor-pointer"
                >
                    <p className="font-bold z-10">Deal Of The Week</p>
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex gap-2 justify-center items-center transition-opacity duration-300 z-20">
                        <EditOutlined className="text-white font-semibold text-lg" />
                        <p className="text-white font-semibold text-lg">Edit</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-black bg-orange-100 flex p-6 justify-center items-center">
                        <p className="font-bold">Banner 4</p>
                    </div>
                    <div className="border-2 border-black bg-orange-100 flex p-6 justify-center items-center">
                        <p className="font-bold">Banner 5</p>
                    </div>
                </div>
                <div className="border-2 border-black bg-yellow-100 flex p-6 justify-center items-center">
                    <p className="font-bold">Testimonial Section</p>
                </div>
                <div className="border-2 border-black bg-blue-100 flex p-12 justify-center items-center">
                    <p className="font-bold">Hero Section 3</p>
                </div>
                <div className="border-2 border-black bg-gray-200 flex p-4 justify-center items-center">
                    <p className="font-bold">Footer</p>
                </div>
            </div>
        </div>
    );
};

export default HomepageManagement;