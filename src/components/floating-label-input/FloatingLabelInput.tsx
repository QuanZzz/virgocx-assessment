import React, { useState } from "react";
import { Input } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { RadioChangeEvent } from "antd/lib/radio";
import "./FloatingLabelInput.css"; // Make sure to include your custom styles

type FloatingLabelInputProps = {
  handleOnChange: (
    e:
      | CheckboxValueType[]
      | RadioChangeEvent
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  value: string;
  placeholder: string;
  label: string;
  disabled: boolean;
};

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  handleOnChange,
  value,
  placeholder,
  label,
  disabled,
}) => {
  return (
    <div className="relative mt-6">
      <Input
        type="text"
        id="first_name_input"
        className="first-name-input mt-4 block rounded-lg w-full text-sm 
      hover:border-indigo-600 focus:border-indigo-600 focus:outline-none border peer
      disabled:border-slate-50 disabled:text-slate-200"
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        disabled={disabled}
      />
      <label
        htmlFor="first_name_input"
        className="mt-1 absolute text-sm text-gray-500 duration-300 transform 
      -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
      peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
      rtl:peer-focus:left-auto peer-disabled:text-slate-200"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
