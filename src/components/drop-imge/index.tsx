"use client"
import React from "react"

interface DropImageProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
    handlerFuncion: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function DropImage({ handlerFuncion }: DropImageProps) {

    return (
        <div className="w-full outline-2 outline-dotted outline-[#767676] p-5 rounded-lg">
            <p className="text-xs text-center md:text-sm">Drag & drop a BMP, GIF, ICO, JPEG, JPG, PNG, SEV, WEBP file here <br />or</p>
            <div className="flex justify-center items-center">
                <input
                    type="file"
                    style={{ fontSize: 15, color: '#6aaed6', width: 80 }}
                    accept="image/*"
                    onChange={handlerFuncion} />
                <p className="mx-2">/</p>
                <button style={{ fontSize: 15, color: '#6aaed6' }}>Paste</button>
            </div>
        </div>
    )
}