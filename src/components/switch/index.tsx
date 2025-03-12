"use client"
interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    textTrue?: string;
    textFalse?: string;
    onChangeStatus?: (status: boolean) => void;
}

export default function Switch({
    textTrue,
    textFalse,
    checked,
    onChangeStatus,
    ...input
}: SwitchProps) {
    return (
        <div className="flex items-center gap-2">
            <p className="text-sm">
                {checked ? textTrue : textFalse}
            </p>

            <label className="relative inline-block w-12 h-7">
                <input
                    type="checkbox"
                    className="opacity-0 w-0 h-0"
                    {...input}
                />
                <span
                    className={`absolute top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 
                    ${checked ? 'bg-blue-500' : 'bg-gray-300'}`}
                >
                    <span
                        className={`absolute left-0 bottom-1 w-5 h-5 bg-white rounded-full transition-transform duration-300
                        ${checked ? 'transform translate-x-6' : ''}`}
                    ></span>
                </span>
            </label>
        </div>
    );
}
