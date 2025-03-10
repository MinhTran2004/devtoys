import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from "./item-drop-down.module.css";

interface ItemMenuProps {
    iconLeft?: React.ReactNode,
    label?: string,
    iconRight?: React.ReactNode,
    setSelectItemDropDown?: (text: string) => void,
}

export default function ItemMenu({
    iconLeft,
    label,
    iconRight,
    setSelectItemDropDown
}: ItemMenuProps) {
    return (
        <div className={styles.container} onClick={() => {setSelectItemDropDown && setSelectItemDropDown(label || "")}}>
            {/* {iconLeft} */}
            <KeyboardArrowDownIcon />
            <p>{label}</p>
            {/* {iconRight} */}
            {/* <KeyboardArrowDownIcon /> */}
        </div>
    )
}