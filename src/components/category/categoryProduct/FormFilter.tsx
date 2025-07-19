import { useForm, Controller } from 'react-hook-form';
import { Input, Select } from 'antd';
import { FilterFormValues } from '../../../type';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, selectSize } from '@/store/selector/client/collection/food.selector';
import { food } from '@/store/reducer';

const foodOptions = [
    { label: 'Burger', value: '1' },
    { label: 'Pizza', value: '2' },
    { label: 'Fries', value: '3' },
];

const FormFilter = () => {
    // selector
    const filter = useSelector(selectFilter);
    const sizeFilter = useSelector(selectSize);
    const dispatch = useDispatch();

    // control
    const { control, handleSubmit, reset } = useForm<FilterFormValues>();

    const onSubmit = (data: FilterFormValues) => {
        console.log('Filter values:', {
            ...data,
            startDate: data.dateRange?.[0]?.toISOString(),
            endDate: data.dateRange?.[1]?.toISOString(),
        });
    };

    // event handling
    const handleChange = (e, feild) => {
        if (e == null) {
            return;
        }
        dispatch(
            food.actions.setFilter({
                ...filter,
                [feild]: e,
            })
        );
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-white rounded-xl space-y-4">
                {/* Grid chia nhóm */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Search */}
                    <Controller
                        name="search"
                        control={control}
                        render={({ field }) => (
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700">
                                    Search
                                </label>
                                <Input
                                    {...field}
                                    onChange={(e) => handleChange(e?.target?.value, 'search')}
                                    value={filter.search}
                                    placeholder="Search name or desc"
                                />
                            </div>
                        )}
                    />

                    {/* Discount */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">
                            Discount (%)
                        </label>
                        <div className="flex gap-2">
                            <Controller
                                name="minDiscount"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        onChange={(e) =>
                                            handleChange(e?.target?.value, 'minDiscount')
                                        }
                                        value={filter.minDiscount}
                                        placeholder="From"
                                        type="number"
                                    />
                                )}
                            />
                            <Controller
                                name="maxDiscount"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        value={filter.maxDiscount}
                                        onChange={(e) =>
                                            handleChange(e?.target?.value, 'maxDiscount')
                                        }
                                        placeholder="To"
                                        type="number"
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">Price</label>
                        <div className="flex gap-2">
                            <Controller
                                name="minPrice"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        value={filter.minPrice}
                                        onChange={(e) => handleChange(e?.target?.value, 'minPrice')}
                                        placeholder="From"
                                        type="number"
                                    />
                                )}
                            />
                            <Controller
                                name="maxPrice"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        value={filter.maxPrice}
                                        onChange={(e) => handleChange(e?.target?.value, 'maxPrice')}
                                        placeholder="To"
                                        type="number"
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Ready in minutes */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">
                            Ready In Minute
                        </label>
                        <div className="flex gap-2">
                            <Controller
                                name="minReady"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        value={filter.minReady}
                                        onChange={(e) => handleChange(e?.target?.value, 'minReady')}
                                        placeholder="From"
                                        type="number"
                                    />
                                )}
                            />
                            <Controller
                                name="maxReady"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        value={filter.maxReady}
                                        onChange={(e) => handleChange(e?.target?.value, 'maxReady')}
                                        placeholder="To"
                                        type="number"
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Food select */}
                    <Controller
                        name="foodIds"
                        control={control}
                        render={({ field }) => (
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700">
                                    Select Food
                                </label>
                                <Select
                                    {...field}
                                    mode="multiple"
                                    allowClear
                                    showSearch
                                    placeholder="Select Food"
                                    options={foodOptions}
                                    onChange={(value) => {
                                        field.onChange(value);
                                        console.log(value);
                                        handleChange(value, 'foodIds');
                                    }}
                                />
                            </div>
                        )}
                    />

                    {/* Size select */}
                    <Controller
                        name="size"
                        control={control}
                        render={({ field }) => (
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700">
                                    Size
                                </label>
                                <Select
                                    {...field}
                                    mode="multiple"
                                    allowClear
                                    showSearch
                                    placeholder="Select size"
                                    options={(sizeFilter ?? []).map((s) => ({
                                        label: (s as any).name,
                                        value: (s as any).id?.toString(),
                                    }))}
                                    onChange={(value) => {
                                        field.onChange(value);
                                        console.log(value);
                                        handleChange(value, 'sizeIds');
                                    }}
                                />
                            </div>
                        )}
                    />

                    {/* Date range */}
                    {/* <Controller
                        name="dateRange"
                        control={control}
                        render={({ field }) => (
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700">
                                    Date Range
                                </label>
                                <DatePicker.RangePicker
                                    {...field}
                                    className="w-full"
                                    placeholder={['From', 'To']}
                                    onChange={field.onChange}
                                />
                            </div>
                        )}
                    /> */}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                        type="button"
                        onClick={() => reset()}
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
