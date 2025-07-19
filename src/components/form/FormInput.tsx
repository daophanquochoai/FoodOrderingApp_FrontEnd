import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Input } from 'antd';
import { FormInputProps } from '../../type';

const FormInput: React.FC<FormInputProps> = ({
    name,
    control,
    label,
    placeholder,
    type = 'text',
    error,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
                    <Input {...field} placeholder={placeholder} type={type} />
                    {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
                </div>
            )}
        />
    );
};

export default FormInput;
