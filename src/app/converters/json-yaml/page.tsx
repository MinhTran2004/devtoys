"use client"
import { useCallback, useEffect, useState } from "react";
import Accordion from "@/components/accordion";
import DropDown from "@/components/drop-down";
import Textarea from "@/components/textarea";
import yaml from 'js-yaml';

const dataConversion = ["JSON to YAML", "YAML to JSON"];
const dataindentation = ["2 spaces", "4 spaces"];

export default function JSONYAMLPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [selectItemConversion, setSelectItemConversion] = useState("JSON to YAML");
    const [selectItemIndentation, setSelectItemIndentation] = useState("2 spaces");

    // Chuyển JSON sang YAML
    const handleJsonToYaml =  useCallback(() => {
        try {
            const json = JSON.parse(input);  // Chuyển đổi JSON string thành object
            const yamlString = yaml.dump(json, {indent: selectItemIndentation === "2 spaces" ? 2 : 4}); // Chuyển object thành YAML
            setOutput(yamlString);
        } catch (error) {
            setOutput('Invalid JSON input');
        }
    }, [input, selectItemIndentation]);

    // Chuyển YAML sang JSON
    const handleYamlToJson = useCallback(() => {
        try {
            const json = yaml.load(input); // Chuyển YAML string thành object
            setOutput(JSON.stringify(json, null, selectItemIndentation === "2 spaces" ? 2 : 4)); // Chuyển object thành JSON với indent
        } catch (error) {
            setOutput('Invalid YAML input');
        }
    }, [input,selectItemIndentation]);

    useEffect(() => {
        if (selectItemConversion === "JSON to YAML") {
            handleJsonToYaml();
        }else{
            handleYamlToJson();
        }
    }, [input, selectItemConversion, selectItemIndentation])


    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-2">JSON {"< >"} YAML Converter</p>

            <Accordion
                label="Configurasion"
                title="Conversion"
                content="Select which conversion mode you want to use"
                iconRight={<DropDown data={dataConversion} selectItemDropDown={selectItemConversion} onSelectItemDropDown={setSelectItemConversion} />} />

            <Accordion
                title="Indentation"
                iconRight={<DropDown data={dataindentation} selectItemDropDown={selectItemIndentation} onSelectItemDropDown={setSelectItemIndentation} />} />

            <div className="grid grid-cols-1 gap-3 h-4/5 lg:grid-cols-2 mt-3">
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