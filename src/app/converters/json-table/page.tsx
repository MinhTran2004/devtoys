"use client"
import { useEffect, useState } from "react";

import Textarea from "@/components/textarea";
import Table from "@/components/table";

const dataTable = [
    { name: "John", age: 30, city: "New York" },
    { name: "Jane", age: 25, city: "Los Angeles" },
    { name: "Mike", age: 35, city: "Chicago" }
]

export default function JsonTablePage() {
    const [input, setInput] = useState<any>();
    const [output, setOutput] = useState<any>([]);

    const handleSubmit = () => {
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
      };

    //   useEffect(() => {
    //     handleSubmit()
    //   }, [input])

    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-2">URL Encoders / Decoders</p>

            <div className={"grid grid-cols-2 gap-5 h-full mt-8"}>
                <Textarea
                    label="Input"
                    value={input}
                    placeholder="[ ]"
                    onChange={text => setInput(text.target.value)}
                />
                <div className="h-8/9">
                    <Table data={output} label="Output" />
                </div>
            </div>
        </div>
    )
}