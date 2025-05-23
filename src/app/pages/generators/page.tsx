"use client"

import { DataAllTools } from "../../../data/all-tools";
import ListCard from "@/components/card/list-card";

export default function GeneratorsPage() {
    const data = DataAllTools;
    const filter = data.filter((item) => item.link);

    return (
        <ListCard
            title="Generators"
            data={filter}
        />
    )
}