import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { Select, Divider, Radio, Space, InputNumber, Button, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined, IdcardOutlined } from "@ant-design/icons";

const voucherList = [
    {
        id: "1",
        code: "BESTBURGER",
        description: "10% off for your first burger order!",
        type: "percentage",
        value: 10,
        maxDiscount: 4,
        maxUsage: 100,
        usedCount: 50,
        startDate: "2024-01-01",
        endDate: "2025-12-31",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
    },
    {
        id: "2",
        code: "WELCOME",
        description: "Welcome voucher for new users.",
        type: "fixed",
        value: 2,
        maxDiscount: 2,
        maxUsage: 100,
        usedCount: 90,
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
    },
    {
        id: "3",
        code: "COMBOFAMILY",
        description: "10% off on family combo orders!",
        type: "percentage",
        value: 10,
        maxDiscount: 10,
        maxUsage: 50,
        usedCount: 20,
        startDate: "2024-01-01",
        endDate: "2025-12-31",
        isActive: false,
        createdAt: "2024-01-01T00:00:00Z",
    }
];

const foodList = [
    {
        food_id: "1",
        food_name: "Cheeseburger",
        food_image: "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4="
    },
    {
        food_id: "2",
        food_name: "French Fries",
        food_image: "https://grillfood-demo.myshopify.com/cdn/shop/files/18_70bca4a1-06fd-4e2c-89aa-c90d291cffa4.jpg?v=1746869491&width=713"
    },
    {
        food_id: "3",
        food_name: "Chicken Nuggets",
        food_image: "https://grillfood-demo.myshopify.com/cdn/shop/files/4_f05eb882-424b-41e4-958c-fff1757c2958.jpg?v=1746869562&width=1206"
    },
    {
        food_id: "4",
        food_name: "Coca-Cola",
        food_image: "https://grillfood-demo.myshopify.com/cdn/shop/files/2.jpg?v=1746869562&width=713"
    }
];

const categoryList = [
    {
        category_id: "1",
        category_name: "Family Combos",
        category_image: "https://vnsupermark.com/uploads/catalog/8ea4d4e682f1ff9f2e49b90bb3cd4f90-acb65f540b.png"
    },
    {
        category_id: "2",
        category_name: "2 Person Combos",
        category_image: "https://www.borenos.com/wp-content/uploads/2018/11/2-Person-Combo-Meal_4.3.png"
    },
    {
        category_id: "3",
        category_name: "Burgers",
        category_image: "https://grillfood-demo.myshopify.com/cdn/shop/files/3_733b458a-5803-407a-b468-29082f2d8e37.jpg?v=1746868484&width=713"
    },
    {
        category_id: "4",
        category_name: "Pizza",
        category_image: "https://grillfood-demo.myshopify.com/cdn/shop/files/8_7db4be71-b67b-427f-96b4-5cdf4ddc491b.jpg?v=1746868484&width=713"
    },];

