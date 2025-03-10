"use client"
import styles from "./page.module.css";
import ListCard from "@/components/card";
import { DataRecents, DataAllTools } from "../../data/all-tools";

export default function FormattersPage() {
  const data = DataAllTools;
  const filter = data.filter((item) => item.link);

  return (
    <div className={styles.container}>
      <div style={{ display: "flex" }}>
        <p style={{ fontSize: 40, fontWeight: "bold" }}>Welcome to DevToys</p>
        <span style={{ fontSize: 15, marginTop: 10 }}>v2.0-preview.8</span>
      </div>
      <ListCard title="Recents" data={DataRecents} />
      <br />
      <ListCard title="All tools" data={filter} />
    </div>
  );
}
