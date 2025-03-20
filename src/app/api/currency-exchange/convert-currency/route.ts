import axios from "axios";
import { NextResponse } from "next/server";

const API_KEY = process.env.API_KEY_EXCHANGERATE;

export async function GET(req: Request) {
    const url = new URL(req.url);
    const baseCode = url.searchParams.get("baseCode");
    const targetCode = url.searchParams.get("targetCode");
    const input = url.searchParams.get("input");

    if (!baseCode || !targetCode || !input) {
        return NextResponse.json(
            { error: "Thiếu tham số baseCode, targetCode hoặc input" },
            { status: 400 }
        );
    }

    const apiUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${baseCode}/${targetCode}/${input}`;

    try {
        const reponse = (await axios.get(apiUrl));
        return NextResponse.json(reponse.data);
    } catch (err) {
        return NextResponse.json(
            { error: "Lỗi phía máy chủ" },
            { status: 500 }
        );
    }
}