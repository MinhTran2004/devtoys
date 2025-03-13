import { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    iconLeft?: React.ReactNode,
    iconRight?: React.ReactNode,
}

export default function PrimaryButton({
    iconLeft,
    iconRight,
    disabled,
    name,
    ...button
}: PrimaryButtonProps) {
    return (
        <div className="flex items-center justify-between gap-1 mt-4 p-2  text-black text-sm rounded"
            style={{ cursor: disabled ? "pointer" : "default", color: disabled ? "black" : "#808080", backgroundColor: disabled ? "#6ebbe7" : "#2f2f2f" }}>
            {iconLeft}
            <button 
            style={{ cursor: disabled ? "pointer" : "default", color: disabled ? "black" : "#808080", backgroundColor: disabled ? "#6ebbe7" : "#2f2f2f" }}
                {...button}>{name}</button>
            {iconRight}
        </div>
    )
}