"use client"
import Accordion from "@/components/accordion";
import DropDown from "@/components/drop-down";
import Switch from "@/components/switch";
import Textarea from "@/components/textarea";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

const data = ["2 spaces", "4 spaces", "1 tabs", "Minified"]

export default function XMLPage() {
    const [selectItemDropDown, setSelectItemDropDown] = useState("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");


    const formatXml = (xmlString: string): string => {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "application/xml");

            const serializer = new XMLSerializer();
            const formatted = serializer.serializeToString(xmlDoc);
            return formatted;
        } catch (error) {
            return "Invalid XML";
        }
    };

    const convertXML = () => {
        if (input.length > 0) {
            const formatted = formatXml(input);
            setOutput(formatted);
            console.log(formatted);
        }else{
            setOutput("")
        }
    };

    useEffect(() => {
        convertXML()
    }, [input]);








    return (
        <div className="layout">
            <p className="title">JSON {"<>"} YAML Converter</p>

            <Accordion
                title="Indentation"
                iconRight={<DropDown data={data} selectItemDropDown={selectItemDropDown} setSelectItemDropDown={setSelectItemDropDown} />} />

            <Accordion
                title="Put attributes on a new line"
                content="Whether to put attributes on a new line"
                iconRight={<Switch textFalse="Off" textTrue="On"/>} />

            <div className={styles.content}>
                <Textarea
                    label="Input"
                    value={input}
                    onChange={text => setInput(text.target.value)} />

                <Textarea
                    disabled
                    label="Output"
                    value={output} />
            </div>
        </div>
    )
}