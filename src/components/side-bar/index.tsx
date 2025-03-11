"use client"
import { DataSettings, DataSideBar } from "@/data/data-side-bar";
import InputField from "../input-field";
import MenuIcon from "@mui/icons-material/Menu";
import ListSideBar from "./list-side-bar";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export default function SideBar() {
    const [statusSideBar, setStatusSideBar] = useState(true);

    return (
        <div
            className="min-w-2xs flex flex-col relative pb-27 pl-1 overflow-hidden"
            style={{ minWidth: statusSideBar ? undefined : 50 }}
        >
            <div className="mx-2.5 mb-2">
                <div onClick={() => setStatusSideBar(!statusSideBar)}>
                    <MenuIcon sx={{ fontSize: 20, marginBottom: 1.5, cursor: "pointer" }} />
                </div>
                {
                    statusSideBar && (
                        <InputField placeholder="Type to search for tools" iconRight={<SearchIcon />} />
                    )
                }
            </div>
            <ListSideBar data={DataSideBar} statusSideBar={statusSideBar} />
            <div className="absolute bottom-0 left-0 w-full border-t-1 z-999 pl-1 pt-1">
                <ListSideBar data={DataSettings} statusSideBar={statusSideBar} />
            </div>
        </div>
    )
}