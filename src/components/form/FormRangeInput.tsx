import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Input } from 'antd';
import { FormRangeInputProps } from '../../type';

const FormRangeInput: React.FC<FormRangeInputProps> = ({
    nameFrom,
    nameTo,
    control,
    label,
    placeholderFrom = 'From',
    placeholderTo = 'To',
    type = 'number',
    errorFrom,
    errorTo,
}) => {
    return (
        <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
            <div className="flex gap-2">
                <Controller
                    name={nameFrom}
                    control={control}
                    render={({ field }) => (
                        <div className="flex flex-col">
                            <Input {...field} placeholder={placeholderFrom} type={type} />
                            {errorFrom && (
                                <p className="text-xs text-red-500 mt-1">{errorFrom.message}</p>
                            )}
                        </div>
                    )}
                />
                <Controller
                    name={nameTo}
                    control={control}
                    render={({ field }) => (
                        <div className="flex flex-col">
                            <Input {...field} placeholder={placeholderTo} type={type} />
                            {errorTo && (
                                <p className="text-xs text-red-500 mt-1">{errorTo.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default FormRangeInput;
