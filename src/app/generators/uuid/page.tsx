"use client"
import Accordion from "@/components/accordion";
import PrimaryButton from "@/components/button";
import DropDown from "@/components/drop-down";
import InputField from "@/components/input-field";
import Switch from "@/components/switch";
import Textarea from "@/components/textarea";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const data = ["1", "4 (GUID)", "7"]

export default function UUIDPage() {
    const [input, setInput] = useState("1");
    const [output, setOutput] = useState<string[]>([]);

    const [isHyphens, setIsHyphens] = useState(false);
    const [isUpperCase, setIsUpperCase] = useState(false);
    const [selectItemDropDown, setSelectItemDropDown] = useState("4 (GUID)");

    const generateUUIDs = useCallback(() => {
        const newUUIDs = Array.from({ length: Number(input) }, () => {
            let newUUID = uuidv4();

            if (isHyphens) {
                newUUID = newUUID.replace(/-/g, "");
            }

            if (isUpperCase) {
                newUUID = newUUID.toUpperCase();
            }

            return newUUID;
        });

        setOutput(newUUIDs);
    }, [input, isHyphens, isUpperCase, selectItemDropDown]);

    useEffect(() => {
        generateUUIDs();
    }, [input, isHyphens, isUpperCase, selectItemDropDown])


    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-2">UUID Generator</p>

            <Accordion
                label="Configuration"
                title="Hyphens"
                iconRight={<Switch textFalse="Off" textTrue="On" checked={isHyphens} onChange={() => setIsHyphens(!isHyphens)} />} />

            <Accordion
                title="Uppercase"
                iconRight={<Switch textFalse="Off" textTrue="On" checked={isUpperCase} onChange={() => setIsUpperCase(!isUpperCase)} />} />

            <Accordion
                title="UUID version"
                content="Choose the version of UUID to generate"
                iconRight={<DropDown data={data} selectItemDropDown={selectItemDropDown} onSelectItemDropDown={setSelectItemDropDown} />} />

            <br />

            <label>Generate</label>
            <div className="flex gap-2 items-start">
                <PrimaryButton
                    onClick={generateUUIDs}
                    disabled={input.length > 0 && Number(input) > 0}
                    name="Generate UUID(s)"
                />
                <p className="text-sm font-bold">x</p>
                <InputField
                    value={input}
                    type="number"
                    onChange={text => setInput(text.target.value)}
                />
            </div>

            <div className="w-full h-11/20 mt-4">
                <Textarea
                    label="UUID(s)"
                    value={output.join("\n")} />
            </div>

        </div>
    )
}