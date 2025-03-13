"use client"
import React from "react"

interface DropImageProps extends React.HtmlHTMLAttributes<HTMLInputElement> { }

export default function DropImage({ ...input }: DropImageProps) {

    return (
        <div className="flex flex-col items-center justify-center w-full h-full outline-2 outline-dotted outline-[#767676] p-5 box-border rounded-lg">
            <p className="text-xs text-center md:text-sm">Drag & drop a BMP, GIF, ICO, JPEG, JPG, PNG, SEV, WEBP file here <br />or</p>
            <div className="flex justify-center items-center">
                <input
                    className="text-[#6aaed6] cursor-pointer text-sm w-19"
                    type="file"
                    accept="image/*"
                    {...input} />
                <p className="mx-2">/</p>
                <button className="text-[#6aaed6] cursor-pointer text-sm" >Paste</button>
            </div>
        </div>
    )
}