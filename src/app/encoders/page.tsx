import SideBar from "@/components/side-bar";
import styles from "./page.module.css";
import {DataAllTools} from "../../data/all-tools";
import Card from "@/components/card";

export default function EncoderPage() {
    return (
        <div className={styles.main}>
            <SideBar />

            <div className={styles.content}>
                <div style={{ margin: '30px 30px 0 30px' }}>

                    <p style={{
                        fontSize: 20,
                        fontWeight: 500
                    }}>Encoders / Decoders</p>

                    <hr style={{margin: "30px 0 20px 0"}}/>
                    <Card title="" data={DataAllTools}/>
                </div>
            </div>
        </div>
    )
}