"use client"
import DropImage from "@/components/drop-imge";
import styles from "./page.module.css";
import { useState } from "react";
import Image from "next/image";

export default function Base64ImagePage() {
    const [base64, setBase64] = useState("");

    return (
        <div className={styles.container}>
            <p style={{
                fontSize: 20,
                fontWeight: 500
            }}>Base64 Image Encoders / Decoders</p>

            <div className={styles.content}>
                <div>
                    <p style={{ fontSize: 14 }}>Base64 text</p>
                    <textarea
                        className={styles.textarea}
                        value={base64}
                        onChange={text => setBase64(text.target.value)}
                    />
                </div>

                <div className={styles.containerImage}>
                    <DropImage onChangeValue={setBase64}/>
                    <div className={styles.boxImage}>
                        {
                            base64 && (
                                <Image
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