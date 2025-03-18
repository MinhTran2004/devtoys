import axios from "axios";
import { NextResponse } from "next/server";

const API_KEY = process.env.API_KEY_IPLOCATION;

export async function GET(req: Request) {
    const url = new URL(req.url);

    const input = url.searchParams.get("input");

    if (!input) {
        return NextResponse.json(
            { error: "Thiếu tham số input" },
            { status: 400 }
        );
    }

    try {
        const reponse = (await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${input}`));
        return NextResponse.json(reponse.data)
    } catch (err) {
        return NextResponse.json(
            { error: "Lỗi phía máy chủ" },
            { status: 500 }
        );
    }

}