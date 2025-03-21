"use client"

import Accordion from "@/components/accordion";
import { useMemo, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Toogle from "@/components/switch";
import Textarea from "@/components/textarea";

export default function URLPage() {
    const [input, setInput] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const output = useMemo(() => {
        try {
            if (isChecked) {
                return encodeURIComponent(input);
            } else {
                return (input);
            }
        } catch (err) {
            return "<Invalid Base64>";
        }
    }, [input, isChecked])

    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-2">URL Encoders / Decoders</p>
            <Accordion
                iconLeft={<CurrencyExchangeIcon />}
                title="Conversion"
                content="Select wich conversion mode you want to use"
                iconRight={<Toogle
                    textFalse="Decode"
                    textTrue="Encode"
                    checked={isChecked} onChangeStatus={setIsChecked}
                />}
            />
            <div className="h-7/8 grid grid-rows-2 gap-2">
                <Textarea
                    label="Input"
                    value={input}
                    onChange={(text) => setInput(text.target.value)}
                />
                <Textarea
                    disabled
                    label="Output"
                    value={output}
                />
            </div>
        </div>
    )
}