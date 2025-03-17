"use client";
import InputField from "@/components/input-field";
import { useCallback, useState } from "react";
import PrimaryButton from "@/components/button";
import axios from "axios";
import Table from "@/components/table";

const API_KEY = "1f9de557b5784774ab9832906c6fe6dc";

export default function ScanVirusFilePage() {
    const [input, setInput] = useState<string>("58.186.22.176");
    const [output, setOutput] = useState("");

    const handleIpGeoLocaiton = async () => {
        try {
            const reponse = (await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${input}`)).data;
            setOutput(reponse);
        } catch (err) {
            console.log(err);
        }
    };

    console.log(output);


    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-2">Ip Geo Location</p>

            <div className="flex items-end justify-between">
                <InputField
                    label="Input"
                    styleLayout={{ width: '100%' }}
                    value={input}
                    onChange={(text) => setInput(text.target.value)}
                />
                <PrimaryButton
                    disabled={input.length > 0}
                    styleLayout={{ width: 100, padding: '0 10px', boxSizing: 'border-box' }}
                    onClick={handleIpGeoLocaiton}
                    name="Tìm kiếm" />
            </div>

            {output && (
                <div className="mt-5 overflow-y-scroll h-8/9">
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(output).map(([key, value]) => {
                            if (typeof value === "object" && !Array.isArray(value)) {
                                return Object.entries(value).map(([subKey, subValue]) => (
                                    <tr key={`${key}-${subKey}`}>
                                        <td>{`${key} - ${subKey}`}</td>
                                        <td>{JSON.stringify(subValue)}</td>
                                    </tr>
                                ));
                            }
                            return (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{JSON.stringify(value)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    );
}
