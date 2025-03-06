"use client"
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import Accordion from "@/components/accordion";
import Toogle from "@/components/accordion/toogle";
import Menu from "@/components/accordion/menu";
import json5 from "json5";

const data = ["2 spaces", "4 spaces", "1 tabs", "Minified"]

export default function JSONPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [selectItemMenu, setSelectItemMenu] = useState("");

    // Hàm để sắp xếp các đối tượng theo tên khóa
    const sortObject = (obj: any) => {
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

                switch (selectItemMenu) {
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
        <div className={styles.container}>
            <p style={{
                fontSize: 20,
                fontWeight: 500
            }}>JSON Formatter</p>

            <Accordion title="Indentation" iconRight={<Menu data={data} selectItemMenu={selectItemMenu} onSelectItemMenu={setSelectItemMenu} />} />
            <Accordion
                title="Sort JSON Properties alphabetically"
                iconRight={<Toogle textTrue="On" textFalse="Off" onChangeValue={setIsChecked} />} />

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
                        disabled
                        className={styles.textarea}
                        value={output}
                        onChange={() => { }}
                    />
                </div>
            </div>

        </div>
    )
}