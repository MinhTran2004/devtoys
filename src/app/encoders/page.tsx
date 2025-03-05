import styles from "./page.module.css";
import { DataAllTools } from "../../data/all-tools";
import ListCard from "@/components/card";

export default function EncoderPage() {
    return (
        <div className={styles.container}>
            <p style={{
                fontSize: 20,
                fontWeight: 500
            }}>Encoders / Decoders</p>

            <hr style={{ margin: "30px 0 20px 0" }} />
            <ListCard title="" data={DataAllTools} />
        </div>
    )
}