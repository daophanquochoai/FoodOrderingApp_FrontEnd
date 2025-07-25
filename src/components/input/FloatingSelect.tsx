import React from 'react';

interface Option {
    value: string;
    label: string;
}

interface FloatingSelectProps {
    label: string;
    id: string;
    value: string;
    name?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
}

const FloatingSelect: React.FC<FloatingSelectProps> = ({
    label,
    id,
    name,
    value,
    onChange,
    options,
    required = false,
    placeholder = "Select an option",
    disabled
}) => {
    const selectName = name || id;
    return (
        <div className="relative">
            <select
                id={id}
                value={value}
                name={selectName}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className="peer w-full px-4 py-3 pt-6 pb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <label
                htmlFor={id}
                className={`absolute left-4 transition-all pointer-events-none ${
                    value 
                        ? 'top-3 text-xs text-gray-500' 
                        : 'top-3 text-xs text-gray-400 peer-focus:top-3 peer-focus:text-xs peer-focus:text-gray-500'
                }`}
            >
                {label}
            </label>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
};

export default FloatingSelect;