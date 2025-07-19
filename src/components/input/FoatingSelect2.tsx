// components/input/FloatingSelect.tsx
import React, { forwardRef } from 'react';

interface FloatingSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    id: string;
    options: { value: string; label: string }[];
    small?: boolean;
}

const FloatingSelect2 = forwardRef<HTMLSelectElement, FloatingSelectProps>(
    ({ label, id, value, onChange, onBlur, name, options, small, ...rest }, ref) => {
        return (
            <div className="relative">
                <select
                    ref={ref}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`peer inputBox bg-white appearance-none ${
                        small ? 'pl-5 pr-5 pt-5 pb-1 text-sm' : 'pl-5 pr-10 pt-5 pb-1 text-base'
                    }`}
                    {...rest}
                >
                    <option value="" disabled selected>
                        {label}
                    </option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                <label
                    htmlFor={id}
                    className={`absolute left-5 text-gray-500 ${
                        small ? 'text-[10px] top-1' : 'text-xs top-1'
                    } transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 ${
                        small
                            ? 'peer-focus:text-[10px] peer-focus:top-1'
                            : 'peer-focus:text-xs peer-focus:top-1'
                    } peer-focus:text-blue-500`}
                >
                    {label}
                </label>
            </div>
        );
    }
);

export default FloatingSelect2;
