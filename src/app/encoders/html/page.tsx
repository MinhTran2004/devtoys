"use client"
import Accordion from "@/components/accordion";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Toogle from "@/components/switch";
import he from 'he';
import Textarea from "@/components/textarea";

export default function HTMLPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const convertEncode = () => {
        const text = he.encode(input);
        setOutput(text);
    }

    const convertDecode = () => {
        try {
            const text = he.decode(input);
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
        <div className="layout">
            <p className="title">HTML Text Encoders / Decoders</p>

            <Accordion
                iconLeft={<CurrencyExchangeIcon />}
                title="Conversion"
                content="Select wich conversion mode you want to use"
                iconRight={<Toogle textFalse="Decode" textTrue="Encode" onChangeValue={setIsChecked} />} />

            <div className={styles.content}>
                <Textarea
                    label="Input"
                    value={input}
                    onChange={(text) => setInput(text.target.value)}
                />
                <Textarea
                    label="Output"
                    value={output}
                    onChange={(text) => setOutput(text.target.value)}
                />
            </div>

        </div>
    )
}