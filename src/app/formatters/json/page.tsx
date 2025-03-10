"use client"
import styles from "./page.module.css";
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
    const [selectItemDropDown, setSelectItemDropDown] = useState("");

    // Hàm để sắp xếp các đối tượng theo tên khóa
    const sortObject = (obj: any): any => {
        if (typeof obj !== "object" || obj === null) return obj; // Không cần sắp xếp nếu không phải là đối tượng

        if (Array.isArray(obj)) {
            // Nếu là mảng, không thay đổi cấu trúc mảng, chỉ sắp xếp nội dung bên trong
            return obj.map(sortObject); // Đệ quy để sắp xếp các phần tử trong mảng
        }

        const sortedObj: any = {};
        Object.keys(obj)
            .sort() // Sắp xếp các khóa theo chữ cái
            .forEach((key) => {
                sortedObj[key] = sortObject(obj[key]); // Đệ quy để sắp xếp các đối tượng lồng nhau
            });
        return sortedObj;
    };

    // Hàm để sắp xếp mảng các đối tượng (nếu có)
    const sortArray = (arr: any[]) => {
        return arr.map((item) => {
            if (typeof item === "object") {
                return sortObject(item); // Nếu phần tử là đối tượng, gọi hàm sortObject
            }
            return item;
        }).sort(); // Sắp xếp mảng
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
        <div className="layout">
            <p className="title">JSON Formatter</p>

            <Accordion title="Indentation" iconRight={<DropDown data={data} selectItemDropDown={selectItemDropDown} setSelectItemDropDown={setSelectItemDropDown} />} />
            <Accordion
                title="Sort JSON Properties alphabetically"
                iconRight={<Switch textTrue="On" textFalse="Off" onChangeValue={setIsChecked} />} />

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