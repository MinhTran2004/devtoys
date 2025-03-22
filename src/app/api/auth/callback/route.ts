import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // Lấy code và state từ query parameters
        const { searchParams } = new URL(req.url);
        const code = searchParams.get("code");
        const state = searchParams.get("state");

        // Kiểm tra mã xác thực
        if (!code) {
            console.error("Thiếu mã xác thực trong query parameters");
            return NextResponse.json(
                { status: 400, msg: "Thiếu mã xác thực" },
                { status: 400 }
            );
        }

        // Xác thực state để chống CSRF
        const expectedState = req.cookies.get("auth_state")?.value;
        if (expectedState && state !== expectedState) {
            console.error("State không khớp:", { received: state, expected: expectedState });
            return NextResponse.json(
                { status: 400, msg: "State không hợp lệ" },
                { status: 400 }
            );
        }

        // Kiểm tra biến môi trường
        const AUTH0_BASE_URL = process.env.AUTH0_BASE_URL?.replace(/\/+$/, "");
        const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL?.replace(/\/+$/, "");

        if (!AUTH0_BASE_URL || !AUTH0_ISSUER_BASE_URL || !process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_CLIENT_SECRET) {
            console.error("Thiếu biến môi trường cần thiết");
            return NextResponse.json(
                { status: 500, msg: "Lỗi cấu hình máy chủ" },
                { status: 500 }
            );
        }

        const tokenUrl = `${AUTH0_ISSUER_BASE_URL}/oauth/token`;
        const redirectUri = `${AUTH0_BASE_URL}/api/auth/callback`;

        // Đổi mã code lấy token
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
            console.error("Lỗi khi đổi token:", {
                status: tokenResponse.status,
                error: errorText,
            });
            return NextResponse.json(
                { status: 500, msg: "Không thể đổi mã xác thực lấy token" },
                { status: 500 }
            );
        }

        const { access_token } = await tokenResponse.json();
        if (!access_token) {
            console.error("Không nhận được access token từ Auth0");
            return NextResponse.json(
                { status: 500, msg: "Phản hồi token không hợp lệ" },
                { status: 500 }
            );
        }

        // Tạo phản hồi redirect và set cookie
        const response = NextResponse.redirect(`${AUTH0_BASE_URL}/pages`);
        response.cookies.set("access_token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24, // 24 giờ
        });

        // Xóa cookie state nếu tồn tại
        if (expectedState) {
            response.cookies.delete("auth_state");
        }

        return response;
    } catch (err) {
        console.error("Lỗi trong callback:", err);
        return NextResponse.json(
            { status: 500, msg: "Lỗi máy chủ nội bộ" },
            { status: 500 }
        );
    }
}

// Cấu hình cho Vercel
export const config = {
    api: {
        bodyParser: false, // Không cần cho GET, nhưng nên khai báo rõ ràng
    },
};