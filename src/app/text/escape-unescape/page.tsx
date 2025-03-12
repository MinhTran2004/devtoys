"use client"
import Accordion from "@/components/accordion";
import { useCallback, useEffect, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Toogle from "@/components/switch";
import Textarea from "@/components/textarea";

export default function EscapeUnescapePage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const [isChecked, setIsChecked] = useState(false);

     // Hàm để Escape văn bản (mã hóa các ký tự đặc biệt)
  const handleEscape = useCallback(() => {
    // Escape các ký tự đặc biệt trong chuỗi như dấu nháy kép, dấu nháy đơn, ...
    const escapedText = input.replace(/["'\\]/g, (match) => {
      switch (match) {
        case '"':
          return '\\"';
        case "'":
          return "\\'";
        case "\\":
          return '\\\\';
        default:
          return match;
      }
    });
    setOutput(escapedText);
  },[input]);

  // Hàm để Unescape văn bản (giải mã các ký tự escape)
  const handleUnescape = useCallback(() => {
    // Giải mã chuỗi escape thành chuỗi ban đầu
    try {
      const unescapedText = JSON.parse(`"${input}"`); // Dùng JSON.parse để giải mã chuỗi escape
      setOutput(unescapedText);
    } catch (error) {
      setOutput("Invalid escape sequence"); // Nếu giải mã thất bại
    }
  }, [input]);

  useEffect(() => {
    if (isChecked) {
        handleUnescape();
    }else{
        handleEscape();
    }
  }, [input, isChecked]);

    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-2">Text Escape / Unescape</p>

            <Accordion
                iconLeft={<CurrencyExchangeIcon />}
                title="Conversion"
                content="Select wich conversion mode you want to use"
                iconRight={<Toogle textFalse="Unescape" textTrue="Escape" checked={isChecked} onChange={text => setIsChecked(!isChecked)} />} />

            <div className="h-7/8 grid grid-rows-2 gap-2">
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