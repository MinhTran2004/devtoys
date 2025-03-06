"use client"
import { useRouter } from "next/navigation";
import styles from "./card-item.module.css";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface CardItemProps {
    image: React.ReactNode,
    title: string,
    content: string,
    link: string,
}

export default function CardItem({ image, title, content, link }: CardItemProps) {
    const router = useRouter();

    const handlePath = () => {
        router.push(link);
    }

    return (
        <div className={styles.container} onClick={handlePath}>
            <div className={styles.image}>
                {image}
            </div>

            <div style={{ width: '100%' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <p style={{
                        fontSize: 13,
                        fontWeight: "600",
                    }}>{title}</p>

                    <div className={styles.iconCopy}>
                        <ContentCopyIcon style={{ width: 13, height: 13 }} />
                    </div>
                </div>

                <p style={{
                    fontSize: 12,
                    marginTop: 5
                }}>{content}</p>
            </div>
        </div>
    )
}