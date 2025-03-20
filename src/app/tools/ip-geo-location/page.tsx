"use client";
import InputField from "@/components/input-field";
import { useState } from "react";
import PrimaryButton from "@/components/button";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function ScanVirusFilePage() {
    const [input, setInput] = useState<string>("58.186.22.176");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleIpGeoLocaiton = async () => {
        if (input.length < 1) {
            setError("Không để trống ô nhập");
            setInput("");
        } else {
            setIsLoading(true);
            try {
                const reponse = (await axios.get(`/api/ip-geo-location?input=${input}`)).data;
                setOutput(reponse);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="h-full w-full pb-10">
            <p className="text-2xl mb-2">Ip Geo Location</p>

            <div className="flex items-center justify-between">
                <InputField
                    label="Input"
                    styleLayout={{ width: '100%' }}
                    value={input}
                    textError={error}
                    onChange={(text) => setInput(text.target.value)}
                />
                <PrimaryButton
                    disabled={true}
                    styleLayout={{ width: 100, padding: '0 10px', boxSizing: 'border-box' }}
                    onClick={handleIpGeoLocaiton}
                    name="Tìm kiếm" />
            </div>

            {isLoading && <CircularProgress />}

            {output && !isLoading && (
                <div className="mt-5 overflow-y-scroll h-8/9">
                    <table>
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
