import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const code = searchParams.get("code");

        if (!code) {
            return NextResponse.json({ status: 400, msg: "Thiếu mã xác thực" }, { status: 400 });
        }

        const AUTH0_BASE_URL = process.env.AUTH0_BASE_URL && process.env.AUTH0_BASE_URL.replace(/\/+$/, "");
        const tokenUrl = `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`;
        const redirectUri = `${AUTH0_BASE_URL}/api/auth/callback`;

        console.log("Fetching token from:", tokenUrl);
        console.log("Request body:", {
            grant_type: "authorization_code",
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            code,
            redirect_uri: redirectUri,
        });

        const tokenResponse = await fetch(tokenUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                grant_type: "authorization_code",
                client_id: process.env.AUTH0_CLIENT_ID,
                client_secret: process.env.AUTH0_CLIENT_SECRET,
                code,
                redirect_uri: redirectUri,
            }),
        });

        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            console.error("Token response error:", tokenResponse.status, errorText);
            throw new Error(`Không thể lấy token: ${errorText}`);
        }

        const { access_token } = await tokenResponse.json();
        console.log("Access Token:", access_token);

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