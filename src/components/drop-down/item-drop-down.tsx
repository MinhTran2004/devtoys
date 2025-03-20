import React from "react";

interface ItemDropDownProps {
    label?: string,
    iconRight?: React.ReactNode,
    onSelectItemDropDown?: (text: string) => void,
    styleLayoutDropDown?: React.CSSProperties,
}

export default function ItemDropDown({
    label,
    iconRight,
    onSelectItemDropDown,
    styleLayoutDropDown,
}: ItemDropDownProps) {
    return (
        <div
            className="flex min-w-33 bg-[#434446] px-3 py-1 justify-between rounded-sm cursor-pointer"
            onClick={() => { onSelectItemDropDown && onSelectItemDropDown(label || "") }}
            style={{ ...styleLayoutDropDown }}
        >
            {/* {iconLeft} */}
            {/* <KeyboardArrowDownIcon /> */}
            <p>{label}</p>
            {iconRight}
            {/* <KeyboardArrowDownIcon /> */}
        </div>
    )
}