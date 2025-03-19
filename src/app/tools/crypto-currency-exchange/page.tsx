"use client";
import DropDown from "@/components/drop-down";
import InputField from "@/components/input-field";
import { useCallback, useEffect, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import axios from "axios";

interface TypeDetailCrypto {
  id: number,
  slug: string,
  quote: { USD: { price: number } }
}

export default function CryptoCurrencyExchangePage() {
  const [input, setInput] = useState("1");
  const [output, setOutput] = useState<number>(0);
  const [baseCode, setBaseCode] = useState<string>("bitcoin");
  const [targetCode, setTargetCode] = useState<string>("ethereum");
  const [listCrypto, setListCrypto] = useState<string[]>([]);
  const [arrayCrypto, setArrayCrypto] = useState<any[]>([]);
  const [error, setError] = useState("");

  const getListCurrencies = useCallback(async () => {
    const arrayCryptoCurrencies: { id: number, slug: string, price: number }[] = [];
    const listCryptoCurrencies: string[] = [];
    try {
      const reponse = (await axios.get(`/api/crypto-currency-exchange`)).data;

      reponse.data.map((item: TypeDetailCrypto) => {
        arrayCryptoCurrencies.push({ id: item.id, slug: item.slug, price: item.quote.USD.price });
        listCryptoCurrencies.push(item.slug);
      })
      setArrayCrypto(arrayCryptoCurrencies);
      setListCrypto(listCryptoCurrencies);
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
    } else if (isNaN(Number(input))) {
      setError("Lỗi định dạng dữ liệu")
    } else if (Number(input) < 1) {
      setError("Input > 0")
    } else {
      setError("")
      try {
        const filterBase = arrayCrypto.filter((item) => item.slug === baseCode);
        const filterTarget = arrayCrypto.filter((item) => item.slug === targetCode);
        const baseToTarget = (Number(input) * Number(filterBase[0].price)) / Number(filterTarget[0].price);
        console.log(baseToTarget);

        setOutput(baseToTarget);
      } catch (err) {
        console.log(err);
      }
    }
  }, [input, arrayCrypto, targetCode, baseCode])

  useEffect(() => {
    handleCryptocurrencyExchange();
  }, [input, arrayCrypto, targetCode, baseCode])

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
            data={listCrypto}
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
            data={listCrypto}
            selectItemDropDown={targetCode}
            onSelectItemDropDown={setTargetCode} />}
        />
      </div>
    </div>
  );
}
