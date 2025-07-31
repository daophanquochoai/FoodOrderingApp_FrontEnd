import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from 'antd';

const FormInput: React.FC<any> = ({
    name,
    control,
    label,
    placeholder,
    type = 'text',
    helperText,
    error,
    disabled = false,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex flex-col gap-1">
                    <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
                    <Input {...field} placeholder={placeholder} type={type} disabled={disabled} />
                    {error && <p className="text-xs text-red-500 mt-1">* {helperText}</p>}
                </div>
            )}
        />
    );
};

export default FormInput;
