import React from 'react';
import { Controller, Control, FieldError } from 'react-hook-form';
import { FormFloatingInputProps } from '../../type';
import { FloatingInput } from '../input';

const FormFloatingInput: React.FC<FormFloatingInputProps> = ({
    name,
    control,
    label,
    placeholder,
    type = 'text',
    error,
    small,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                    <FloatingInput
                        {...field}
                        id={name}
                        label={label}
                        placeholder={placeholder || label}
                        type={type}
                        small={small}
                    />
                    {(error || fieldState.error) && (
                        <p className="text-xs text-red-500 mt-1">
                            {(error || fieldState.error)?.message}
                        </p>
                    )}
                </div>
            )}
        />
    );
};

export default FormFloatingInput;
