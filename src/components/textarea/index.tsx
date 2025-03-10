import styles from "./index.module.css";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
}

export default function Textarea({
    label,
    ...textarea
}: TextareaProps) {
    return (
        <div style={{width: '100%', height: '100%'}}>
            <p>{label}</p>
            <textarea
                className={styles.textarea}
                {...textarea} />
        </div>
    )
}