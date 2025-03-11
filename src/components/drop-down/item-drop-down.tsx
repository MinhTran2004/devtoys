import React from "react";

interface ItemDropDownProps {
    iconLeft?: React.ReactNode,
    label?: string,
    iconRight?: React.ReactNode,
    onSelectItemDropDown?: (text: string) => void,
}

export default function ItemDropDown({
    iconLeft,
    label,
    iconRight,
    onSelectItemDropDown
}: ItemDropDownProps) {
    return (
        <div className="flex min-w-33 bg-[#434446] px-3 py-1 justify-between rounded-sm cursor-pointer"
            onClick={() => { onSelectItemDropDown && onSelectItemDropDown(label || "") }}>
            {/* {iconLeft} */}
            {/* <KeyboardArrowDownIcon /> */}
            <p>{label}</p>
            {iconRight}
            {/* <KeyboardArrowDownIcon /> */}
        </div>
    )
}