import React, { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    iconLeft?: React.ReactNode,
    iconRight?: React.ReactNode,
    label?: string,
    styleLayout?: React.CSSProperties,
}

export default function PrimaryButton({
    label,
    iconLeft,
    iconRight,
    disabled,
    styleLayout,
    name,
    onClick,
    ...button
}: PrimaryButtonProps) {
    return (
        <div style={{ ...styleLayout }}>
            <label>{label}</label>
            <div className={`h-8 flex items-center justify-between gap-1 mt-1 p-2 text-sm rounded ${disabled ? 'cursor-pointer text-black bg-[#6ebbe7]' : 'cursor-default text-[#808080] bg-[#2f2f2f]'} active:scale-95`}>
                {iconLeft}
                <button className={` h-full flex items-center justify-between mt-1 p-2 text-sm rounded ${disabled ? 'cursor-pointer text-black bg-[#6ebbe7]' : 'cursor-default text-[#808080] bg-[#2f2f2f]'}`}
                    {...button}>{name}</button>
                {iconRight}
            </div>
        </div>
    )
}