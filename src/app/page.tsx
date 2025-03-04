"use client"
import styles from "./page.module.css";
import Card from "@/components/card";
import { DataRecents, DataAllTools } from "../data/all-tools";
import SideBar from "@/components/side-bar";

export default function DashboardPage() {
  return (
    <div className={styles.main}>
      {/* side bar */}
      <SideBar />

      {/* content */}
      <div className={styles.content}>
        <div style={{ margin: 30 }}>
          <div style={{ display: "flex" }}>
            <p style={{ fontSize: 40, fontWeight: "bold" }}>Welcome to DevToys</p>
            <span style={{ fontSize: 15, marginTop: 10 }}>v2.0-preview.8</span>
          </div>
          <Card title="Recents" data={DataRecents} />
          <br />
          <Card title="All tools" data={DataAllTools} />
        </div>
      </div>
    </div>
  );
}
