// components/form/FormFloatingSelect.tsx
import React from 'react';
import { Controller } from 'react-hook-form';
import { Select } from 'antd';

const FormSelectAnt: React.FC<any> = ({
    name,
    control,
    label,
    options,
    error,
    helperText,
    small,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex flex-col gap-1">
                    <label className="mb-1 text-sm font-medium">{label}</label>
                    <Select
                        {...field}
                        showSearch
                        placeholder={label}
                        // style={{ width: small ? 160 : 240 }}
                        optionFilterProp="label"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                        }
                        filterSort={(a, b) =>
                            (a?.label ?? '').toString().toLowerCase().localeCompare((b?.label ?? '').toString().toLowerCase())
                        }
                        options={options}
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                        disabled={field.disabled}
                    />
                    {error && <p className="text-xs text-red-500 mt-1">* {helperText}</p>}
                </div>
            )}
        />
    );
};

export default FormSelectAnt;
