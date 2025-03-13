"use client"
import Accordion from "@/components/accordion";
import { useEffect, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Toogle from "@/components/switch";
import Textarea from "@/components/textarea";

export default function HTMLPage() {
    const [inputToken, setInputToken] = useState("");
    const [headerText, setHeaderText] = useState("");
    const [payloadText, setPayloadText] = useState("");
    const [signature, setSignature] = useState("");

    const [isChecked, setIsChecked] = useState(false);

    const [result, setResult] = useState<{ header: object; payload: object; message: string } | null>(null);

    const handleDecode = async () => {
      try {
        const response = await fetch(`/app/encoders/jwt?token=${inputToken}`);
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    useEffect(() => {
        handleDecode();
    }, [inputToken]);

    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-2">JWT Encoders / Decoders</p>

            <Accordion
                iconLeft={<CurrencyExchangeIcon />}
                title="Tool Mode"
                content="Select which mode you want to use"
                iconRight={<Toogle textFalse="Decode" textTrue="Encode" checked={isChecked} onChange={text => setIsChecked(!isChecked)} />} />

            <Accordion
                iconLeft={<CurrencyExchangeIcon />}
                title="Settings"
                content="Select token parameters"
                data={["hihi"]} />

            <div className="h-2/10 mt-3">
                <Textarea
                    label="Token"
                    value={inputToken}
                    onChange={(text) => setInputToken(text.target.value)}
                />
            </div>

            <div className="w-full h-2/10 flex flex-row gap-3 mt-7">
                <Textarea
                    label="Header"
                    value={headerText}
                    onChange={(text) => setHeaderText(text.target.value)}
                />
                <Textarea
                    label="Payload"
                    value={payloadText}
                    onChange={(text) => setPayloadText(text.target.value)}
                />
            </div>

            <div className="h-2/10 mt-7">
                <Textarea
                    label="Signature"
                    value={signature}
                    onChange={(text) => setSignature(text.target.value)}
                />
            </div>
        </div>
    )
}