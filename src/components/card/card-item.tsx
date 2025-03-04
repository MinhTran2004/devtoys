import styles from "./card-item.module.css";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface CardItemProps {
    image: React.ReactNode,
    title: string,
    content: string,
}

export default function CardItem({ image, title, content }: CardItemProps) {
    return (
        <div className={styles.container}>
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