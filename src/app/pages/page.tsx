'use client'

import ListCard from "@/components/card/list-card";
import { DataAllTools } from "../../data/all-tools";

// @ts-ignore
export default function MainPage() {
    const data = DataAllTools;
    const filter = data.filter((item) => item.link);

    const handleLogout = () => {
        window.location.href = `/api/auth/logout`;
    }

    return (
        <div className="pb-100">
            <div className="w-full flex items-center justify-between">
                <div className="flex">
                    <h1 className="text-4xl font-bold">Welcome to DevToys</h1>
                    <p className="text-base">v2.0-preview.8</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="cursor-pointer bg-[#22b0ff] px-5 py-1 rounded-xs"
                >Logout</button>
            </div>
            <div>
                <ListCard
                    title="All tools"
                    data={filter}
                />
            </div>
        </div>
    );
}
