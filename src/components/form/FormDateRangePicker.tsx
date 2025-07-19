import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { DatePicker } from 'antd';
import { FormDateRangePickerProps } from '../../type';

const { RangePicker } = DatePicker;

const FormDateRangePicker: React.FC<FormDateRangePickerProps> = ({ name, control, label }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
                    <RangePicker
                        {...field}
                        className="w-full"
                        placeholder={['From', 'To']}
                        onChange={field.onChange}
                    />
                </div>
            )}
        />
    );
};

export default FormDateRangePicker;
