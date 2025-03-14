"use client"
import { useState } from "react";
import Textarea from "@/components/textarea";
import InputField from "@/components/input-field";
import DropImage from "@/components/drop-imge";

export default function CertificatePage() {
  const [password, setPassword] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");



  return (
    <div className="h-full w-full">
      <p className="text-2xl mb-2">Certificate Decoder</p>

      <div className="grid grid-cols-2 h-full gap-3">
        <div className="h-19/20 flex flex-col gap-3">
          <InputField
            label="Password"
            value={password}
            onChange={(text) => setPassword(text.target.value)} />
          <DropImage />
          <Textarea
            label="Input"
            value={input}
            onChange={(text) => setInput(text.target.value)} />
        </div>
        <div className="h-24/25">
          <Textarea
            disabled
            label="Output"
            value={output} />
        </div>
      </div>

    </div>
  )
}