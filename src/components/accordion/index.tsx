import React from "react";
import styles from "./index.module.css";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

interface AccordionProps {
    iconLeft?: React.ReactNode,
    title?: string,
    content?: string,
    iconRight?: React.ReactNode,
}

export default function Accordion({
    iconLeft,
    title,
    content,
    iconRight
}: AccordionProps) {
    return (
        <div className={styles.container}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20
            }}>
                {/* {iconLeft} */}
                <CurrencyExchangeIcon />
                <div>
                    <p style={{fontSize: 13}}>{title}</p>
                    <p style={{fontSize: 13, color: "#bbbbbb"}}>{content}</p>
                </div>
            </div>

            {iconRight}
        </div>
    )
}