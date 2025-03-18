import axios from "axios";
import { NextResponse } from "next/server";

const API_KEY = process.env.API_KEY_COINPLAYER;

export async function GET() {
    const url = `http://api.coinlayer.com/live?access_key=${API_KEY}`
    try {
        const reponse = (await axios.get(url));
        return NextResponse.json(reponse.data);
    } catch (err) {
        return NextResponse.json(
            { error: "Lỗi khi lấy dữ liệu crypto" },
            { status: 500 }
        );
    }
}