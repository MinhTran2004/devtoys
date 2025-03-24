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

        const url = `${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const responseText = await response.text();
        console.log("Auth0 Response:", response);

        if (response.ok) {
            return NextResponse.json(
                { status: 401, msg: `Token không hợp lệ: ${responseText}`, token: accessToken, response: response, domain: process.env.AUTH0_ISSUER_BASE_URL },
                { status: 401 }
            );
        }

        const userData = JSON.parse(responseText);
        return NextResponse.json(userData);
    } catch (err) {
        console.error("Server Error:", err);
        return NextResponse.json(
            { status: 500, msg: "Lỗi máy chủ" },
            { status: 500 }
        );
    }
}