import { Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { foodManager } from '@/store/reducer';
import {
    selectFilter,
    selectFitlerOption,
} from '@/store/selector/admin/food/food_manager.selector';
import { fetchFood } from '@/store/action/admin/food/food_manager.action';
import { filterFoodManager } from '@/defaultValue/admin/food/food_manager';

const FormFilter = () => {
    // selector
    const filter = useSelector(selectFilter);
    const filterOption = useSelector(selectFitlerOption);
    const dispatch = useDispatch();

    // event handling
    const handleChange = (value: any, field: string) => {
        dispatch(
            foodManager.actions.setFilter({
                ...filter,
                [field]: value,
            })
        );
        dispatch(fetchFood());
    };

    const handleReset = () => {
        dispatch(foodManager.actions.setFilter(filterFoodManager));
    };

    return (
        <div>
            <form onSubmit={() => {}} className="p-5 bg-white rounded-xl space-y-4">
                {/* Grid chia nhóm */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">Search</label>
                        <Input
                            onChange={(e) => handleChange(e?.target?.value, 'search')}
                            value={filter.search}
                            placeholder="Search name or desc"
                        />
                    </div>

                    {/* Discount */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">
                            Discount (%)
                        </label>
                        <div className="flex gap-2">
                            <Input
                                onChange={(e) => handleChange(e?.target?.value, 'minDiscount')}
                                value={filter.minDiscount}
                                placeholder="From"
                                type="number"
                            />
                            <Input
                                value={filter.maxDiscount}
                                onChange={(e) => handleChange(e?.target?.value, 'maxDiscount')}
                                placeholder="To"
                                type="number"
                            />
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">Price</label>
                        <div className="flex gap-2">
                            <Input
                                value={filter.minPrice}
                                onChange={(e) => handleChange(e?.target?.value, 'minPrice')}
                                placeholder="From"
                                type="number"
                            />
                            <Input
                                value={filter.maxPrice}
                                onChange={(e) => handleChange(e?.target?.value, 'maxPrice')}
                                placeholder="To"
                                type="number"
                            />
                        </div>
                    </div>

                    {/* Ready in minutes */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">
                            Ready In Minute
                        </label>
                        <div className="flex gap-2">
                            <Input
                                value={filter.minReady}
                                onChange={(e) => handleChange(e?.target?.value, 'minReady')}
                                placeholder="From"
                                type="number"
                            />
                            <Input
                                value={filter.maxReady}
                                onChange={(e) => handleChange(e?.target?.value, 'maxReady')}
                                placeholder="To"
                                type="number"
                            />
                        </div>
                    </div>
                    {/* Size select */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">Status :</label>
                        <Select
                            mode="multiple"
                            allowClear
                            showSearch
                            placeholder="Select size"
                            options={[
                                {
                                    label: 'Deleted',
                                    value: 'DELETE',
                                },
                                {
                                    label: 'Out Stock',
                                    value: 'OUT_STOCK',
                                },
                                {
                                    label: 'Active',
                                    value: 'ACTIVE',
                                },
                            ]}
                            value={filter?.statusFoods?.map((item) => {
                                return {
                                    value: item,
                                };
                            })}
                            onChange={(value) => {
                                handleChange(value, 'statusFoods');
                            }}
                        />
                    </div>
                    {/* Size select */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">Size</label>
                        <Select
                            mode="multiple"
                            allowClear
                            showSearch
                            placeholder="Select size"
                            options={(filterOption?.size ?? []).map((s) => ({
                                label: (s as any).name,
                                value: (s as any).id?.toString(),
                            }))}
                            value={filter?.sizeIds?.map((item) => {
                                return {
                                    value: item,
                                };
                            })}
                            onChange={(value) => {
                                handleChange(value, 'sizeIds');
                            }}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="w-fit px-4 py-2 cursor-pointer bg-white hover:bg-orange-50 uppercase rounded-[24px] flex items-center justify-center text-orange-600 border border-orange-primary font-normal text-sm tracking-wider font-kanit transition-all duration-500"
                    >
                        Reset
                    </button>
                    <div className="">
                        <button
                            type="submit"
                            className="w-fit px-4 py-2 cursor-pointer bg-orange-primary hover:bg-black uppercase rounded-[24px] flex items-center justify-center text-white font-normal text-sm tracking-wider font-kanit transition-all duration-500"
                        >
                            Apply Filter
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormFilter;
