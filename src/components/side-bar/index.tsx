"use client"
import { DataSettings, DataSideBar } from "@/data/data-side-bar";
import InputField from "../input-field";
import styles from "./index.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import ListSideBar from "./list-side-bar";
import { useState } from "react";

export default function SideBar() {
    const [statusSideBar, setStatusSideBar] = useState(true);

    return (
        <div className={styles.sideBar} style={{ minWidth: statusSideBar ? undefined : 50 }}>
            <div style={{ margin: " 0 10px" }}>
                <div onClick={() => setStatusSideBar(!statusSideBar)}>
                    <MenuIcon sx={{ fontSize: 20, marginBottom: 1.5, cursor: "pointer" }} />
                </div>
                {
                    statusSideBar && (
                        <InputField placeholder="Type to search for tools" />
                    )
                }
            </div>
            <ListSideBar data={DataSideBar} statusSideBar={statusSideBar} />
            <div className={styles.sidebarSetting}>
                <ListSideBar data={DataSettings} statusSideBar={statusSideBar} />
            </div>
        </div>
    )
}