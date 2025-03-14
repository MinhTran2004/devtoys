"use client"
import DropImage from "@/components/drop-imge";
import { useState } from "react";
import Textarea from "@/components/textarea";

export default function Base64ImagePage() {
    const [base64, setBase64] = useState("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setBase64(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        } else {
            console.log("Không có tệp nào được chọn.");
        }
    };

    return (
        <div className="h-full w-full">
            <p className="text-2xl">Base64 Image Encoders / Decoders</p>

            <div className="grid grid-cols-[60%_38.5%] gap-6 h-full">
                <Textarea
                    label="Base64 text"
                    value={base64}
                    onChange={(text) => setBase64(text.target.value)}
                />
                <div className="flex flex-col gap-5 w-full h-29/30">
                    <DropImage onChange={handleFileChange} />
                    <div className="w-full h-full rounded-b-lg bg-[#333333]">
                        {
                            base64 && (
                                <img
                                className="w-full h-full object-contain"
                                    src={base64} alt="" />
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}