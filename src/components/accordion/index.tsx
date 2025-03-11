import React from "react";
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
        <div className="flex justify-between min-h-17 py-3 px-4 mb-2 rounded-sm items-center bg-[#333333]">
            <div className="flex items-center gap-3">
                {/* {iconLeft} */}
                <CurrencyExchangeIcon />

                <div>
                    <p className="text-sm">{title}</p>
                    <p className="text-sm text-[#bbbbbb]">{content}</p>
                </div>
            </div>

            {iconRight}
        </div>
    )
}