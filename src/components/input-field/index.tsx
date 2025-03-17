import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string,
  iconRight?: React.ReactNode,
  styleLayout?:React.CSSProperties,
}

export default function InputField({
  label,
  iconRight,
  styleLayout,
  ...input
}: InputFieldProps) {
  return (
    <div style={{...styleLayout}}>
      <label className="text-sm text-[#bbbbbb]">{label}</label>
      <div className="flex w-full justify-between items-center bg-[#323232] rounded-sm p-1 pl-2 border-b-2">
        <input
          className="w-full text-sm outline-none"
          {...input}
        />
        {iconRight}
      </div>
    </div>
  );
}
