"use client";
import DropImage from "@/components/drop-imge";
import axios from "axios";
import { useState } from "react";

export default function ScanVirusFilePage() {
    const [output, setOutput] = useState<any[]>([]);
    const [error, setError] = useState("");

    const handleScanVirusFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);

            const response = await axios.post(`/api/virustotal`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setError("");
            const convertDataArray = Object.entries(response.data);
            setOutput(convertDataArray)
        } catch (err: any) {
            setError("Error scanning file:" + err);
        }
    };

    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-2">Scan Virus File</p>
            <DropImage onChange={handleScanVirusFile} />
            <div className="w-full flex justify-center mt-20">
                {error ?
                    <p>error</p>
                    :
                    <table>
                        {output.map((item) => (
                            <tr>
                                <td className="border px-5">{item[0]}</td>
                                <td className="px-10 border">{item[1]}</td>
                            </tr>
                        ))}
                    </table>
                }
            </div>
        </div>
    );
}