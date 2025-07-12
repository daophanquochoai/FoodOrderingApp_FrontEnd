import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Select, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';
import { FilterFormValues } from '../../../type';

const { RangePicker } = DatePicker;

const sizeOptions = ['Small', 'Medium', 'Large'].map((s) => ({ label: s, value: s }));
const foodOptions = [
    { label: 'Burger', value: '1' },
    { label: 'Pizza', value: '2' },
    { label: 'Fries', value: '3' },
];

const FormFilter = () => {
    const { control, handleSubmit, reset } = useForm<FilterFormValues>();

    const onSubmit = (data: FilterFormValues) => {
        console.log('Filter values:', {
            ...data,
            startDate: data.dateRange?.[0]?.toISOString(),
            endDate: data.dateRange?.[1]?.toISOString(),
        });
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
                                <Input {...field} placeholder="Search name or desc" />
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
                                    <Input {...field} placeholder="From" type="number" />
                                )}
                            />
                            <Controller
                                name="maxDiscount"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} placeholder="To" type="number" />
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
                                    <Input {...field} placeholder="From" type="number" />
                                )}
                            />
                            <Controller
                                name="maxPrice"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} placeholder="To" type="number" />
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
                                    <Input {...field} placeholder="From" type="number" />
                                )}
                            />
                            <Controller
                                name="maxReady"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} placeholder="To" type="number" />
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
                                    onChange={field.onChange}
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
                                    options={sizeOptions}
                                    onChange={field.onChange}
                                />
                            </div>
                        )}
                    />

                    {/* Date range */}
                    <Controller
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
                    />
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
