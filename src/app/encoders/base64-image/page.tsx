"use client"
import DropImage from "@/components/drop-imge";
import styles from "./page.module.css";
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
        <div className="layout">
            <p className="title">Base64 Image Encoders / Decoders</p>

            <div className={styles.content}>
                <Textarea
                    label="Base64 text"
                    value={base64}
                    onChange={(text) => setBase64(text.target.value)}
                />
                <div className={styles.containerImage}>
                    <DropImage handlerFuncion={handleFileChange} />
                    <div className={styles.boxImage}>
                        {
                            base64 && (
                                <img
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    src={base64} alt="" />
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}