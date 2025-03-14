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

      <Accordion
        iconLeft={<CurrencyExchangeIcon />}
        title="Inline mode"
        content="Select wich theme to use to preview the Markdown"
        iconRight={<Switch disabled textFalse="Off" textTrue="On" checked={isChecked} onChange={text => setIsChecked(!isChecked)} />} />

      <div className="h-3/8 grid grid-cols-2 gap-x-5">
        <Textarea
          label="Original text"
          value={inputOriginal}
          onChange={(text) => setInputOriginal(text.target.value)}
        />

        <Textarea
          label="Modified text"
          value={inputModified}
          onChange={(text) => setInputModified(text.target.value)}
        />
      </div>

      <div className="h-4/8 grid grid-cols-2 mt-5 gap-x-5">
        <div className="h-11/12">
          <Textarea
            disabled
            label="Difference"
            value={inputOriginal}
          />
        </div>

        <div>
          <label className="text-sm text-[#bbbbbb]">Difference</label>
          <pre className="bg-[#333333] h-13/15 rounded-lg pt-2 pl-3">{renderDiff(output)}</pre>
        </div>
      </div>

    </div>
  )
}