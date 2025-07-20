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
    helperText,
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
                        error={error}
                        helperText={helperText}
                        small={small}
                    />
                </div>
            )}
        />
    );
};

export default FormFloatingInput;
