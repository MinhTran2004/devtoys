import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from "./item-menu.module.css";

interface ItemMenuProps {
    iconLeft?: React.ReactNode,
    label?: string,
    iconRight?: React.ReactNode,
    onSelectItemMenu?: (text: string) => void,
}

export default function ItemMenu({
    iconLeft,
    label,
    iconRight,
    onSelectItemMenu
}: ItemMenuProps) {
    return (
        <div className={styles.container} onClick={() => {onSelectItemMenu && onSelectItemMenu(label || "")}}>
            {/* {iconLeft} */}
            <KeyboardArrowDownIcon />
            <p>{label}</p>
            {/* {iconRight} */}
            {/* <KeyboardArrowDownIcon /> */}
        </div>
    )
}