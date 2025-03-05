import CardItem from "./card-item"
import styles from "./index.module.css"

interface CardProps {
    title: string,
    data: any[]
}

export default function ListCard({ data, title }: CardProps) {
    return (
        <div style={{ position: 'relative' }}>
            {
                title && (
                    <div>
                        {/* <div style={{ position: "sticky", backgroundColor: '#282828', top: 0 }}> */}
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
                        content={item.content} />
                ))}
            </div>
        </div>
    )
}