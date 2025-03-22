import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const code = searchParams.get("code");

        if (!code) {
            return NextResponse.json({ status: 400, msg: "Thiếu mã xác thực" }, { status: 400 });
        }

        const AUTH0_BASE_URL = process.env.AUTH0_BASE_URL && process.env.AUTH0_BASE_URL.replace(/\/+$/, "");

        const tokenResponse = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                grant_type: "authorization_code",
                client_id: process.env.AUTH0_CLIENT_ID,
                client_secret: process.env.AUTH0_CLIENT_SECRET,
                code,
                redirect_uri: `${AUTH0_BASE_URL}/api/auth/callback`,
            }),
        });

        if (!tokenResponse.ok) {
            throw new Error("Không thể lấy token");
        }

        const { access_token } = await tokenResponse.json();
        const response = NextResponse.redirect(`${process.env.AUTH0_BASE_URL}/pages`);
        response.cookies.set("access_token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        return response;
    } catch (err) {
        console.error("Lỗi trong callback:", err);
        return NextResponse.json({ status: 500, msg: "Lỗi máy chủ" }, { status: 500 });
    }
}