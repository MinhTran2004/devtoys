interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
}

export default function Textarea({
    label,
    ...textarea
}: TextareaProps) {
    return (
        <div>
            <p className="mt-5 mb-2">{label}</p>
            <textarea
                className="w-full h-8/9 bg-[#333333] px-5 py-2 box-border rounded-lg"
                {...textarea} />
        </div>
    )
}