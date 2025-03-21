"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import Accordion from "@/components/accordion";
import DropDown from "@/components/drop-down";
import Textarea from "@/components/textarea";
import yaml from 'js-yaml';

const dataConversion = ["JSON to YAML", "YAML to JSON"];
const dataindentation = ["2 spaces", "4 spaces"];

export default function JSONYAMLPage() {
    const [input, setInput] = useState("");
    const [selectItemConversion, setSelectItemConversion] = useState("JSON to YAML");
    const [selectItemIndentation, setSelectItemIndentation] = useState("2 spaces");

    const output = useMemo(() => {
        if (input.length > 0) {
            try {
                if (selectItemConversion === "JSON to YAML") {
                    const json = JSON.parse(input);
                    return yaml.dump(json, { indent: selectItemIndentation === "2 spaces" ? 2 : 4 });
                } else {
                    const json = yaml.load(input);
                    return JSON.stringify(json, null, selectItemIndentation === "2 spaces" ? 2 : 4);
                }
            } catch (err) {
                return (input.length !== 0 && 'Lỗi định dạng');
            }
        } else {
            return "";
        }
    }, [input, selectItemConversion, selectItemIndentation]);

    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-2">JSON {"< >"} YAML Converter</p>
            <Accordion
                label="Configurasion"
                title="Conversion"
                content="Select which conversion mode you want to use"
                iconRight={<DropDown
                    data={dataConversion}
                    selectItemDropDown={selectItemConversion}
                    onSelectItemDropDown={setSelectItemConversion}
                />}
            />
            <Accordion
                title="Indentation"
                iconRight={<DropDown
                    data={dataindentation}
                    selectItemDropDown={selectItemIndentation}
                    onSelectItemDropDown={setSelectItemIndentation} />}
            />
            <div className="grid grid-cols-1 gap-3 h-11/15 lg:grid-cols-2 mt-3">
                <Textarea
                    label="Input"
                    value={input}
                    onChange={(text) => setInput(text.target.value)}
                />
                <Textarea
                    disabled
                    label="Output"
                    value={output || ""}
                />
            </div>
        </div>
    )
}