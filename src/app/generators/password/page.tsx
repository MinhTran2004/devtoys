"use client"
import Accordion from "@/components/accordion";
import PrimaryButton from "@/components/button";
import InputField from "@/components/input-field";
import Switch from "@/components/switch";
import Textarea from "@/components/textarea";
import { useCallback, useEffect, useState } from "react";

export default function PasswordPage() {
    const [inputGenerate, setInputGenerate] = useState(1);
    const [inputLength, setInputLength] = useState(24);
    const [output, setOutput] = useState("");

    const [isLowerCase, setIsLowercase] = useState(true);
    const [isUpperCase, setIsUpperCase] = useState(true);
    const [isDigit, setIsDigit] = useState(true);
    const [isSpecial, setIsSpecial] = useState(true);
    const [excludedChars, setExcludedChars] = useState("");


    const data = [
        {
            title: "Lowercase characters",
            content: "Use lowercase characters (abcdefghijklmnopqrstuvwxyz)",
            iconRight: <Switch textFalse="Off" textTrue="On" checked={isLowerCase} onChange={() => setIsLowercase(!isLowerCase)} />
        },
        {
            title: "Uppercase characters",
            content: "Use uppercase characters (ABCDEFGHIJKLMNOPQRSTUVWXYZ)",
            iconRight: <Switch textFalse="Off" textTrue="On" checked={isUpperCase} onChange={() => setIsUpperCase(!isUpperCase)} />
        },
        {
            title: "Digit characters",
            content: "Use digit characters (0123456789)",
            iconRight: <Switch textFalse="Off" textTrue="On" checked={isDigit} onChange={() => setIsDigit(!isDigit)} />
        },
        {
            title: "Special characters",
            content: "Use special characters (ABCDEFGHIJKLMNOPQRSTUVWXYZ)",
            iconRight: <Switch textFalse="Off" textTrue="On" checked={isSpecial} onChange={() => setIsSpecial(!isSpecial)} />
        },
        {
            title: "Excludedcharacters",
            content: "",
            iconRight: <InputField value={excludedChars} onChange={(text) => setExcludedChars(text.target.value)} />
        }
    ]

    const generatePassword = useCallback(() => {
        if (!isLowerCase && !isUpperCase && !isDigit && !isSpecial && excludedChars.length === 0) return setOutput("Vui lòng chọn ít nhất 1 định dạng");


        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

        let characters = "";
        if (isLowerCase) characters += lowercase;
        if (isUpperCase) characters += uppercase;
        if (isDigit) characters += numbers;
        if (isSpecial) characters += symbols;

        let passwords = [];

        if (excludedChars) {
            for (let i = 0; i < excludedChars.length; i++) {
                characters = characters.replace(excludedChars[i], "");
            }
        }

        for (let j = 0; j < inputGenerate; j++) {
            let password = "";
            for (let i = 0; i < inputLength; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                password += characters[randomIndex];
            }
            passwords.push(password);
        }

        setOutput(passwords.join("\n"));
    }, [inputGenerate, inputLength, isLowerCase, isUpperCase, isDigit, isSpecial, excludedChars]);

    useEffect(() => {
        generatePassword();
    }, [inputGenerate, inputLength, isLowerCase, isUpperCase, isDigit, isSpecial, excludedChars])

    return (
        <div className="h-full w-full overflow-y-hidden">
            <p className="text-2xl mb-2">UUID Generator</p>
            <div className="h-full">
                <Accordion
                    data={data}
                    label="Configuration"
                    title="Length"
                    content="Lowercase"
                    iconRight={<InputField
                        type="number"
                        value={inputLength}
                        onChange={(text) => setInputLength(Number(text.target.value))} />} />

                <label>Generate</label>
                <div className="flex gap-2 items-center">
                    <PrimaryButton
                        onClick={generatePassword}
                        disabled={inputGenerate.toString().length > 0 && Number(inputGenerate) > 0}
                        name="Generate UUID(s)"
                    />
                    <p className="text-sm font-bold">x</p>
                    <InputField
                        value={inputGenerate}
                        type="number"
                        onChange={(text) => setInputGenerate(Number(text.target.value))} />
                </div>

                <div className="w-full h-full mt-4">
                    <Textarea
                        label="UUID(s)"
                        value={output} />
                </div>
            </div>
        </div>
    )
}