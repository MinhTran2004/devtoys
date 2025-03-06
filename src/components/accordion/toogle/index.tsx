"use client"
import { useState } from "react";
import styles from "./index.module.css";

interface ToogleProps {
    textTrue?: string,
    textFalse?: string,
    onChangeValue: (text: boolean) => void
}

export default function Toogle({
    textTrue,
    textFalse,
    onChangeValue
}: ToogleProps) {
    const [isToogle, setIsToogle] = useState(false);
    const handleCheckboxChange = (event: any) => {
        setIsToogle(event.target.checked);
        onChangeValue(event.target.checked);
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10
        }}>
            <p style={{ fontSize: 15 }}>
                {isToogle ? textTrue : textFalse}
            </p>

            <label className={styles.switch}>
                <input type="checkbox" onClick={handleCheckboxChange} />
                <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
        </div>
    )
}