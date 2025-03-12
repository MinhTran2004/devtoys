"use client";

interface TableProps {
    label?: string;
    data: any[] | string;
    styleTable?: React.CSSProperties;
}

export default function Table({
    label,
    data,
    styleTable
}: TableProps) {
    // Khởi tạo headerTable chỉ khi dữ liệu là mảng và có phần tử
    let headerTable: string[] | undefined;

    if (Array.isArray(data) && data.length > 0) {
        headerTable = Object.keys(data[0]); // Lấy các khóa của đối tượng đầu tiên trong mảng
    }

    return (
        <div className="h-full">
            <label className="text-sm text-[#bbbbbb]">{label}</label>
            <div className="bg-[#333333] h-full rounded-lg">
                {typeof data === "string" ? (
                    <p>{data}</p>
                ) : (
                    headerTable && (
                        <table
                            className="w-full border-collapse border"
                            style={{ ...styleTable }}
                        >
                            <thead>
                                <tr>
                                    {headerTable.map((item, index) => (
                                        <th
                                            className="text-center py-2 border"
                                            key={index}
                                        >
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, index) => (
                                    <tr key={index}>
                                        {headerTable.map((column) => (
                                            <td
                                                className="text-center border"
                                                key={column}
                                            >
                                                {row[column]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                )}
            </div>
        </div>
    );
}
