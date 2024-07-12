import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const Input: React.FC<InputProps> = ({ id, ...props }) => {
  return (
    <p className="flex flex-col mb-[2rem] justify-[center] gap-[20px]">
      {/* <label htmlFor={id} className="text-[20px] font-semibold pl-[0.5rem]">
        {label}
      </label> */}
      <input
        id={id}
        name={id}
        required
        {...props}
        className={`py-[0.9rem] px-[1rem] rounded-[12px] w-[100%] placeholder-gray-500 border border-[#e5e7eb]`}
      />
    </p>
  );
};

export default Input;
