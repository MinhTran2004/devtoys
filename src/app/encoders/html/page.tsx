"use client"

import Accordion from "@/components/accordion";
import { useMemo, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Toogle from "@/components/switch";
import he from 'he';
import Textarea from "@/components/textarea";

export default function HTMLPage() {
    const [input, setInput] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const output = useMemo(() => {
        try {
            if (isChecked) {
                return he.encode(input);
            } else {
                return he.decode(input);
            }
        } catch (err) {
            return "<Invalid Base64>";
        }
    }, [input, isChecked]);

    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-2">HTML Text Encoders / Decoders</p>
            <Accordion
                iconLeft={<CurrencyExchangeIcon />}
                title="Conversion"
                content="Select wich conversion mode you want to use"
                iconRight={<Toogle
                    textFalse="Decode"
                    textTrue="Encode"
                    checked={isChecked}
                    onChange={text => setIsChecked(!isChecked)}
                />}
            />
            <div className="h-10/12 grid grid-rows-2 gap-2">
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