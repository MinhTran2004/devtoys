"use client"

import { useCallback, useEffect, useState } from "react";
import Textarea from "@/components/textarea";
import Table from "@/components/table";

export default function JsonTablePage() {
    const [input, setInput] = useState<any>("");
    const [output, setOutput] = useState<any>([]);

    const handleConvertJSON = useCallback(() => {
        if (input.trim()) {
            try {
                const parsedData = JSON.parse(input);
                if (Array.isArray(parsedData)) {
                    setOutput(parsedData);
                } else {
                    setOutput('Dữ liệu không phải là một mảng JSON hợp lệ!');
                }
            } catch (error) {
                setOutput('Định dạng JSON không hợp lệ!');
            }
        } else {
            setOutput("");
        }
    }, [input]);

    useEffect(() => {
        handleConvertJSON();
    }, [input]);

    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-2">JSON Array to Table</p>
            <div className={"grid grid-cols-1 gap-5 h-full mt-8 lg:grid-cols-2"}>
                <div className="h-14/15">
                    <Textarea
                        label="Input"
                        value={input}
                        placeholder="[ ]"
                        onChange={text => setInput(text.target.value)}
                    />
                </div>
                <div className="h-8/9">
                    <Table
                        data={output}
                        label="Output"
                    />
                </div>
            </div>
        </div>
    )
}