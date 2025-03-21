"use client"
import React, { useEffect, useState } from "react";
import Accordion from "@/components/accordion";
import Switch from "@/components/switch";
import DropDown from "@/components/drop-down";
import json5 from "json5";
import Textarea from "@/components/textarea";

const data = ["2 spaces", "4 spaces", "1 tabs", "Minified"]

export default function JSONPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [selectItemDropDown, setSelectItemDropDown] = useState("2 spaces");

    const sortObject = (obj: any): any => {
        if (typeof obj !== "object" || obj === null) return obj;
        if (Array.isArray(obj)) return obj.map(sortObject);
        const sortedObj: any = {};
        Object.keys(obj)
            .sort()
            .forEach((key) => {
                sortedObj[key] = sortObject(obj[key]);
            });
        return sortedObj;
    };

    const sortArray = (arr: any[]) => {
        return arr.map((item) => {
            if (typeof item === "object") {
                return sortObject(item);
            }
            return item;
        }).sort();
    };

    const formatJson = () => {
        try {
            if (input) {
                const parsedJson = json5.parse(input);
                const sortedJson = Array.isArray(parsedJson) ? sortArray(parsedJson) : sortObject(parsedJson);
                let prettyJson;
                switch (selectItemDropDown) {
                    case "2 spaces": prettyJson = JSON.stringify(isChecked ? sortedJson : parsedJson, null, 2); break;
                    case "4 spaces": prettyJson = JSON.stringify(isChecked ? sortedJson : parsedJson, null, 4); break;
                    case "1 tab": prettyJson = JSON.stringify(isChecked ? sortedJson : parsedJson, null, '\t'); break;
                    case "Minified": prettyJson = JSON.stringify(isChecked ? sortedJson : parsedJson); break;
                    default: prettyJson = JSON.stringify(isChecked ? sortedJson : parsedJson, null, 2); break;
                }
                setOutput(prettyJson);
            } else {
                setInput("")
            }
        } catch (err) {
            console.log(err);
            setOutput("Lỗi định dạng");
        }
    };

    useEffect(() => {
        setOutput("");
        formatJson();
    }, [input, formatJson])

    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-2">JSON Formatter</p>
            <Accordion
                title="Indentation"
                iconRight={<DropDown
                    data={data}
                    selectItemDropDown={selectItemDropDown}
                    onSelectItemDropDown={setSelectItemDropDown}
                />}
            />
            <Accordion
                title="Sort JSON Properties alphabetically"
                iconRight={<Switch
                    textTrue="On"
                    textFalse="Off"
                    checked={isChecked}
                    onChange={text => setIsChecked(!isChecked)}
                />}
            />
            <div className="grid grid-cols-1 gap-3 h-8/10 lg:grid-cols-2">
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