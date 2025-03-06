"use client"
import Accordion from "@/components/accordion";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Toogle from "@/components/toogle";

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
        <div className={styles.container}>
            <p style={{
                fontSize: 20,
                fontWeight: 500
            }}>URL Encoders / Decoders</p>

            <Accordion
                iconLeft={<CurrencyExchangeIcon />}
                title="Conversion"
                content="Select wich conversion mode you want to use"
                iconRight={<Toogle textFalse="Decode" textTrue="Encode" onChangeValue={setIsChecked} />} />

            <div className={styles.content}>
                <div>
                    <p style={{ fontSize: 14 }}>Input</p>
                    <textarea
                        className={styles.textarea}
                        value={input}
                        onChange={text => setInput(text.target.value)}
                    />
                </div>

                <div>
                    <p style={{ fontSize: 14 }}>Output</p>
                    <textarea
                        className={styles.textarea}
                        value={output}
                        onChange={text => setOutput(text.target.value)}
                    />
                </div>
            </div>

        </div>
    )
}