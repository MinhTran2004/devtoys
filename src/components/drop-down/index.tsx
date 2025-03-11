"use client"
import { useEffect, useRef, useState } from "react"
import ItemMenu from "./item-drop-down"

interface MenuProps {
    data: string[]
    setSelectItemDropDown?: (text: string) => void
    selectItemDropDown?: string
}

export default function DropDown({
    data,
    setSelectItemDropDown,
    selectItemDropDown
}: MenuProps) {
    const [isChecked, setIsChecked] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsChecked(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            className="relative h-full"
            ref={containerRef}
            onClick={() => setIsChecked(!isChecked)}>
            <ItemMenu label={selectItemDropDown ? selectItemDropDown : data[0]} />
            {isChecked && (
                <div className="absolute flex flex-col bg-[#282828] z-999 gap-1 mt-1">
                    {data && (
                        data.map((item) => (
                            <ItemMenu key={item} label={item} setSelectItemDropDown={setSelectItemDropDown} />
                        ))
                    )}
                </div>
            )}
        </div>
    )
}