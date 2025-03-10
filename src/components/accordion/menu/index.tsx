import { useEffect, useRef, useState } from "react"
import styles from "./index.module.css"
import ItemMenu from "./item-menu"

interface MenuProps {
    data: string[]
    onSelectItemMenu: (text: string) => void
    selectItemMenu: string
}

export default function Menu({
    data,
    onSelectItemMenu,
    selectItemMenu
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
        <div className={styles.container}
            ref={containerRef}
            onClick={() => setIsChecked(!isChecked)}>
            <ItemMenu label={selectItemMenu} />
            {isChecked && (
                <div className={styles.listMenu}>
                    {
                        data.map((item) => (
                            <ItemMenu key={item} label={item} onSelectItemMenu={onSelectItemMenu} />
                        ))
                    }
                </div>
            )}
        </div>
    )
}