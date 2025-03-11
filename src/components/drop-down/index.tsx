"use client"
import { useEffect, useRef, useState } from "react"
import ItemDropDown from "./item-drop-down"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface MenuProps {
    data: string[]
    onSelectItemDropDown?: (text: string) => void
    selectItemDropDown?: string
}

export default function DropDown({
    data,
    onSelectItemDropDown,
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
            <ItemDropDown label={selectItemDropDown ? selectItemDropDown : data[0]} iconRight={<KeyboardArrowDownIcon/>} />
            {isChecked && (
                <div className="absolute flex flex-col bg-[#282828] z-999 gap-1 mt-1">
                    {data && (
                        data.map((item) => {
                            if (item !== selectItemDropDown) {
                                return (
                                    <ItemDropDown key={item} label={item} onSelectItemDropDown={onSelectItemDropDown} />
                                )
                            }
                        })
                    )}
                </div>
            )}
        </div>
    )
}