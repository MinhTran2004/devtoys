"use client"
import { useCallback, useEffect, useState } from "react";

import Accordion from "@/components/accordion";
import Switch from "@/components/switch";
import InputField from "@/components/input-field";

export default function JsonTablePage() {
    const [isFormat, setIsFormat] = useState(true);
    const [isMode, setIsMode] = useState(false);

    const [inputValue, setInputValue] = useState<string>("");
    const [hexadecimal, setHexadecimal] = useState("");
    const [decimal, setDecimal] = useState("");
    const [octal, setOctal] = useState("");
    const [binary, setBinary] = useState("");

    const handleInputChange = useCallback((value: string) => {
        setInputValue(value);
        // Xử lý trường hợp người dùng nhập giá trị Hexadecimal
        if (/^[0-9A-Fa-f]+$/.test(value)) {
            const decimalValue = parseInt(value, 16);
            setDecimal(decimalValue.toString(10));
            setOctal(decimalValue.toString(8));
            setBinary(formatBinary(decimalValue.toString(2)));
            setHexadecimal(value.toUpperCase());
        }
        // Xử lý trường hợp người dùng nhập giá trị Decimal
        else if (/^\d+$/.test(value)) {
            const decimalValue = parseInt(value, 10);
            setDecimal(value);
            setHexadecimal(decimalValue.toString(16).toUpperCase());
            setOctal(decimalValue.toString(8));
            setBinary(formatBinary(decimalValue.toString(2)));
        }
        // Xử lý trường hợp người dùng nhập giá trị Octal
        else if (/^[0-7]+$/.test(value)) {
            const decimalValue = parseInt(value, 8);
            setOctal(value);
            setDecimal(decimalValue.toString(10));
            setHexadecimal(decimalValue.toString(16).toUpperCase());
            setBinary(formatBinary(decimalValue.toString(2)));
        }
        // Xử lý trường hợp người dùng nhập giá trị Binary
        else if (/^[01]+$/.test(value)) {
            // Đảm bảo rằng nhị phân luôn được chuẩn hóa
            const decimalValue = parseInt(value, 2);
            setBinary(formatBinary(value));
            setDecimal(decimalValue.toString(10));
            setHexadecimal(decimalValue.toString(16).toUpperCase());
            setOctal(decimalValue.toString(8));
        } else {
            // Nếu không hợp lệ, reset tất cả
            setDecimal("");
            setHexadecimal("");
            setOctal("");
            setBinary("");
        }
    }, [inputValue, isFormat]);

    const formatBinary = useCallback((binary: string) => {
        if (isFormat) {
            const paddedBinary = binary.padStart(Math.ceil(binary.length / 4) * 4, '0');
            return paddedBinary.replace(/(.{4})(?=.)/g, "$1 ");
        } else {
            return binary;
        }
    }, [isFormat]);

    useEffect(() => {
        handleInputChange(inputValue);
    }, [isFormat])


    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-8">Number Base Converter </p>

            <Accordion
                label="Configration"
                title="Format number"
                iconRight={<Switch textFalse="Off" textTrue="On" checked={isFormat} onChange={text => setIsFormat(!isFormat)} />} />

            <Accordion
                title="Advenced mode"
                iconRight={<Switch disabled textFalse="Off" textTrue="On" checked={isMode} onChangeStatus={setIsMode} />} />

            <div className="flex flex-col mt-10 gap-5">
                <InputField
                    label="Hexadecimal"
                    value={hexadecimal}
                    onChange={text => handleInputChange(text.target.value)} />

                <InputField
                    label="Decimal"
                    value={decimal}
                    onChange={text => handleInputChange(text.target.value)} />

                <InputField
                    label="Octal"
                    value={octal}
                    onChange={text => handleInputChange(text.target.value)} />

                <InputField
                    label="Binary"
                    value={binary}
                    onChange={text => handleInputChange(text.target.value)} />
            </div>
        </div>
    )
}
