"use client"
import styles from "./page.module.css";
import { useState } from "react";
import { QRCodeCanvas } from 'qrcode.react';
import Accordion from "@/components/accordion";

export default function QRCodePage() {
    const [input, setInput] = useState("");

    return (
        <div className={styles.container}>
            <p style={{
                fontSize: 20,
                fontWeight: 500
            }}>QR Code Encoders / Decoders</p>

            <Accordion />
            <Accordion />

            <div className={styles.content}>
                <div>
                    <p style={{ fontSize: 14 }}>Input</p>
                    <textarea
                        className={styles.textarea}
                        value={input}
                        onChange={text => setInput(text.target.value)}
                    />
                </div>

                <div>
                    <p style={{ fontSize: 14 }}>Output</p>
                    <textarea
                        className={styles.textarea}
                        value={input}
                        onChange={text => setInput(text.target.value)}
                    />
                </div>
            </div>

        </div>
    )
}