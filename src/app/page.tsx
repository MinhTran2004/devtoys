"use client"
import ListCard from "@/components/card/list-card";
import { DataAllTools } from "../data/all-tools";

export default function DashboardPage() {

  const data = DataAllTools;

  const filter = data.filter((item) => item.link);

  return (
    <div>
      <div className="flex">
        <p  className="text-5xl font-bold">Welcome to DevToys</p>
        <span className="text-base">v2.0-preview.8</span>
      </div>
      <br/>
      <ListCard title="All tools" data={filter} />
    </div>
  );
}
