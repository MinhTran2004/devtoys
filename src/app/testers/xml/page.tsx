"use client";

import { useCallback, useEffect, useState } from "react";
import Textarea from "@/components/textarea";
import { parseString } from 'xml2js';

export default function XMLPage() {
  const [inputXSD, setInputXSD] = useState("");
  const [inputXML, setInputXML] = useState("");
  const [result, setResult] = useState("");

  const handleValidate = useCallback(() => {
    if (!inputXML || !inputXSD) {
      setResult("");
      return;
    }
    parseString(inputXML, (err, xmlObj) => {
      if (err) {
        setResult('XML không hợp lệ.');
        return;
      }
      try {
        const xsdParser = new DOMParser();
        const xsdDoc = xsdParser.parseFromString(inputXSD, 'application/xml');
        const xmlParser = new DOMParser();
        const xmlDoc = xmlParser.parseFromString(inputXML, 'application/xml');
        const elementsFromXSD = xsdDoc.getElementsByTagName('xs:element');
        let valid = true;
        Array.from(elementsFromXSD).forEach((element: any) => {
          const elementName = element.getAttribute('name');
          const xmlElement = xmlDoc.getElementsByTagName(elementName);
          if (xmlElement.length === 0) {
            valid = false;
          }
        });
        setResult(valid ? 'XML hợp lệ với XSD!' : 'XML không hợp lệ với XSD!');
      } catch (error) {
        setResult('Có lỗi xảy ra trong khi xác thực.');
      }
    });
  }, [inputXML, inputXSD]);

  useEffect(() => {
    handleValidate();
  }, [inputXML, inputXSD]);

  return (
    <div className="h-full w-full">
      <p className="text-2xl mb-2">XML / XSD Tester</p>
      <div className="grid grid-cols-2 h-9/10 gap-3">
        <Textarea
          label="XML"
          value={inputXML}
          onChange={(text) => setInputXML(text.target.value)}
        />
        <Textarea
          label="XSD"
          value={inputXSD}
          onChange={(text) => setInputXSD(text.target.value)}
        />
      </div>
      <p>{result}</p>
    </div>
  );
}
