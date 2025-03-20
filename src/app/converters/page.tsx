"use client"

import { DataAllTools } from "../../data/all-tools";
import ListCard from "@/components/card/list-card";

export default function ConvertersPage() {
    const data = DataAllTools;
    const filter = data.filter((item) => item.link);

    return (
        <ListCard
            title="Encoders / Decoders"
            data={filter}
        />
    )
}