"use client"
import InputField from "@/components/input-field";
import { useCallback, useEffect, useRef, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import axios from 'axios';
import DropDown from "@/components/drop-down";

const API_KEY = "d492183d5c384afb627f2f6b";

export default function CurrencyExchangePage() {
  const [input, setInput] = useState<number>(1);
  const [output, setOutput] = useState<number>(0);
  const [baseCode, setBaseCode] = useState<string>("USD");
  const [targetCode, setTargetCode] = useState<string>("VND");
  const [listCurrency, setListCurrency] = useState<string[]>([]);

  const dataCurrency = useCallback(async () => {
    try {
      const reponse = (await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`)).data;
      const currencyCodes = reponse.supported_codes.map((item: string[]) => item[0]);
      setListCurrency(currencyCodes);
    } catch (err) {
      console.log(err);
    }
  }, [])

  const currencyExchange = useCallback(async () => {
    try {
      const reponse = (await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${baseCode}/${targetCode}/${input}`)).data;
      setOutput(reponse.conversion_result);
    } catch (err) {
      console.log(err);
    }
  },[input, baseCode, targetCode]);

  useEffect(() => {
    dataCurrency();
  }, []);

  useEffect(() => {
    currencyExchange();
  }, [input, baseCode, targetCode]);



  return (
    <div className="h-full w-full" >
      <p className="text-2xl mb-2">Currency Exchange</p>

      <div className="flex items-center justify-between gap-5">
        <InputField
          label="Input"
          type="number"
          value={input}
          styleLayout={{width: '100%'}}
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
          styleLayout={{width: '100%'}}
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