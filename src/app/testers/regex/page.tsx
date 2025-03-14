"use client";
import { useCallback, useEffect, useState } from "react";
import Textarea from "@/components/textarea";
import InputField from "@/components/input-field";
import Table from "@/components/table";

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

export default function RegexPage() {
  const [inputText, setInputText] = useState("");
  const [inputReguler, setInputRegular] = useState("");
  const [result, setResult] = useState("");

  const handleTestRegex = useCallback(() => {
    if (inputReguler.trim().length > 0 && inputText.trim().length > 0) {
      try {
        const regex = new RegExp(inputReguler.trim());
        
        const matchResult = regex.test(inputText.trim());
        setResult(matchResult ? "Dữ liệu Khớp" : "Không khớp dữ liệu");
      } catch (e) {
        setResult('Lỗi');
      }
    }else{
      setResult("")
    }
  },[inputText, inputReguler]);

  useEffect(() => {
    handleTestRegex();
  }, [inputText, inputReguler, handleTestRegex])

  return (
    <div className="h-full w-full">
      <p className="text-2xl mb-2">Regular Expression Tester</p>

      <div className="grid grid-cols-2 h-full gap-3">
        <div className="h-full flex flex-col gap-3">
          <InputField
            label="Regular expression"
            value={inputReguler}
            onChange={(text) => setInputRegular(text.target.value)}
          />
          <div className="h-13/15">
            <Textarea
              label="Text"
              value={inputText}
              onChange={(text) => setInputText(text.target.value)} />
          </div>
        </div>
        <div className="grid grid-rows-[45%_55%] gap-7">
          <Table data={data} label="Cheat sheet"/>
          <div className="h-12/15">
            <Textarea
              disabled
              label="Output"
              value={result} />
          </div>
        </div>
      </div>
      <p>{result}</p>
    </div>
  );
}
