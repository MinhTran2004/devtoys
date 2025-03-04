"use client"
import InputField from "@/components/input-field";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./dashboard.module.css";
import Menu from "@/components/menu";
import Card from "@/components/card";
import { DataSideBar, DataSettings } from "../../data/data-side-bar";
import { DataRecents, DataAllTools } from "../../data/all-tools";

export default function DashboardPage() {

  return (
    <div className={styles.main}>

      {/* side bar */}
      <div className={styles.sideBar}>
        <div style={{ margin: " 0 10px" }}>
          <MenuIcon sx={{ fontSize: 20, marginBottom: 1.5 }} />
          <InputField placeholder="Type to search for tools" />
        </div>
        <Menu data={DataSideBar} />
        <div className={styles.sidebarSetting}>
          <Menu data={DataSettings} />
        </div>
      </div>

      {/* content */}
      <div className={styles.content}>
        <div style={{ margin: 30 }}>
          <div style={{ display: "flex" }}>
            <p style={{ fontSize: 40, fontWeight: "bold" }}>Welcome to DevToys</p>
            <span style={{ fontSize: 15, marginTop: 10 }}>v2.0-preview.8</span>
          </div>

          <div>
            <Card title="Recents" data={DataRecents} />
            <br />
            <Card title="All tools" data={DataAllTools} />
          </div>
        </div>
      </div>
    </div>
  );
}
