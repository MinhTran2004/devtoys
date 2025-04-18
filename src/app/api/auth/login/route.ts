import { NextResponse } from "next/server";

export async function GET() {
    try {
        if (!process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_ISSUER_BASE_URL) {
            return NextResponse.json(
                { status: 500, msg: "Thiếu cấu hình Auth0" },
                { status: 500 }
            );
        }

        const domain = process.env.AUTH0_ISSUER_BASE_URL.replace("https://", "").replace(/\/+$/, "");
        const clientId = process.env.AUTH0_CLIENT_ID;
        const redirectUri = `${process.env.AUTH0_BASE_URL}api/auth/callback`;
        const scope = process.env.AUTH0_SCOPE || "openid profile email";
        const audience = "https://dev-zinn8d20xyjq3y37.us.auth0.com/api/v2/";

        const apiURL = `https://${domain}/authorize?` +
            `client_id=${clientId}&` +
            `response_type=code&` +
            `redirect_uri=${encodeURIComponent(redirectUri)}&` +
            `scope=${encodeURIComponent(scope)}&` +
            `audience=${encodeURIComponent(audience)}`;

        return NextResponse.redirect(apiURL);
    } catch (err) {
        console.error("Lỗi trong quá trình xử lý đăng nhập:", err);
        return NextResponse.json(
            { status: 500, msg: "Lỗi máy chủ" },
            { status: 500 }
        );
    }
}