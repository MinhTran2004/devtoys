"use client";
import { useCallback, useEffect, useState } from "react";
import Textarea from "@/components/textarea";
import InputField from "@/components/input-field";
import Table from "@/components/table";
import JSONPath from 'jsonpath';

const data = [
  { "Syntax": "$", "Description": "The root object or array." },
  { "Syntax": "@", "Description": "Used for filter expressions. Refres to the current node for further processing." },
  { "Syntax": "object.property", "Description": "Dot-notated child" },
  { "Syntax": "['object'].['property']", "Description": "Bracket-noted child or children" },
  { "Syntax": "..property", "Description": "Performs a deep scan for the specified property in all available objects." },
  { "Syntax": "*", "Description": "Wildcard. Selects all elemant in an object or array." },
  { "Syntax": "[n]", "Description": "Selects the n-th element from an array. Indexes start from 0." },
  { "Syntax": "[n1, n2]", "Description": "Selects n1 and n2 array items. Returns a list." },
  { "Syntax": "[start:end:step]", "Description": "Array slice operator." },
  { "Syntax": "?(expression)", "Description": "Selects all elemants in an object or array taht match the specified boolean expression." },
  { "Syntax": "(expression)", "Description": "Script expression" },
]


export default function XMLPage() {
  const [input, setInput] = useState("");
  const [inputJSONPath, setInputJSonPath] = useState("");
  const [result, setResult] = useState("");


  const handleTestJSONPath = useCallback(() => {
    try {
      let jsonObject;
      try {
        jsonObject = JSON.parse(input);
      } catch (e) {
        throw new Error('Cú pháp JSON không hợp lệ');
      }

      let queryResult;
      try {
        queryResult = JSONPath.query(jsonObject, inputJSONPath);
      } catch (e) {
        throw new Error('Cú pháp JSONPath không hợp lệ');
      }

      setResult(JSON.stringify(queryResult, null, 2));
    } catch (e: any) {
      console.log(e);
      setResult("");
    }
  }, [input, inputJSONPath]);

  useEffect(() => {
    handleTestJSONPath();
  }, [input, inputJSONPath])

  return (
    <div className="h-full w-full">
      <p className="text-2xl mb-2">JSONPath Tester</p>

      <div className="grid grid-cols-2 h-full gap-3">
        <div className="h-24/25">
          <Textarea
            label="XSD"
            value={input}
            onChange={(text) => setInput(text.target.value)}
          />
        </div>

        <div className="h-27/30 flex flex-col gap-2">
          <InputField
            label="JSONPath"
            value={inputJSONPath}
            onChange={(text) => setInputJSonPath(text.target.value)}
          />
          <div className="h-5/10">
            <Textarea
              label="Test result"
              value={result}
              onChange={(text) => setResult(text.target.value)}
            />
          </div>

          <div className="h-14/25">
            <Table data={data} label="hihi" />

          </div>
        </div>
      </div>
      <p>{result}</p>
    </div>
  );
}
