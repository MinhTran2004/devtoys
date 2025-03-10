import CardItem from "./card-item"
import styles from "./index.module.css"

interface CardProps {
    title: string,
    data: {
        key:string,
        image:React.ReactNode,
        title: string,
        content: string,
        link?: string
    }[]
}

export default function ListCard({ data, title }: CardProps) {
    return (
        <div style={{ position: 'relative' }}>
            {
                title && (
                    <div>
                        <p style={{ fontSize: 20 }}>{title}</p>
                        <hr style={{ margin: '5px 0 15px' }} />
                    </div>
                )
            }
            <div className={styles.content}>
                {data.map((item, index) => (
                    <CardItem
                        key={index}
                        image={item.image}
                        title={item.title}
                        content={item.content}
                        link = {item.link || ""} />
                ))}
            </div>
        </div>
    )
}