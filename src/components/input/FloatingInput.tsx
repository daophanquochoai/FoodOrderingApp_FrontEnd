import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { FloatingInputProps } from '../../type';

const FloatingInput: React.FC<FloatingInputProps> = ({
    label,
    id,
    type = 'input',
    small,
    error,
    helperText,
    ...inputProps
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const isTextarea = type === 'textarea';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
        <div className="relative">
            {isTextarea ? (
                <textarea
                    id={id}
                    placeholder={label}
                    className={`peer inputBox resize-none h-28 ${
                        small ? 'pl-5 pr-1 pt-5 pb-1 text-sm' : 'pl-5 pr-14 pt-5 pb-1 text-base'
                    }`}
                    {...inputProps}
                />
            ) : (
                <input
                    type={inputType}
                    id={id}
                    placeholder={label}
                    className={`peer inputBox ${
                        small ? 'pl-5 pr-1 pt-5 pb-1 text-sm' : 'pl-5 pr-14 pt-5 pb-1 text-base'
                    }`}
                    {...inputProps}
                />
            )}

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

            {error && <p className="text-red-500 text-sm mt-1">* {helperText}</p>}

            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                    {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                </button>
            )}
        </div>
    );
};

export default FloatingInput;
