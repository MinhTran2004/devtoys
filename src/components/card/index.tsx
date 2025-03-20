"use client"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Link from "next/link";

interface CardProps {
    image: React.ReactNode,
    title: string,
    content: string,
    link: string,
}

export default function Card({ image, title, content, link }: CardProps) {
    return (
        <Link className="bg-[#333333] flex p-3 rounded-ms gap-2 cursor-pointer box-border"
            href={link || "/"}>
            <div className="flex items-center justify-center min-w-20 min-h-20 bg-[#494949]">
                {image}
            </div>
            <div className="w-full">
                <div className="flex justify-between">
                    <p className='text-sm font-bold'>{title}</p>
                    <div className="flex justify-center items-center w-5.5 h-5.5 bg-[#4f4f4f] rounded-sm box-border">
                        <ContentCopyIcon
                            style={{ width: 13, height: 13 }}
                        />
                    </div>
                </div>
                <p className='text-xs'>{content}</p>
            </div>
        </Link>
    )
}