"use client"
import Accordion from "@/components/accordion";
import { useEffect, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Textarea from "@/components/textarea";
import Switch from "@/components/switch";
import { diffChars } from "diff";

export default function ComparePage() {
  const [inputOriginal, setInputOriginal] = useState("");
  const [inputModified, setInputModified] = useState("");
  const [output, setOutput] = useState<any>([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (inputOriginal && inputModified) {
      const result = diffChars(inputOriginal, inputModified);
      setOutput(result);
    }
  }, [inputOriginal, inputModified]);

  const renderDiff = (diff: any) => {
    return diff.map((part: any, index: number) => {
      if (part.added) {
        return (
          <span key={index} style={{ color: "green" }}>
            {part.value}
          </span>
        );
      }
      if (part.removed) {
        return (
          <span key={index} style={{ color: "red" }}>
            {part.value}
          </span>
        );
      }
      return <span key={index}>{part.value}</span>;
    });
  };

  return (
    <div className="h-full w-full" >
      <p className="text-2xl mb-2">Text Compare</p>
      

    </div>
  )
}