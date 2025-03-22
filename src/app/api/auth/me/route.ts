import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const accessToken = req.cookies.get("access_token")?.value;

        if (!accessToken) {
            return NextResponse.json(
                { status: 401, msg: "Chưa đăng nhập" },
                { status: 401 }
            );
        }

        const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { status: 401, msg: "Token không hợp lệ" },
                { status: 401 }
            );
        }

        const userData = await response.json();
        return NextResponse.json(userData);
    } catch (err) {
        console.error("Lỗi trong /me:", err);
        return NextResponse.json(
            { status: 500, msg: "Lỗi máy chủ" },
            { status: 500 }
        );
    }
}