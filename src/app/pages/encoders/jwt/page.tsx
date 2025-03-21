"use client"
import Accordion from "@/components/accordion";
import { useCallback, useEffect, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Toogle from "@/components/switch";
import Textarea from "@/components/textarea";
import base64url from 'base64url';

export default function HTMLPage() {
    const [inputToken, setInputToken] = useState("");
    const [headerText, setHeaderText] = useState("");
    const [payloadText, setPayloadText] = useState("");
    const [signature, setSignature] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const decodeJWT = useCallback((token: string) => {
        try {
            const [headerEncoded, payloadEncoded, signatureEncoded] = token.split('.');
            if (!headerEncoded || !payloadEncoded || !signatureEncoded) {
                setPayloadText('Invalid JWT token');
            }
            const header = JSON.parse(base64url.decode(headerEncoded));
            const payload = JSON.parse(base64url.decode(payloadEncoded));

            return {
                header,
                payload,
                signature: signatureEncoded,
            };
        } catch (err) {
            console.log(err);
            setPayloadText('Invalid JWT token');
        }
    }, []);

    const handleJWT = useCallback(async () => {
        try {
            const decoded = decodeJWT(inputToken);
            setHeaderText(decoded ? JSON.stringify(decoded.header, null, 2) : "Invalid JWT token");
            setPayloadText(decoded ? JSON.stringify(decoded.payload, null, 2) : "Invalid JWT token");
            setSignature(decoded ? JSON.stringify(decoded.signature, null, 2) : "Invalid JWT token");
        } catch (error: any) {
            console.log(error);
            setPayloadText('Invalid JWT token');
        }
    }, [inputToken, isChecked]);

    useEffect(() => {
        handleJWT();
    }, [inputToken, isChecked])

    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-2">JWT Encoders / Decoders</p>
            <Accordion
                iconLeft={<CurrencyExchangeIcon />}
                title="Tool Mode"
                content="Select which mode you want to use"
                iconRight={<Toogle
                    textFalse="Decode"
                    textTrue="Encode"
                    checked={isChecked}
                    onChange={text => setIsChecked(!isChecked)}
                />}
            />
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
                    disabled
                    label="Payload"
                    value={payloadText}
                    onChange={(text) => setPayloadText(text.target.value)}
                />
            </div>
            {isChecked && <div className="h-2/10 mt-7">
                <Textarea
                    disabled
                    label="Signature"
                    value={signature}
                    onChange={(text) => setSignature(text.target.value)}
                />
            </div>}
        </div>
    )
}