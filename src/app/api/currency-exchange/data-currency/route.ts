import axios from "axios";
import { NextResponse } from "next/server";

const API_KEY = process.env.API_KEY_EXCHANGERATE;

export async function GET() {
    const apiURL = `https://v6.exchangerate-api.com/v6/${API_KEY}/codes`;

    try {
        const reponse = (await axios.get(apiURL));
        return NextResponse.json(reponse.data);
    } catch (err) {
        return NextResponse.json(
            { error: "Lỗi khi lấy dữ liệu crypto" },
            { status: 500 }
        );
    }
}