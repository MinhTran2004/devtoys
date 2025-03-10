"use client"
import styles from "./page.module.css";
import { DataAllTools } from "../../data/all-tools";
import ListCard from "@/components/card";

export default function EncoderPage() {
    const data = DataAllTools;

    const filter = data.filter((item) => item.link);

    return (
        <div className={styles.container}>
            <p className="title">Encoders / Decoders</p>

            <hr style={{ margin: "30px 0 20px 0" }} />
            <ListCard title="" data={filter} />
        </div>
    )
}