"use client";
import DropDown from "@/components/drop-down";
import InputField from "@/components/input-field";
import { useEffect, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import axios from "axios";

export default function ScanVirusFilePage() {
  const [input, setInput] = useState<number>(1);
  const [output, setOutput] = useState<number>(0);
  const [baseCode, setBaseCode] = useState<string>("usd");
  const [targetCode, setTargetCode] = useState<string>("VND");
  const [listCurrencies, setListCurrencies] = useState<string[]>([]);
  const [listCryptoCurrencies, setListCryptocurrencies] = useState<string[]>([]);

  const getListcurrency = async () => {
    try{
      const [Currencies,Cryptocurrencies] =  await Promise.all([
        (await axios.get(`https://api.coingecko.com/api/v3/simple/supported_vs_currencies`)).data,
        (await axios.get(`https://api.coingecko.com/api/v3/coins/list`)).data
      ]);
      setListCurrencies(Currencies);
      setListCryptocurrencies(Cryptocurrencies);
      console.log(Cryptocurrencies);
      
      // console.log(Cryptocurrencies);
      // https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd

    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getListcurrency();
  }, [])

  return (
    <div className="h-full w-full">
      <p className="text-2xl mb-2">Crypto Currency Exchange</p>
      <div className="flex items-center justify-between gap-5">
        <InputField
          label="Input"
          type="number"
          value={input}
          styleLayout={{ width: '100%' }}
          onChange={(text) => setInput(Number(text.target.value))}
          iconRight={<DropDown
            data={listCurrencies}
            selectItemDropDown={baseCode}
            onSelectItemDropDown={setBaseCode} />}
        />

        <CurrencyExchangeIcon className="mt-5" />

        <InputField
          label="Output"
          type="number"
          value={output}
          styleLayout={{ width: '100%' }}
          onChange={(text) => setOutput(Number(text.target.value))}
          iconRight={<DropDown
            data={listCryptoCurrencies}
            selectItemDropDown={targetCode}
            onSelectItemDropDown={setTargetCode} />}
        />
      </div>
    </div>
  );
}
