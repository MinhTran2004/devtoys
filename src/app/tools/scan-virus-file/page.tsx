"use client";
import DropImage from "@/components/drop-imge";
import axios from "axios";
import { useState } from "react";

const API_KEY = "0876de33e3acd54ad53063bf59a5bb293080c604c8d7256bd859aa855b429e02";

export default function ScanVirusFilePage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setInput(file.name);
            handleScanVirusFile(file);
        }
    };

    const handleScanVirusFile = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file); 
        try {
            const response = await axios.post(
                "https://www.virustotal.com/vtapi/v2/file/scan",
                formData,
                {
                    headers: {
                        "x-apikey": API_KEY, 
                    },
                }
            );
            console.log(response.data); 
            setOutput(response.data); 
        } catch (err) {
            console.error("Error scanning file:", err);
        }
    };

    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-2">Scan Virus File</p>
            <DropImage onChange={handleFileChange} />
        </div>
    );
}
