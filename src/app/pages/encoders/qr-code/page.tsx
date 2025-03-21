"use client"

import { useState } from "react";
import { QRCodeCanvas } from 'qrcode.react';
import DropImage from "@/components/drop-imge";
import jsQR from "jsqr";
import Textarea from "@/components/textarea";

export default function QRCodePage() {
    const [input, setInput] = useState("");

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0, img.width, img.height);

                        const imageData = ctx.getImageData(0, 0, img.width, img.height);
                        const qrCode = jsQR(imageData.data, img.width, img.height);

                        if (qrCode) {
                            setInput(qrCode.data);
                        } else {
                            setInput('');
                        }
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="h-full w-full">
            <p className="text-2xl">QR Code Encoders / Decoders</p>

            <div className="grid grid-cols-[60%_38.5%] gap-6 h-full">
                <Textarea
                    label="Text"
                    value={input}
                    onChange={(text) => setInput(text.target.value)}
                />
                <div className="flex flex-col gap-5 w-full h-29/30">
                    <DropImage
                        onChange={handleImageUpload}
                    />
                    <div className="w-full h-full rounded-b-lg bg-[#333333]">
                        {
                            input && (
                                <QRCodeCanvas value={input} />
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}