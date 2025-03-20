"use client"

import Accordion from "@/components/accordion";
import { useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Textarea from "@/components/textarea";
import DropDown from "@/components/drop-down";
import { marked } from "marked";

const dataTheme = ["Dark", "Light"];

export default function MarkdownPreviewPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [selectItemTheme, setSelectItemTheme] = useState("Dark");

  const handleMarkdownChange = async (inputText: string) => {
    try {
      setInput(inputText);
      const convertedHtml = await marked(inputText);
      setOutput(convertedHtml);
    } catch (error) {
      console.error("Error converting Markdown:", error);
      setOutput("Error processing Markdown.");
    }
  };

  return (
    <div className="h-full w-full" >
      <p className="text-2xl mb-2">Markdown Preview</p>

      <Accordion
        iconLeft={<CurrencyExchangeIcon />}
        title="Theme"
        content="Select wich theme to use to preview the Markdown"
        iconRight={<DropDown
          data={dataTheme}
          selectItemDropDown={selectItemTheme}
          onSelectItemDropDown={setSelectItemTheme}
        />}
      />

      <div className="h-7/8 grid grid-cols-2 gap-5">
        <Textarea
          label="Input"
          value={input}
          onChange={(text) => handleMarkdownChange(text.target.value)}
        />

        <div>
          <label>Output</label>
          <div
            className={`h-19/20 pt-3 pl-5 rounded-lg ${selectItemTheme === "Dark" ? 'bg-[#0e1117] text-white' : 'bg-white text-black'}`}
            dangerouslySetInnerHTML={{ __html: output }}
          />
        </div>
      </div>

    </div>
  )
}