"use client"
import React from "react"
import styles from "./index.module.css"

interface DropImageProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
    onChangeValue: (text: string) => void
}

export default function DropImage({ onChangeValue }: DropImageProps) {

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    onChangeValue(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        } else {
            console.log("Không có tệp nào được chọn.");
        }
    };

    return (
        <div className={styles.container}>
            <p className={styles.title}>Drag & drop a BMP, GIF, ICO, JPEG, JPG, PNG, SEV, WEBP file here <br />or</p>
            <div style={{
                display: 'flex',
                fontSize: 13,
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center'
            }}>
                <input
                    type="file"
                    style={{ fontSize: 15, color: '#6aaed6', width: 80 }}
                    onChange={handleFileChange} />
                <p style={{ margin: '0 10px' }}>/</p>
                <button style={{ fontSize: 15, color: '#6aaed6' }}>Paste</button>
            </div>
        </div>
    )
}