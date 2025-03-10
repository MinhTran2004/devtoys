"use client"
import styles from "./page.module.css";
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
                img.src = reader.result as string; // Đảm bảo result là một chuỗi Base64
                img.onload = () => {
                    // Quét mã QR từ ảnh
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0, img.width, img.height);

                        // Lấy dữ liệu ảnh và giải mã mã QR
                        const imageData = ctx.getImageData(0, 0, img.width, img.height);
                        const qrCode = jsQR(imageData.data, img.width, img.height);

                        if (qrCode) {
                            setInput(qrCode.data); // Lưu thông tin giải mã được từ mã QR
                        } else {
                            setInput(''); // Xóa input nếu không tìm thấy mã QR
                        }
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="layout">
            <p className="title">QR Code Encoders / Decoders</p>

            <div className={styles.content}>
                    <Textarea
                        label="Text"
                        value={input}
                        onChange={(text) => setInput(text.target.value)}
                    />

                <div className={styles.containerImage}>
                    <DropImage handlerFuncion={handleImageUpload} />
                    <div className={styles.boxImage}>
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