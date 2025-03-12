import React from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

interface AccordionProps {
    label?: string,
    iconLeft?: React.ReactNode,
    title?: string,
    content?: string,
    iconRight?: React.ReactNode,
}

export default function Accordion({
    label,
    iconLeft,
    title,
    content,
    iconRight
}: AccordionProps) {
    return (
        <div className="min-h-18 w-full flex flex-col gap-1 mb-1">
            <label >{label}</label>
            <div className="flex justify-between min-h-17 py-3 px-4 rounded-sm items-center bg-[#333333]">
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
        </div>
    )
}