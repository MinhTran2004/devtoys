import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const code = searchParams.get("code");

        if (!code) {
            return NextResponse.json(
                { status: 400, msg: "Thiếu mã code" },
                { status: 400 }
            );
        }

        const domain = process.env.AUTH0_ISSUER_BASE_URL?.replace("https://", "").replace(/\/+$/, "");
        const clientId = process.env.AUTH0_CLIENT_ID;
        const clientSecret = process.env.AUTH0_CLIENT_SECRET;
        const redirectUri = `${process.env.AUTH0_BASE_URL}/api/auth/callback`;

        // Gửi yêu cầu lấy token từ Auth0
        const tokenResponse = await fetch(`https://${domain}/oauth/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                grant_type: "authorization_code",
                client_id: clientId,
                client_secret: clientSecret,
                code,
                redirect_uri: redirectUri,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenData.access_token) {
            return NextResponse.json(
                { status: 400, msg: "Không lấy được token" },
                { status: 400 }
            );
        }

        // Lưu token vào cookie
        const response = NextResponse.redirect(new URL("/", req.url));
        response.cookies.set("access_token", tokenData.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60, // 1 giờ
        });

        return response;
    } catch (err) {
        console.error("Lỗi trong callback:", err);
        return NextResponse.json(
            { status: 500, msg: "Lỗi máy chủ" },
            { status: 500 }
        );
    }
}