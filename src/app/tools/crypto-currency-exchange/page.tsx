"use client";
import DropDown from "@/components/drop-down";
import InputField from "@/components/input-field";
import { useCallback, useEffect, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import axios from "axios";

export default function CryptoCurrencyExchangePage() {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState<number>(0);
  const [baseCode, setBaseCode] = useState<string>("BTC");
  const [targetCode, setTargetCode] = useState<string>("ETH");
  const [listCryptoCurrencies, setListCryptoCurrencies] = useState<string[]>([]);
  const [arrayCrypto, setArrayCrypto] = useState<any[]>([]);
  const [error, setError] = useState("");

  const getListCurrencies = useCallback(async () => {
    const arrayCryptoCurrencies: string[] = [];
    try {
      const reponse = (await axios.get(`/api/crypto-currency-exchange`)).data;
      const convertListCryptoCurrencies = Object.entries(reponse.rates);
      convertListCryptoCurrencies.map((item) => {
        arrayCryptoCurrencies.push(item[0])
      });
      setListCryptoCurrencies(arrayCryptoCurrencies);
      setArrayCrypto(convertListCryptoCurrencies);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getListCurrencies();
  }, [])

  const handleCryptocurrencyExchange = useCallback(async () => {
    if (input.length < 1) {
      setError("Cần có it nhất 1 trường")
    }else if (isNaN(Number(input))) {
      setError("Lỗi định dạng dữ liệu")
    } else if (Number(input) < 0) {
      setError("Input > 0")
    } else {
      setError("")
      try {
        const filterBase = arrayCrypto.filter((item) => item[0] === baseCode);
        const filterTarget = arrayCrypto.filter((item) => item[0] === targetCode);
        const baseToTarget = (Number(input) * Number(filterBase[0][1])) / Number(filterTarget[0][1]);
        setOutput(baseToTarget);
      } catch (err) {
        console.log(err);
      }
    }
  }, [input,arrayCrypto])

  useEffect(() => {
    handleCryptocurrencyExchange();
  }, [input, arrayCrypto])

  return (
    <div className="h-full w-full">
      <p className="text-2xl mb-2">Crypto Currency Exchange</p>
      <div className="flex justify-between gap-5">
        <InputField
          label="Input"
          value={input}
          textError={error}
          styleLayout={{ width: '100%' }}
          onChange={(text) => setInput(text.target.value)}
          iconRight={<DropDown
            data={listCryptoCurrencies}
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
            data={listCryptoCurrencies}
            selectItemDropDown={targetCode}
            onSelectItemDropDown={setTargetCode} />}
        />
      </div>
    </div>
  );
}
