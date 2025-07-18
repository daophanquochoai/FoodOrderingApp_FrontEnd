// components/form/FormFloatingSelect.tsx
import React from 'react';
import { Controller } from 'react-hook-form';
import { FloatingSelect2 } from '../input';
import { FormFloatingSelectProps } from '../../type';

const FormFloatingSelect: React.FC<FormFloatingSelectProps> = ({
    name,
    control,
    label,
    options,
    error,
    small,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                    <FloatingSelect2
                        {...field}
                        id={name}
                        label={label}
                        options={options}
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

export default FormFloatingSelect;
