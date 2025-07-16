import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Select } from 'antd';
import { FormSelectProps } from '../../type';

const FormSelect: React.FC<FormSelectProps> = ({
    name,
    control,
    label,
    options,
    placeholder,
    mode,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
                    <Select
                        {...field}
                        mode={mode}
                        allowClear
                        showSearch
                        placeholder={placeholder}
                        options={options}
                        onChange={field.onChange}
                    />
                </div>
            )}
        />
    );
};

export default FormSelect;
