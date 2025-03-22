import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const response = NextResponse.redirect(new URL("/welcome", req.url));
        response.cookies.delete("access_token");
        return response;
    } catch (err) {
        console.error("Lỗi trong quá trình đăng xuất:", err);
        return NextResponse.json(
            { status: 500, msg: "Lỗi máy chủ" },
            { status: 500 }
        );
    }
}