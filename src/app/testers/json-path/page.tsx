"use client";

import { useCallback, useState, useEffect } from "react";
import { JSONPath } from "jsonpath-plus";
import Textarea from "@/components/textarea";
import InputField from "@/components/input-field";
import Table from "@/components/table";

const data = [
  { "Syntax": "$", "Description": "The root object or array." },
  { "Syntax": "@", "Description": "Used for filter expressions. Refers to the current node for further processing." },
  { "Syntax": "object.property", "Description": "Dot-notated child" },
  { "Syntax": "['object'].['property']", "Description": "Bracket-noted child or children" },
  { "Syntax": "..property", "Description": "Performs a deep scan for the specified property in all available objects." },
  { "Syntax": "*", "Description": "Wildcard. Selects all elements in an object or array." },
  { "Syntax": "[n]", "Description": "Selects the n-th element from an array. Indexes start from 0." },
  { "Syntax": "[n1, n2]", "Description": "Selects n1 and n2 array items. Returns a list." },
  { "Syntax": "[start:end:step]", "Description": "Array slice operator." },
  { "Syntax": "?(expression)", "Description": "Selects all elements in an object or array that match the specified boolean expression." },
  { "Syntax": "(expression)", "Description": "Script expression" },
]

export default function JSONPathTester() {
  const [input, setInput] = useState("");
  const [inputJSONPath, setInputJSONPath] = useState("");
  const [result, setResult] = useState<string>("");

  const handleTestJSONPath = useCallback(() => {
    try {
      const jsonObject = JSON.parse(input);
      const queryResult = JSONPath({ path: inputJSONPath, json: jsonObject });
      setResult(JSON.stringify(queryResult, null, 2));
    } catch (err) {
      setResult("Lỗi cú pháp JSON hoặc JSONPath không hợp lệ");
    }
  }, [input, inputJSONPath]);

  useEffect(() => {
    handleTestJSONPath();
  }, [input, inputJSONPath]);

  return (
    <div className="h-full w-full">
      <p className="text-2xl mb-2">JSONPath Tester</p>
      <div className="grid grid-cols-2 h-full gap-3">
        <div className="h-24/25">
          <Textarea
            label="JSON"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="h-27/30 flex flex-col gap-2">
          <InputField
            label="JSONPath"
            value={inputJSONPath}
            onChange={(e) => setInputJSONPath(e.target.value)}
          />
          <div className="h-5/10">
            <Textarea
              label="Test result"
              value={result}
              onChange={(e) => setResult(e.target.value)}
            />
          </div>
          <div className="h-14/25 mt-2">
            <Table
              data={data}
              label="Cheat sheet" />
          </div>
        </div>
      </div>
      <p>{result}</p>
    </div>
  );
}
