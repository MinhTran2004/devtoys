import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = fetch(`/api/auth/logout`)
            .then(res => res.json());
        return NextResponse.json({ response });
    } catch (err) {
        console.log(err);
    }
}