import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string,
  iconRight?: React.ReactNode,
  styleLayout?: React.CSSProperties,
  textError?: string,
}

export default function InputField({
  label,
  iconRight,
  styleLayout,
  textError,
  ...input
}: InputFieldProps) {
  return (
    <div style={{ ...styleLayout }}>
      <label className="text-sm text-[#bbbbbb]">{label}</label>
      <div className="flex w-full justify-between items-center bg-[#323232] rounded-sm p-1 pl-2 border-b-2">
        <div className="w-full">
          <input
            className="w-full ext-sm outline-none"
            {...input}
          />
        </div>
        {iconRight}
      </div>
      <p className="text-red-600 text-sm">{textError}</p>
    </div>
  );
}
