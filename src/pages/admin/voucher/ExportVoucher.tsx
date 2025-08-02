import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { Select, Divider, Radio, Space, Button, Spin } from 'antd';
import { IdcardOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectFilterOption,
    selectLoadingComponent,
} from '@/store/selector/admin/voucher/voucher_admin.selector';
import { common } from '@/store/reducer';
import { Voucher } from '@/type/store/client/voucher/voucher.style';
import { selectVoucher } from '@/store/selector/client/voucher/voucher.selector';
import { exportVoucher } from '@/store/action/admin/voucher/voucher_admin.action';

const ExportVoucher = () => {
    // hook
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // selector
    const filterOption = useSelector(selectFilterOption);
    const loadingComponent = useSelector(selectLoadingComponent);

    // state
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher>(null);
    const [applicationType, setApplicationType] = useState<string>('products');
    const [selectedFoods, setSelectedFoods] = useState<number[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    // useEffect
    useEffect(() => {
        if (selectedVoucher != null) {
            setSelectedFoods(selectedVoucher?.foods?.map((i) => i.id));
            setSelectedCategories(selectedVoucher?.categories?.map((i) => i.id));
        }
    }, [selectedVoucher]);

    // event handling
    const handleVoucherSelect = (voucherId: number) => {
        const selected = filterOption?.voucher?.find((v) => v.id === voucherId);
        setSelectedVoucher(selected);
    };

    const handleApplicationTypeChange = (e: any) => {
        setApplicationType(e.target.value);
    };

    const handleFoodSelect = (values: number[]) => {
        setSelectedFoods(values);
    };

    const handleCategorySelect = (values: number[]) => {
        setSelectedCategories(values);
    };

    const handleSubmit = async () => {
        try {
            const food: number[] = selectedVoucher?.foods?.map((i) => i.id);
            const category: number[] = selectedVoucher?.categories?.map((i) => i.id);
            const foodNew =
                selectedFoods?.filter((i) => food == undefined || !food.includes(i)) || [];
            const foodOld = food ? food?.filter((i) => !selectedFoods.includes(i)) || [] : [];
            const categoryNew =
                selectedCategories?.filter((i) => category == undefined || !category.includes(i)) ||
                [];
            const categoryOld = category
                ? category?.filter((i) => !selectedCategories.includes(i)) || []
                : [];
            const data = {
                id: selectedVoucher?.id,
                foodNew,
                foodOld,
                categoryNew,
                categoryOld,
            };
            dispatch(exportVoucher(data));
        } catch (error) {
            dispatch(common.actions.setErrorMessage(error?.message));
        }
    };

    return (
        <Spin spinning={loadingComponent}>
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
                                        (option?.label?.toString().toLowerCase() ?? '').includes(
                                            input.toLowerCase()
                                        )
                                    }
                                    options={filterOption?.voucher?.map((voucher) => ({
                                        value: voucher.id,
                                        label: `${voucher.code} - ${voucher.desc?.replace(
                                            /<[^>]+>/g,
                                            ''
                                        )}`,
                                    }))}
                                    className="w-full mb-6"
                                    size="large"
                                />
                            </div>

                            {selectedVoucher && (
                                <>
                                    <Divider />
                                    <div className="mb-6">
                                        <h2 className="text-lg font-medium mb-4">
                                            2. Select Application Scope
                                        </h2>
                                        <Radio.Group
                                            onChange={handleApplicationTypeChange}
                                            value={applicationType}
                                        >
                                            <Space direction="vertical">
                                                {/* <Radio value="all">Apply to all products</Radio> */}
                                                <Radio value="products">
                                                    Apply to specific products
                                                </Radio>
                                                <Radio value="categories">
                                                    Apply to specific categories
                                                </Radio>
                                            </Space>
                                        </Radio.Group>

                                        {applicationType === 'products' && (
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                placeholder="Select products"
                                                value={selectedFoods}
                                                style={{ width: '100%' }}
                                                onChange={handleFoodSelect}
                                                optionFilterProp="label"
                                                filterOption={(input, option) =>
                                                    (
                                                        option?.label?.toString().toLowerCase() ??
                                                        ''
                                                    ).includes(input.toLowerCase())
                                                }
                                                options={filterOption?.food?.map((food) => ({
                                                    value: food?.id,
                                                    label: food?.name,
                                                }))}
                                                optionRender={(option) => {
                                                    const food = filterOption?.food?.find(
                                                        (f) => f?.id === option.value
                                                    );
                                                    return (
                                                        <div className="flex items-center">
                                                            <img
                                                                src={food?.image}
                                                                alt={food?.name}
                                                                className="w-8 h-8 object-cover mr-2 rounded-md"
                                                            />
                                                            <span>{food?.name}</span>
                                                        </div>
                                                    );
                                                }}
                                                className="w-full mt-4"
                                                size="large"
                                            />
                                        )}

                                        {applicationType === 'categories' && (
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                placeholder="Select categories"
                                                value={selectedCategories}
                                                style={{ width: '100%' }}
                                                onChange={handleCategorySelect}
                                                optionFilterProp="label"
                                                filterOption={(input, option) =>
                                                    (
                                                        option?.label?.toString().toLowerCase() ??
                                                        ''
                                                    ).includes(input.toLowerCase())
                                                }
                                                options={
                                                    filterOption?.category?.map((category) => ({
                                                        value: category.id,
                                                        label: category.name,
                                                    })) || []
                                                }
                                                optionRender={(option) => {
                                                    const category = filterOption?.category?.find(
                                                        (c) => c.id === option.value
                                                    );
                                                    return (
                                                        <div className="flex items-center">
                                                            <img
                                                                src={category?.image}
                                                                alt={category?.name}
                                                                className="w-8 h-8 object-cover mr-2 rounded-md"
                                                            />
                                                            <span>{category?.name}</span>
                                                        </div>
                                                    );
                                                }}
                                                className="w-full mt-4"
                                                size="large"
                                            />
                                        )}

                                        {applicationType === 'all' && (
                                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mt-4">
                                                <p className="text-blue-800">
                                                    This voucher will be applied to all products in
                                                    the system.
                                                </p>
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
                                    icon={<IdcardOutlined />}
                                    onClick={handleSubmit}
                                >
                                    Export Vouchers
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Spin>
    );
};

export default ExportVoucher;
