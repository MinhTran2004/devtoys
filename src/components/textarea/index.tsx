interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string,
    styleLayout?: React.CSSProperties
}

export default function Textarea({
    label,
    styleLayout,
    ...textarea
}: TextareaProps) {
    return (
        <div className="h-full w-full" style={{ ...styleLayout }}>
            <label className="text-sm text-[#bbbbbb]">{label}</label>
            <textarea
                className="w-full h-18/19 bg-[#333333] px-5 py-2 box-border rounded-lg"
                {...textarea}
            />
        </div>
    )
}