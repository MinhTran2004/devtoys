import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: any }) {
    // Tạo một NextResponse để cung cấp context cho việc ghi cookie
    const res = new NextResponse();

    // Truyền cả req và res vào getSession
    const session = await getSession(req, res);

    // Trả về JSON response, giữ nguyên các cookie đã được set
    return NextResponse.json({ session }, { headers: res.headers });
}