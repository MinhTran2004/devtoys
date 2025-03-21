"use client"

import { useCallback, useEffect, useState } from "react";
import Textarea from "@/components/textarea";
import DropImage from "@/components/drop-imge";
import { X509 } from 'jsrsasign';

export default function CertificatePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<any>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        if (fileContent) {
          setInput(fileContent);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDecode = useCallback(() => {
    if (input.length > 0) {
      try {
        const x509 = new X509();
        x509.readCertPEM(input);
        const decoded = {
          subject: x509.getSubjectString(),
          issuer: x509.getIssuerString(),
          validFrom: x509.getNotBefore(),
          validTo: x509.getNotAfter(),
          version: x509.getVersion(),
          signatureAlgorithm: x509.getSignatureAlgorithmField(),
          serialNumber: x509.getSerialNumberHex(),
        };
        setOutput(JSON.stringify(decoded, null, 2));
      } catch (err: any) {
        setOutput("Lỗi");
        console.log(err);
      }
    } else {
      setOutput("");
    }
  }, [input]);

  useEffect(() => {
    handleDecode();
  }, [input])

  return (
    <div className="h-full w-full">
      <p className="text-2xl mb-2">Certificate Decoder</p>
      <div className="grid grid-cols-2 h-full gap-3">
        <div className="h-19/20 flex flex-col gap-3">
          <DropImage
            onChange={handleFileChange}
          />
          <Textarea
            label="Input"
            value={input}
            onChange={(text) => setInput(text.target.value)}
          />
        </div>
        <div className="h-24/25">
          <Textarea
            disabled
            label="Output"
            value={output}
          />
        </div>
      </div>
    </div>
  )
}