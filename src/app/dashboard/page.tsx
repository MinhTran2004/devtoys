import ItemMenu from "@/components/menu";
import InputField from "@/components/input-field";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./dashboard.module.css";
import { DataSideBar } from "../../data/data-side-bar";

export default function DashboardPage() {
  return (
    <div className={styles.main}>
      {/* menu */}
      <div className={styles.sideBar}>
        <div
          style={{
            margin: " 0 10px",
          }}
        >
          <MenuIcon sx={{ fontSize: 20, marginBottom: 1.5 }} />
          <InputField placeholder="Type to search for tools" />
        </div>

        <ul className={styles.ul}>
          {DataSideBar.map((item) => (
            <li key={item.key}>
              <ItemMenu {...item} />
            </li>
          ))}
        </ul>
      </div>

      {/* content */}
      <div className={styles.content}>
        <div style={{ display: "flex" }}>
          <p style={{ fontSize: 40, fontWeight: "bold" }}>Welcome to DevToys</p>
          <span style={{ fontSize: 15, marginTop: 10 }}>v2.0-preview.8</span>
        </div>

        <div>
          <p>Recents</p>
        </div>
      </div>
    </div>
  );
}
