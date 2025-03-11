import Card from "."

interface ListCardProps {
    title: string,
    data: {
        key:string,
        image:React.ReactNode,
        title: string,
        content: string,
        link?: string
    }[]
}

export default function ListCard({ data, title }: ListCardProps) {
    return (
        <div className="relative">
            {
                title && (
                    <div>
                        <p className="text-2xl ">{title}</p>
                        <hr style={{ margin: '5px 0 15px' }} />
                    </div>
                )
            }
            <div className="grid gap-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">
                {data.map((item, index) => (
                    <Card
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