const ExportVoucher = () => {
    const navigate = useNavigate();
    const [selectedVoucher, setSelectedVoucher] = useState<any>(null);
    const [applicationType, setApplicationType] = useState<string>("all");
    const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [distributionMethod, setDistributionMethod] = useState<string>("direct");
    const [userTargetingType, setUserTargetingType] = useState<string>("all");
    const [timeUnit, setTimeUnit] = useState<string>("days");
    const [timeValue, setTimeValue] = useState<number>(30);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleVoucherSelect = (voucherId: string) => {
        const selected = voucherList.find(v => v.id === voucherId);
        setSelectedVoucher(selected);
    };

    const handleApplicationTypeChange = (e: any) => {
        setApplicationType(e.target.value);
        setSelectedFoods([]);
        setSelectedCategories([]);
    };

    const handleFoodSelect = (values: string[]) => {
        setSelectedFoods(values);
    };

    const handleCategorySelect = (values: string[]) => {
        setSelectedCategories(values);
    };

    const handleDistributionMethodChange = (e: any) => {
        setDistributionMethod(e.target.value);
    };

    const handleUserTargetingChange = (e: any) => {
        setUserTargetingType(e.target.value);
    };

    const handleTimeUnitChange = (e: any) => {
        setTimeUnit(e.target.value);
    };
    
    const handleTimeValueChange = (value: number | null) => {
        if (value !== null) {
            setTimeValue(value);
        }
    };

    const isSubmitDisabled = () => {
        if (!selectedVoucher) return true;
        
        if (applicationType === "products" && selectedFoods.length === 0) return true;
        if (applicationType === "categories" && selectedCategories.length === 0) return true;
        
        if (distributionMethod === "direct") {
            if (userTargetingType === "specific" && (!timeValue || timeValue <= 0)) return true;
        }
        
        return isLoading;
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log(`Voucher ${selectedVoucher.code} exported successfully`);

            navigate('/admin/voucher-management');
        } catch (error) {
            console.error('Export Failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative">
            <div className="absolute top-0 left-0">
                <button
                    onClick={() => navigate(`/admin/voucher-management`)}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-white hover:bg-gray-50 rounded shadow"
                >
                    <IoMdArrowBack /> Back
                </button>
            </div>
            <div className="pt-12">
                <h1 className="text-2xl font-bold mb-4">Export Voucher</h1>
                <div className="bg-white rounded-md p-4 border border-gray-300">
                    <form>
                        <div className="mb-6">
                            <h2 className="text-lg font-medium mb-4">1. Select Voucher</h2>
                            <Select
                                placeholder="Search and select a voucher"
                                showSearch
                                optionFilterProp="children"
                                onChange={handleVoucherSelect}
                                filterOption={(input, option) =>
                                    (option?.label?.toString().toLowerCase() ?? "").includes(input.toLowerCase())
                                }
                                options={voucherList.map(voucher => ({
                                    value: voucher.id,
                                    label: `${voucher.code} - ${voucher.description}`,
                                }))}
                                className="w-full mb-6"
                                size="large"
                            />
                        </div>

                        {selectedVoucher && (
                            <>
                                <Divider />
                                <div className="mb-6">
                                    <h2 className="text-lg font-medium mb-4">2. Select Application Scope</h2>
                                    <Radio.Group onChange={handleApplicationTypeChange} value={applicationType}>
                                        <Space direction="vertical">
                                            <Radio value="all">Apply to all products</Radio>
                                            <Radio value="products">Apply to specific products</Radio>
                                            <Radio value="categories">Apply to specific categories</Radio>
                                        </Space>
                                    </Radio.Group>

                                    {applicationType === "products" && (
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            placeholder="Select products"
                                            value={selectedFoods}
                                            style={{ width: '100%' }}
                                            onChange={handleFoodSelect}
                                            optionFilterProp="label"
                                            filterOption={(input, option) =>
                                                (option?.label?.toString().toLowerCase() ?? "").includes(input.toLowerCase())
                                            }
                                            options={foodList.map(food => ({ 
                                                value: food.food_id,
                                                label: food.food_name,
                                            }))}
                                            optionRender={(option) => {
                                                const food = foodList.find(f => f.food_id === option.value);
                                                return (
                                                    <div className="flex items-center">
                                                        <img 
                                                            src={food?.food_image} 
                                                            alt={food?.food_name}
                                                            className="w-8 h-8 object-cover mr-2 rounded-md"
                                                        />
                                                        <span>{food?.food_name}</span>
                                                    </div>
                                                );
                                            }}
                                            className="w-full mt-4"
                                            size="large"
                                        />
                                    )}

                                    {applicationType === "categories" && (
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            placeholder="Select categories"
                                            value={selectedCategories}
                                            style={{ width: '100%' }}
                                            onChange={handleCategorySelect}
                                            optionFilterProp="label"
                                            filterOption={(input, option) =>
                                                (option?.label?.toString().toLowerCase() ?? "").includes(input.toLowerCase())
                                            }
                                            options={categoryList.map(category => ({ 
                                                value: category.category_id,
                                                label: category.category_name,
                                            }))}
                                            optionRender={(option) => {
                                                const category = categoryList.find(c => c.category_id === option.value);
                                                return (
                                                    <div className="flex items-center">
                                                        <img 
                                                            src={category?.category_image} 
                                                            alt={category?.category_name}
                                                            className="w-8 h-8 object-cover mr-2 rounded-md"
                                                        />
                                                        <span>{category?.category_name}</span>
                                                    </div>
                                                );
                                            }}
                                            className="w-full mt-4"
                                            size="large"
                                        />
                                    )}

                                    {applicationType === "all" && (
                                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mt-4">
                                        <p className="text-blue-800">
                                            This voucher will be applied to all products in the system.
                                        </p>
                                    </div>
                                )}
                                </div>

                                <Divider />

                                <div className="mb-6">
                                    <h2 className="text-lg font-medium mb-4">3. Distribution Method</h2>
                                    <Radio.Group onChange={handleDistributionMethodChange} value={distributionMethod}>
                                        <Space direction="vertical">
                                            <Radio value="generate">
                                                <div className="flex items-center">
                                                    <IdcardOutlined className="mr-2" />
                                                    <span>Export Standalone Voucher Codes</span>
                                                    <Tooltip title="Export voucher codes that aren't linked to specific accounts and can be distributed manually via email, print, etc.">
                                                        <InfoCircleOutlined className="ml-2 text-gray-400" />
                                                    </Tooltip>
                                                </div>
                                            </Radio>
                                            <Radio value="direct">
                                                <div className="flex items-center">
                                                    <UserOutlined className="mr-2" />
                                                    <span>Direct to User Accounts</span>
                                                    <Tooltip title="Automatically distribute vouchers to user accounts based on specified criteria">
                                                        <InfoCircleOutlined className="ml-2 text-gray-400" />
                                                    </Tooltip>
                                                </div>
                                            </Radio>
                                        </Space>
                                    </Radio.Group>

                                    {distributionMethod === "generate" && (
                                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mt-4">
                                        <p className="text-blue-800">
                                            This voucher will be exported as standalone codes that can be distributed through any channel.
                                        </p>
                                    </div>
                                    )}

                                    {distributionMethod === "direct" && (
                                        <div className="mt-4 pl-6 border-l-2 border-gray-200">
                                            <h3 className="font-medium mb-3">User Targeting:</h3>
                                            <Radio.Group onChange={handleUserTargetingChange} value={userTargetingType} className="mb-4">
                                                <Space direction="vertical">
                                                    <Radio value="all">All Users</Radio>
                                                    <Radio value="specific">Specific User Group</Radio>
                                                </Space>
                                            </Radio.Group>

                                            {userTargetingType === "all" && (
                                                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                                                    <p className="text-blue-800 flex items-center">
                                                        <InfoCircleOutlined className="mr-2" />
                                                        This voucher will be distributed to all users in the system.
                                                    </p>
                                                </div>
                                            )}

                                            {userTargetingType === "specific" && (
                                                <div className="pl-6">
                                                    <p className="font-medium mb-3">Filter users by account creation date:</p>
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span>Users registered in the last</span>
                                                        <InputNumber 
                                                            min={1} 
                                                            max={1000}
                                                            value={timeValue}
                                                            onChange={handleTimeValueChange}
                                                            style={{ width: '80px' }}
                                                        />
                                                        <Radio.Group 
                                                            onChange={handleTimeUnitChange} 
                                                            value={timeUnit}
                                                        >
                                                            <Radio.Button value="days">Days</Radio.Button>
                                                            <Radio.Button value="weeks">Weeks</Radio.Button>
                                                            <Radio.Button value="months">Months</Radio.Button>
                                                            <Radio.Button value="years">Years</Radio.Button>
                                                        </Radio.Group>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                        <div className="flex justify-end mt-6 gap-3">
                            <Button onClick={() => navigate('/admin/voucher-management')}>
                                Cancel
                            </Button>
                            <Button 
                                type="primary" 
                                icon={distributionMethod === 'direct' ? <UserOutlined /> : <IdcardOutlined />}
                                onClick={handleSubmit}
                                disabled={isSubmitDisabled()}
                                loading={isLoading}
                            >
                                {isLoading ? 'Processing...' : (
                                    distributionMethod === 'direct' ? 'Distribute to Users' : 'Export Vouchers'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ExportVoucher;