import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type FloatingInputProps = {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  id,
  type = "input",
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type == "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="relative">
      <input
        type={inputType}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="peer inputBox"
      />
      <label
        htmlFor={id}
        className="absolute left-5 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
      >
        {label}
      </label>

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
