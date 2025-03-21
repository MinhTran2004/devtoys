import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: any }) {
    // Tạo một NextResponse để cung cấp context cho việc ghi cookie
    const res = new NextResponse();

    // Truyền cả req và res vào getSession
    const cookie = (await cookies()).get('appSession');

    // Trả về JSON response, giữ nguyên các cookie đã được set
    return NextResponse.json({ value: cookie?.value }, { headers: res.headers });
}