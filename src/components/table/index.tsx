"use client"
interface TableProps {
    label?: string,
    data: any[],
    styleTable?: React.CSSProperties
}

export default function Table({
    label,
    data,
    styleTable
}: TableProps) {

    if (data) return <p>hihi</p>

    const headerTable = Object.keys(data[0]);

    return (
        <div className="h-full">
            <label className="text-sm text-[#bbbbbb]">{label}</label>
            <div className="bg-[#333333] h-full rounded-lg">
                <table
                    className=" w-full border-collapse border "
                    style={{ ...styleTable }}>
                    <thead>
                        <tr>
                            {headerTable &&
                                headerTable.map((item, index: number) => (
                                    <th
                                        className="text-center py-2 border"
                                        key={index}>{item}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row: any, index: any) => (
                            <tr key={index}>
                                {headerTable &&
                                    headerTable.map((column) => (
                                        <td
                                            className="text-center border"
                                            key={column}>{row[column]}</td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}