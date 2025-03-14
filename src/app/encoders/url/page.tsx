"use client"
import Accordion from "@/components/accordion";
import { useEffect, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Toogle from "@/components/switch";
import Textarea from "@/components/textarea";

export default function URLPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const convertEncode = () => {
        const text = encodeURIComponent(input);
        setOutput(text);
    }

    const convertDecode = () => {
        try {
            const text = (input);
            setOutput(text);
        } catch (err) {
            console.log(err);
            setOutput("<Invalid Base64>")
        }
    }

    useEffect(() => {
        if (isChecked) {
            convertEncode();
        } else {
            convertDecode();
        }
    }, [input, isChecked, convertDecode, convertEncode]);


    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-2">URL Encoders / Decoders</p>

            <Accordion
                iconLeft={<CurrencyExchangeIcon />}
                title="Conversion"
                content="Select wich conversion mode you want to use"
                iconRight={<Toogle textFalse="Decode" textTrue="Encode" checked={isChecked} onChangeStatus={setIsChecked} />} />

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