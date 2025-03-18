"use client"
import InputField from "@/components/input-field";
import { useCallback, useEffect, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import axios from 'axios';
import DropDown from "@/components/drop-down";

export default function CurrencyExchangePage() {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState<number>(0);
  const [baseCode, setBaseCode] = useState<string>("USD");
  const [targetCode, setTargetCode] = useState<string>("VND");
  const [listCurrency, setListCurrency] = useState<string[]>([]);
  const [error, setError] = useState("");

  const dataCurrency = useCallback(async () => {
    try {
      const reponse = (await axios.get(`/api/currency-exchange/data-currency`)).data;
      const currencyCodes = reponse.supported_codes.map((item: string[]) => item[0]);
      setListCurrency(currencyCodes);
    } catch (err) {
      console.log(err);
    }
  }, [])

  useEffect(() => {
    dataCurrency();
  }, []);

  const currencyExchange = useCallback(async () => {
    if (input.length < 1) {
      setError("Cần có it nhất 1 trường")
    }else if (isNaN(Number(input))) {
      setError("Lỗi định dạng dữ liệu")
    } else if (Number(input) < 0) {
      setError("Input > 0")
    } else {
      setError("")
      try {
        const reponse = (await axios.get(
          `/api/currency-exchange/convert-currency?baseCode=${baseCode}&targetCode=${targetCode}&input=${input}`
        )).data;
        setOutput(reponse.conversion_result);
      } catch (err) {
        console.log(err);
      }
    }
  }, [input, baseCode, targetCode]);


  useEffect(() => {
    currencyExchange();
  }, [input, baseCode, targetCode, error]);

  return (
    <div className="h-full w-full" >
      <p className="text-2xl mb-2">Currency Exchange</p>

      <div className="flex justify-between gap-5">
        <InputField
          label="Input"
          value={input}
          textError={error}
          styleLayout={{ width: '100%' }}
          onChange={(text) => setInput(text.target.value)}
          iconRight={<DropDown
            data={listCurrency}
            selectItemDropDown={baseCode}
            onSelectItemDropDown={setBaseCode} />}
        />

        <CurrencyExchangeIcon className="mt-8" />

        <InputField
          label="Output"
          type="number"
          value={output}
          styleLayout={{ width: '100%' }}
          onChange={(text) => setOutput(Number(text.target.value))}
          iconRight={<DropDown
            data={listCurrency}
            selectItemDropDown={targetCode}
            onSelectItemDropDown={setTargetCode} />}
        />
      </div>
    </div>
  )
}