import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // Lấy code và state từ query parameters
        const { searchParams } = new URL(req.url);
        const code = searchParams.get("code");
        const state = searchParams.get("state");

        // Kiểm tra xem code có tồn tại không
        if (!code) {
            console.error("Missing authorization code in query parameters");
            return NextResponse.json({ status: 400, msg: "Thiếu mã xác thực" }, { status: 400 });
        }

        // (Tùy chọn) Kiểm tra state để chống CSRF
        const expectedState = req.cookies.get("auth_state")?.value;
        if (expectedState && state !== expectedState) {
            console.error("State mismatch:", { received: state, expected: expectedState });
            return NextResponse.json({ status: 400, msg: "State không hợp lệ" }, { status: 400 });
        }

        // Chuẩn bị URL và redirect_uri
        const AUTH0_BASE_URL = process.env.AUTH0_BASE_URL && process.env.AUTH0_BASE_URL.replace(/\/+$/, "");
        const tokenUrl = `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`;
        const redirectUri = `${AUTH0_BASE_URL}/api/auth/callback`;

        // Log thông tin yêu cầu để debug
        console.log("Fetching token from:", tokenUrl);
        console.log("Request body:", {
            grant_type: "authorization_code",
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            code,
            redirect_uri: redirectUri,
        });

        // Gửi yêu cầu POST đến /oauth/token để đổi code lấy access_token
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

        // Kiểm tra phản hồi từ Auth0
        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            console.error("Token response error:", tokenResponse.status, errorText);
            throw new Error(`Không thể lấy token: ${errorText}`);
        }

        // Lấy access_token từ phản hồi
        const { access_token } = await tokenResponse.json();
        console.log("Access Token:", access_token);

        // Chuyển hướng người dùng và lưu access_token vào cookies
        const response = NextResponse.redirect(`${process.env.AUTH0_BASE_URL}/pages`);
        response.cookies.set("access_token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Chỉ dùng HTTPS trong production
            path: "/",
            maxAge: 60 * 60 * 24, // 1 ngày
        });

        // (Tùy chọn) Xóa state sau khi sử dụng
        if (expectedState) {
            response.cookies.delete("auth_state");
        }

        return response;
    } catch (err) {
        console.error("Lỗi trong callback:", err);
        return NextResponse.json({ status: 500, msg: "Lỗi máy chủ" }, { status: 500 });
    }
}