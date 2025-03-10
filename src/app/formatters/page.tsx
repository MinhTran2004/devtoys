"use client"
import ListCard from "@/components/card";
import { DataRecents, DataAllTools } from "../../data/all-tools";

export default function FormattersPage() {
  const data = DataAllTools;
  const filter = data.filter((item) => item.link);

  return (
    <ListCard title="Formatters" data={filter} />
  );
}
