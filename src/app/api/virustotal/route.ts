import axios from "axios";
import { NextResponse } from "next/server";

const API_KEY = process.env.API_KEY_VIRUSTOTAL;

export async function POST(req: Request) {
    if (!API_KEY) {
        return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    try {
        const formData = await req.formData();
        formData.append("apikey", API_KEY);
        const response = await axios.post(`https://www.virustotal.com/vtapi/v2/file/scan`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (response.data.response_code === 0) {
            return NextResponse.json({ error: response.data.verbose_msg }, { status: 400 })
        }

        return NextResponse.json(response.data);
    } catch (err: any) {
        console.error("Error:", err);
        return NextResponse.json({ error: err.message || "An error occurred" }, { status: 500 });
    }
}