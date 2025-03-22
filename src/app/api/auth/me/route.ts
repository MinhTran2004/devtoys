import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const accessToken = req.cookies.get("access_token")?.value;
        console.log("Access Token:", accessToken);

        if (!accessToken) {
            return NextResponse.json(
                { status: 401, msg: "Chưa đăng nhập" },
                { status: 401 }
            );
        }

        const url = `${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`;
        console.log("Fetching from:", url);
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json(
                { status: 401, msg: `Token không hợp lệ: ${errorText}` },
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