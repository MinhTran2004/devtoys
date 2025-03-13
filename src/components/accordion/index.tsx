import React, { useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface AccordionProps {
    data?: AccordionProps[],
    label?: string,
    iconLeft?: React.ReactNode,
    title?: string,
    content?: string,
    iconRight?: React.ReactNode,
}

export default function Accordion({
    data,
    label,
    iconLeft,
    title,
    content,
    iconRight
}: AccordionProps) {
    const [isDropDown, setIsDropDown] = useState(false);

    return (
        <div>
            <div className="min-h-18 w-full flex flex-col gap-1">
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
                    <div className="flex items-center gap-2">
                        {iconRight}
                        {data && <div onClick={() => setIsDropDown(!isDropDown)}><KeyboardArrowDownIcon/></div>}
                    </div>
                </div>
                <div>
                    {data && isDropDown && (
                        data.map((item, index) => (
                            <Accordion key={index} {...item} />
                        ))
                    )}
                </div>
            </div>

        </div>
    )
}