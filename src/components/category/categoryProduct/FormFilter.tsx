import React from 'react';
import { useForm } from 'react-hook-form';
import { DatePicker } from 'antd';
import { FilterFormValues } from '../../../type';
import { FormDateRangePicker, FormInput, FormRangeInput, FormSelect } from '../../form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FilterProductSchema } from '../../yup/product';

const { RangePicker } = DatePicker;

const sizeOptions = ['Small', 'Medium', 'Large'].map((s) => ({ label: s, value: s }));
const foodOptions = [
    { label: 'Burger', value: '1' },
    { label: 'Pizza', value: '2' },
    { label: 'Fries', value: '3' },
];

const FormFilter = () => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(FilterProductSchema),
    });

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
                    <FormInput
                        name="search"
                        control={control}
                        label="Search"
                        placeholder="Search name or desc"
                        error={errors.search}
                    />

                    <FormRangeInput
                        nameFrom="minDiscount"
                        nameTo="maxDiscount"
                        control={control}
                        label="Discount (%)"
                        errorFrom={errors.minDiscount}
                        errorTo={errors.maxDiscount}
                    />

                    <FormRangeInput
                        nameFrom="minPrice"
                        nameTo="maxPrice"
                        control={control}
                        label="Price"
                        errorFrom={errors.minPrice}
                        errorTo={errors.maxPrice}
                    />

                    <FormRangeInput
                        nameFrom="minReady"
                        nameTo="maxReady"
                        control={control}
                        label="Ready In Minute"
                        errorFrom={errors.minReady}
                        errorTo={errors.maxReady}
                    />

                    <FormSelect
                        name="foodIds"
                        control={control}
                        label="Select Food"
                        options={foodOptions}
                        placeholder="Select food"
                        mode="multiple"
                    />

                    <FormSelect
                        name="size"
                        control={control}
                        label="Size"
                        options={sizeOptions}
                        placeholder="Select size"
                        mode="multiple"
                    />

                    <FormDateRangePicker name="dateRange" control={control} label="Date Range" />
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
