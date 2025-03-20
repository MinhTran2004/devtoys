"use client"

import ListCard from "@/components/card/list-card";
import { DataAllTools } from "../data/all-tools";

export default function DashboardPage() {

  const data = DataAllTools;
  const filter = data.filter((item) => item.link);

  return (
    <div className="pb-100">
      <div className="flex">
        <h1 className="text-4xl font-bold">Welcome to DevToys</h1>
        <span className="text-base">v2.0-preview.8</span>
      </div>
      <div>
        <ListCard title="All tools" data={filter} />
      </div>
      <a href="/api/auth/login">Login</a>
    </div>
  );
}
