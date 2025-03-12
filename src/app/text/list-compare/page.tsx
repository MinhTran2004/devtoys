"use client"
import Accordion from "@/components/accordion";
import { useEffect, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Toogle from "@/components/switch";
import Textarea from "@/components/textarea";
import DropDown from "@/components/drop-down";

const dataMode = ["A n B", "A u B", "A Only", "B Only"]

export default function ListComparePage() {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [output, setOutput] = useState("");
  const [selectItemDropdown, setSelectItemDropdown] = useState("A n B");

  const [isChecked, setIsChecked] = useState(false);

  const handleCompare = () => {
    // Chuyển đổi các input thành mảng
    const setA = new Set(inputA.split("\n").map(item => item.trim()).filter(Boolean));
    const setB = new Set(inputB.split("\n").map(item => item.trim()).filter(Boolean));

    let resultSet: Set<string> = new Set();

    switch (selectItemDropdown) {
      case "A n B": // Giao
        setA.forEach((item) => {
          if (
            setB.has(item) ||
            (!isChecked && [...setB].some((b) => b.toLowerCase() === item.toLowerCase()))
          ) {
            resultSet.add(item);
          }
        });
        break;

      case "A u B": // Hợp
        setA.forEach((item) => resultSet.add(item));
        setB.forEach((item) => resultSet.add(item));
        break;

      case "A Only": // Chỉ có trong A
        setA.forEach((item) => {
          if (!setB.has(item) && ![...setB].some((b) => !isChecked && b.toLowerCase() === item.toLowerCase())) {
            resultSet.add(item);
          }
        });
        break;

      case "B Only": // Chỉ có trong B
        setB.forEach((item) => {
          if (!setA.has(item) && ![...setA].some((a) => !isChecked && a.toLowerCase() === item.toLowerCase())) {
            resultSet.add(item);
          }
        });
        break;

      default:
        break;
    }
    setOutput([...resultSet].join("\n"));
  };

  useEffect(() => {
    handleCompare();
  }, [inputA, inputB, selectItemDropdown, isChecked])


  return (
    <div className="h-full w-full">
      <p className="text-2xl mb-2">List comparer</p>

      <Accordion
        iconLeft={<CurrencyExchangeIcon />}
        label="Configuration"
        title="Case sensitive comparison"
        iconRight={<Toogle textFalse="Off" textTrue="On" checked={isChecked} onChange={text => setIsChecked(!isChecked)} />} />

      <Accordion
        iconLeft={<CurrencyExchangeIcon />}
        title="Comparison mode"
        iconRight={<DropDown data={dataMode} selectItemDropDown={selectItemDropdown} onSelectItemDropDown={setSelectItemDropdown} />} />

      <div className="h-3/10 grid grid-cols-2 gap-3 mt-5">
        <Textarea
          label="A"
          value={inputA}
          onChange={(text) => setInputA(text.target.value)}
        />
        <Textarea
          label="B"
          value={inputB}
          onChange={(text) => setInputB(text.target.value)}
        />
      </div>
      <div className="h-6/14 grid mt-3">
        <Textarea
          disabled
          label="Output"
          value={output}
        />
      </div>
    </div>
  )
}