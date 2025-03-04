import CardItem from "./card-item"

interface CardProps {
    title: string,
    data: any[]
}

export default function Card({ data, title }: CardProps) {
    return (
        <div style={{ position: 'relative' }}>
            <div style={{position: "sticky", backgroundColor: '#282828', top: 0}}>
                <p style={{ fontSize: 20}}>{title}</p>
                <hr style={{ margin: '5px 0 15px' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                {data.map((item) => (
                    <CardItem {...item} />
                ))}
            </div>
        </div>
    )
}