"use client"
import Accordion from "@/components/accordion";
import { useCallback, useEffect, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Toogle from "@/components/switch";
import Textarea from "@/components/textarea";
import pako from "pako";

export default function GzipPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const toBase64 = useCallback((byteArray: Uint8Array) => {
    const binaryString = String.fromCharCode.apply(null, Array.from(byteArray));
    return window.btoa(binaryString);
  }, [input, isChecked]);

  const fromBase64 = useCallback((base64String: string) => {
    const binaryString = window.atob(base64String);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    return byteArray;
  }, [input, isChecked]);

  const handleCompress = useCallback(() => {
    if (input) {
      try {
        const compressed = pako.gzip(input);
        const base64String = toBase64(compressed);
        setOutput(base64String);
      } catch (error) {
        setOutput('Compression failed');
      }
    } else {
      setOutput("")
    }
  }, [input, isChecked]);

  const handleDecompress = useCallback(() => {
    if (input) {
      try {
        const byteArray = fromBase64(input);
        const decompressed = pako.ungzip(byteArray, { to: 'string' });
        setOutput(decompressed);
      } catch (error) {
        setOutput('Decompression failed');
      }
    } else {
      setOutput("")
    }
  }, [input, isChecked]);

  useEffect(() => {
    if (isChecked) {
      handleCompress();
    } else {
      handleDecompress();
    }
  }, [input, isChecked])

  return (
    <div className="h-full w-full">
      <p className="text-2xl mb-2">GZip Compress / Decompress</p>
      <Accordion
        iconLeft={<CurrencyExchangeIcon />}
        title="Conversion"
        content="Select wich conversion mode you want to use"
        iconRight={<Toogle
          textFalse="Decompress"
          textTrue="Compress"
          checked={isChecked}
          onChange={text => setIsChecked(!isChecked)}
        />}
      />
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