import { DataSettings, DataSideBar } from "@/data/data-side-bar";
import InputField from "../input-field";
import styles from "./index.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "../menu";

export default function SideBar() {
    return (
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
    )
}