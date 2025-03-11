import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface ItemDropDownProps {
    iconLeft?: React.ReactNode,
    label?: string,
    iconRight?: React.ReactNode,
    setSelectItemDropDown?: (text: string) => void,
}

export default function ItemDropDown({
    iconLeft,
    label,
    iconRight,
    setSelectItemDropDown
}: ItemDropDownProps) {
    return (
        <div className="flex min-w-33 bg-[#434446] px-3 py-1 justify-between rounded-sm cursor-pointer"
            onClick={() => { setSelectItemDropDown && setSelectItemDropDown(label || "") }}>
            {/* {iconLeft} */}
            {/* <KeyboardArrowDownIcon /> */}
            <p>{label}</p>
            {/* {iconRight} */}
            <KeyboardArrowDownIcon />
        </div>
    )
}