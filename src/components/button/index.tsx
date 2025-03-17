import React, { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    iconLeft?: React.ReactNode,
    iconRight?: React.ReactNode,
    label?:string,
    styleLayout?:React.CSSProperties,
}

export default function PrimaryButton({
    label,
    iconLeft,
    iconRight,
    disabled,
    styleLayout,
    name,
    ...button
}: PrimaryButtonProps) {
    return (
        <div style={{...styleLayout}}>
            <label>{label}</label>
            <div className="flex items-center justify-between gap-1 mt-1 p-2  text-black text-sm rounded"
                style={{ cursor: disabled ? "pointer" : "default", color: disabled ? "black" : "#808080", backgroundColor: disabled ? "#6ebbe7" : "#2f2f2f" }}>
                {iconLeft}
                <button
                    style={{ cursor: disabled ? "pointer" : "default", color: disabled ? "black" : "#808080", backgroundColor: disabled ? "#6ebbe7" : "#2f2f2f" }}
                    {...button}>{name}</button>
                {iconRight}
            </div>
        </div>
    )
}