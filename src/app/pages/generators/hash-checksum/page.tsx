"use client"

import Accordion from "@/components/accordion";
import DropDown from "@/components/drop-down";
import DropImage from "@/components/drop-imge";
import InputField from "@/components/input-field";
import Textarea from "@/components/textarea";
import { useCallback, useEffect, useState } from "react";
import CryptoJS from 'crypto-js';

const dataHasihng = ["MD5", "SHA1", "SHA256", "SHA384", "SHA512"];

export default function HashCheckSumPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [checksum, setCheckSum] = useState("");
    const [selectItemDropDown, setSelectItemDropDown] = useState("MD5");

    const generateHash = useCallback(() => {
        let hash: string = '';
        switch (selectItemDropDown) {
            case 'MD5':
                hash = CryptoJS.MD5(input).toString();
                break;
            case 'SHA1':
                hash = CryptoJS.SHA1(input).toString();
                break;
            case 'SHA256':
                hash = CryptoJS.SHA256(input).toString();
                break;
            case 'SHA384':
                hash = CryptoJS.SHA384(input).toString();
                break;
            case 'SHA512':
                hash = CryptoJS.SHA512(input).toString();
                break;
            default:
                hash = '';
                break;
        }
        setOutput(hash);
    }, [input, selectItemDropDown]);

    useEffect(() => {
        generateHash();
    }, [input, selectItemDropDown])

    const generateHashFromFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;

        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const data = reader.result as ArrayBuffer;
            const wordArray = CryptoJS.lib.WordArray.create(data);
            let hash: string = '';

            switch (selectItemDropDown) {
                case 'MD5':
                    hash = CryptoJS.MD5(wordArray).toString();
                    break;
                case 'SHA1':
                    hash = CryptoJS.SHA1(wordArray).toString();
                    break;
                case 'SHA256':
                    hash = CryptoJS.SHA256(wordArray).toString();
                    break;
                case 'SHA384':
                    hash = CryptoJS.SHA384(wordArray).toString();
                    break;
                case 'SHA512':
                    hash = CryptoJS.SHA512(wordArray).toString();
                    break;
                default:
                    hash = '';
                    break;
            }
            setOutput(hash);
        };
        reader.readAsArrayBuffer(file);
    }, [selectItemDropDown]);

    return (
        <div className="h-full w-full overflow-y-hidden">
            <p className="text-2xl mb-2">Lorem Ipsum Generator</p>
            <Accordion
                label="Configuration"
                title="Text corpus"
                content="Select which hashing alforithm tou want to use"
                iconRight={<DropDown
                    data={dataHasihng}
                    selectItemDropDown={selectItemDropDown}
                    onSelectItemDropDown={setSelectItemDropDown}
                />}
            />

            <div className="flex w-full h-2/10 justify-between items-center mt-1">
                <div className="w-5/10 h-full">
                    <Textarea
                        label="Input Text"
                        value={input}
                        onChange={(text) => setInput(text.target.value)}
                    />
                </div>
                <p className="mx-2">or</p>
                <div className="w-5/10 h-6/7 mr-1 mt-9">
                    <DropImage
                        onChange={generateHashFromFile}
                        styleLayout={{ height: '100%' }}
                    />
                </div>
            </div>
            <br />
            <InputField
                disabled
                label="Output"
                value={output}
            />
            <br />
            <InputField
                label="Checksum to verify data integrity"
                value={checksum}
                onChange={(text) => setCheckSum(text.target.value)}
            />
        </div>
    )
}