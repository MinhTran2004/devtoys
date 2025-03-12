"use client"
import Accordion from "@/components/accordion";
import { useCallback, useEffect, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Toogle from "@/components/switch";
import Textarea from "@/components/textarea";
import pako from "pako";

// Hàm mã hóa mảng byte thành Base64
const toBase64 = (byteArray: Uint8Array) => {
    const binaryString = String.fromCharCode.apply(null, Array.from(byteArray)); // Chuyển mảng byte thành chuỗi nhị phân
    return window.btoa(binaryString); // Chuyển chuỗi nhị phân thành Base64
  };
  
  // Hàm giải mã Base64 thành mảng byte
  const fromBase64 = (base64String: string) => {
    const binaryString = window.atob(base64String); // Giải mã Base64 thành chuỗi nhị phân
    const byteArray = new Uint8Array(binaryString.length); // Tạo mảng byte
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i); // Chuyển chuỗi nhị phân thành mảng byte
    }
    return byteArray;
  };

export default function GzipPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const [isChecked, setIsChecked] = useState(false);

    const handleCompress = useCallback(() => {
        if (input) {
            try {
                const compressed = pako.gzip(input);  // Nén chuỗi văn bản thành mảng byte (Uint8Array)
                const base64String = toBase64(compressed);  // Mã hóa mảng byte thành Base64
                setOutput(base64String);  // Hiển thị chuỗi Base64
              } catch (error) {
                setOutput('Compression failed');
              }
        }else{
            setOutput("")
        }
      }, [input]);
    
      // Hàm giải nén dữ liệu Base64 thành mảng byte và chuyển lại thành chuỗi văn bản
      const handleDecompress = useCallback(() => {
        if (input) {
            try {
                const byteArray = fromBase64(input);  // Giải mã Base64 thành mảng byte
                const decompressed = pako.ungzip(byteArray, { to: 'string' });  // Giải nén mảng byte thành chuỗi văn bản
                setOutput(decompressed);  // Hiển thị chuỗi văn bản đã giải nén
              } catch (error) {
                setOutput('Decompression failed');
              }
        }else{
            setOutput("")
        }
      }, [input]);

      useEffect(() => {
        if (isChecked) {
            handleCompress();
        }else{
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
                iconRight={<Toogle textFalse="Decompress" textTrue="Compress" checked={isChecked} onChange={text => setIsChecked(!isChecked)} />} />

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