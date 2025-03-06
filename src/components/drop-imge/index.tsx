"use client"
import React from "react"
import styles from "./index.module.css"

interface DropImageProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
    handlerFuncion : (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function DropImage({ handlerFuncion }: DropImageProps) {

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
                    accept="image/*" 
                    onChange={handlerFuncion} />
                <p style={{ margin: '0 10px' }}>/</p>
                <button style={{ fontSize: 15, color: '#6aaed6' }}>Paste</button>
            </div>
        </div>
    )
}