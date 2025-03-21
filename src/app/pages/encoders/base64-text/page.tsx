"use client"

import Accordion from "@/components/accordion";
import { useCallback, useEffect, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Toogle from "@/components/switch";
import Textarea from "@/components/textarea";

export default function Base64TextPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const convertEncode = useCallback(() => {
        const text = btoa(input);
        setOutput(text);
    }, [input, isChecked]);

    const convertDecode = useCallback(() => {
        try {
            const text = atob(input);
            setOutput(text);
        } catch (err) {
            console.log(err);
            setOutput("<Invalid Base64>")
        }
    }, [input, isChecked]);

    useEffect(() => {
        if (isChecked) {
            convertEncode();
        } else {
            convertDecode();
        }
    }, [input, isChecked, convertDecode, convertEncode]);

    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-2">Base64 Text Encoders / Decoders</p>
            <Accordion
                iconLeft={<CurrencyExchangeIcon />}
                title="Conversion"
                content="Select wich conversion mode you want to use"
                iconRight={<Toogle
                    textFalse="Decode"
                    textTrue="Encode"
                    checked={isChecked} onChange={text => setIsChecked(!isChecked)}
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