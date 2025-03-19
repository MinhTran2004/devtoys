import axios from "axios";
import { NextResponse } from "next/server";

const API_KEY = process.env.API_KEY_COINMARKETCAP;

export async function GET() {
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${API_KEY}`
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