"use client";
import DropDown from "@/components/drop-down";
import InputField from "@/components/input-field";
import { useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export default function ScanVirusFilePage() {
    const [input, setInput] = useState<number>(1);
    const [output, setOutput] = useState<number>(0);
    const [baseCode, setBaseCode] = useState<string>("USD");
    const [targetCode, setTargetCode] = useState<string>("VND");
    const [listCurrency, setListCurrency] = useState<string[]>([]);


    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-2">Crypto Currency Exchange</p>
            <div className="flex items-center justify-between gap-5">
                    <InputField
                      label="Input"
                      type="number"
                      value={input}
                      onChange={(text) => setInput(Number(text.target.value))}
                      iconRight={<DropDown
                        data={listCurrency}
                        selectItemDropDown={baseCode}
                        onSelectItemDropDown={setBaseCode} />}
                    />
            
                    <CurrencyExchangeIcon className="mt-5" />
            
                    <InputField
                      label="Output"
                      type="number"
                      value={output}
                      onChange={(text) => setOutput(Number(text.target.value))}
                      iconRight={<DropDown
                        data={listCurrency}
                        selectItemDropDown={targetCode}
                        onSelectItemDropDown={setTargetCode} />}
                    />
                  </div>
        </div>
    );
}
